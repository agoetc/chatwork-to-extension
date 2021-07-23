import { AccountList } from './Account'

export interface Group {
  name: string
  accountList: AccountList
}

export interface GroupList {
  value: Group[]
}
