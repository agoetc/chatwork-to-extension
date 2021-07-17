import { Group, GroupList, GroupRequest } from '../../../domain/Group'
import { browser } from 'webextension-polyfill-ts'
import { AccountList } from '../../../domain/Account'

export const GroupStorageRepository = {
  delete(groupList: GroupList, groupName: string): Promise<void> {
    groupList.value.filter((g) => g.name !== groupName)
    return PGroupStorageRepository.save(groupList)
  },
  get(): Promise<GroupList> {
    return browser.storage.sync
      .get('group')
      .then((groupListObj) => PGroupStorageRepository.buildGroupListByObj(groupListObj))
  },
  addList(groupList: GroupList, req: GroupRequest): Promise<void> {
    console.log(req)
    const group: Group | undefined = groupList.value.find((group) => group.name === req.name)
    if (group === undefined) {
      // グループ名が被っていない場合、新規に追加
      groupList.value.push({
        name: req.name,
        accountList: req.accountList,
      })
      return PGroupStorageRepository.save(groupList)
    } else {
      // グループ名が被っている場合、古いAccountListと新しいAccountListで合成する
      const mergedAccountList = AccountList.mergeAccountListRequest(
        group.accountList,
        req.accountList
      )

      groupList.value.push({
        name: req.name,
        accountList: mergedAccountList,
      })

      return PGroupStorageRepository.save(groupList)
    }
  },
}

const PGroupStorageRepository = {
  save(groupList: GroupList): Promise<void> {
    return browser.storage.sync.set({ group: GroupList.toObj(groupList) })
  },
  buildGroupListByObj(groupListObj: any): GroupList {
    const groupList: GroupList = { value: [] }
    console.log(groupListObj)

    for (let groupName in groupListObj.value) {
      if (groupListObj.value.hasOwnProperty(groupName)) {
        const accountListObj = groupListObj.value[groupName].accountList
        const accountList = AccountList.buildByObj(accountListObj)
        groupList.value.push({
          name: groupName,
          accountList: accountList,
        })
      }
    }

    return groupList
  },
}
