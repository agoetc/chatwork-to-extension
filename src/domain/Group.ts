import { AccountList } from './Account'

export interface Group {
  name: string
  accountList: AccountList
}

export interface GroupList {
  value: Group[]
}

export const GroupList = {
  findGroupByName(groupList: GroupList, name: string): Group | undefined {
    return groupList.value.find((g) => g.name === name)
  },
}
