import { Group, GroupList, GroupRequest } from '../../domain/Group'
import { GroupStorageRepository } from '../../adapter/storage/repository/GroupStorageRepository'
import { AccountList } from '../../domain/Account'

export const GroupService = {
  getGroupList(): Promise<GroupList> {
    return GroupStorageRepository.get()
  },
  addGroup(groupList: GroupList, req: GroupRequest): Promise<void> {
    console.log(groupList)
    // 新規save
    if (groupList.value.length === 0) {
      const saveGroupList: GroupList = {
        value: [GroupRequest.toGroup(req)],
      }
      return GroupStorageRepository.save(saveGroupList)
    } else {
      const saveGroupList = PGroupService.buildSaveGroup(groupList, req)
      return GroupStorageRepository.save(saveGroupList)
    }
  },
}

const PGroupService = {
  findByGroupName(groupList: GroupList, name: string): Group | undefined {
    return groupList.value.find((group) => group.name === name)
  },
  buildSaveGroup(groupList: GroupList, req: GroupRequest): GroupList {
    const group = PGroupService.findByGroupName(groupList, req.name)
    if (group !== undefined) {
      const mergedAccountList = AccountList.mergeAccountListRequest(
        group.accountList,
        req.accountList
      )
      groupList.value.push({
        name: group.name,
        accountList: mergedAccountList,
      })
      return groupList
    } else {
      groupList.value.push(GroupRequest.toGroup(req))
      return groupList
    }
  },
}
