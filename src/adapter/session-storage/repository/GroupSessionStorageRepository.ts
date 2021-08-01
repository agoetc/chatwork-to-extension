import { GroupList } from '../../../domain/Group'

const saveKey = 'group-list'

const storage = window.sessionStorage

export const GroupSessionStorageRepository = {
  get(): GroupList {
    const groupListStr = storage.getItem(saveKey)
    if (groupListStr !== null) {
      return <GroupList>JSON.parse(groupListStr)
    } else {
      throw new DOMException('Failed to parse GroupList from session storage')
    }
  },
  update(groupList: GroupList): void {
    storage.setItem(saveKey, JSON.stringify(groupList))
  },
}
