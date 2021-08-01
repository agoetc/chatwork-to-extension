import { GroupList } from '../../../domain/Group'
import { browser } from 'webextension-polyfill-ts'

const saveKey = 'group'

export const GroupStorageRepository = {
  delete(groupList: GroupList, groupName: string): Promise<GroupList> {
    const filteredGroupList = {
      value: groupList.value.filter((g) => g.name !== groupName),
    }
    return this.save(filteredGroupList).then(() => filteredGroupList)
  },
  get(): Promise<GroupList> {
    return browser.storage.sync
      .get(saveKey)
      .then((result) => PGroupStorageRepository.buildGroupListByObj(result))
  },
  save(groupList: GroupList): Promise<void> {
    console.log(groupList)
    return browser.storage.sync.set({ group: groupList })
  },
}

const PGroupStorageRepository = {
  buildGroupListByObj(result: { [key: string]: any }): GroupList {
    if (!result.hasOwnProperty(saveKey)) {
      console.log('empty group')
      return { value: [] }
    }
    return result[saveKey] as GroupList
  },
}
