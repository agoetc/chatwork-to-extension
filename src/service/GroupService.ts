import { GroupList, GroupRequest } from '../domain/Group'
import { GroupStorageRepository } from '../adapter/storage/repository/GroupStorageRepository'

export const GroupService = {
  getGroupList(): Promise<GroupList> {
    return GroupStorageRepository.get()
  },
  add(groupList: GroupList, groupRequest: GroupRequest): Promise<void> {
    return GroupStorageRepository.addList(groupList, groupRequest)
  },
}
