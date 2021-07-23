import { Group, GroupList } from '../../domain/Group'
import { GroupStorageRepository } from '../../adapter/storage/repository/GroupStorageRepository'
import { AccountList } from '../../domain/Account'
import { SaveGroupRequest } from '../../domain/SaveGroupRequest'

export const GroupService = {
  getGroupList(): Promise<GroupList> {
    return GroupStorageRepository.get()
  },
  saveGroup(groupList: GroupList, req: SaveGroupRequest): Promise<void> {
    console.log(groupList)
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
    if (group !== undefined) {
      const mergedAccountList = AccountList.mergeAccountListRequest(
        group.accountList,
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
}
