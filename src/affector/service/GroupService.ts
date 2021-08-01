import { Group, GroupList } from '../../domain/Group'
import { GroupStorageRepository } from '../../adapter/storage/repository/GroupStorageRepository'
import { Account, AccountList } from '../../domain/Account'
import { SaveGroupRequest } from '../../domain/SaveGroupRequest'
import { AccountDomReader } from '../../adapter/dom/reader/original/AccountDomReader'

export const GroupService = {
  getGroupList(): Promise<GroupList> {
    return GroupStorageRepository.get()
  },
  saveGroup(groupList: GroupList, req: SaveGroupRequest): Promise<void> {
    if (req.name.length <= 0) {
      throw new DOMException('empty group name')
    }

    // 新規save
    if (groupList.value.length === 0) {
      const saveGroupList: GroupList = {
        value: [SaveGroupRequest.toGroup(req)],
      }
      return GroupStorageRepository.save(saveGroupList)
    } else {
      const saveGroupList = PGroupService.buildSaveGroup(groupList, req)
      return GroupStorageRepository.save(saveGroupList)
    }
  },
  deleteGroup(groupList: GroupList, groupName: string): Promise<void> {
    return GroupStorageRepository.delete(groupList, groupName)
  },
}

const PGroupService = {
  findByGroupName(groupList: GroupList, name: string): Group | undefined {
    return groupList.value.find((group) => group.name === name)
  },
  // TODO あんまキレイじゃない
  buildSaveGroup(groupList: GroupList, req: SaveGroupRequest): GroupList {
    const group = PGroupService.findByGroupName(groupList, req.name)
    const accountListFromToList: AccountList = AccountDomReader.getAccountList()

    if (group !== undefined) {
      const mergedAccountList = this.mergeAccountListRequest(
        group.accountList,
        accountListFromToList,
        req.accountList
      )
      const saveGroupList = groupList.value.map((group) => {
        if (group.name === req.name) {
          return {
            name: group.name,
            accountList: mergedAccountList,
          }
        } else return group
      })

      return { value: saveGroupList }
    } else {
      groupList.value.push(SaveGroupRequest.toGroup(req))
      return groupList
    }
  },
  mergeAccountListRequest(
    savedAccountList: AccountList,
    accountListFromToList: AccountList,
    reqAccountList: AccountList
  ): AccountList {
    /**
     * チャット外の人は使い回す
     * 既にGroupに追加されている人は使い回さない（名前とか変わっている可能性あるので）
     * @type {Array<Account>}
     */
    const reuseAccountListAccount = savedAccountList.value.filter((savedAccount) => {
      return (
        this.isOutsider(savedAccount, accountListFromToList) ||
        !this.isSaved(savedAccount, reqAccountList)
      )
    })

    return { value: reuseAccountListAccount.concat(reqAccountList.value) }
  },
  isOutsider(savedAccount: Account, accountListFromToList: AccountList): boolean {
    return !accountListFromToList.value.some(
      (toAccount) => toAccount.accountId.value === savedAccount.accountId.value
    )
  },
  isSaved(savedAccount: Account, reqAccountList: AccountList): boolean {
    return reqAccountList.value.some(
      (reqAccount) => reqAccount.accountId.value === savedAccount.accountId.value
    )
  },
}
