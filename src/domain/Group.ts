import { AccountList } from './Account'
import { GroupAccountListDomReader } from '../adapter/dom/reader/GroupAccountListDomReader'

export interface Group {
  name: string
  accountList: AccountList
}

export interface GroupList {
  value: Group[]
}

export interface GroupRequest {
  name: string
  accountList: AccountList
}

export const GroupRequest = {
  toGroup(req: GroupRequest): Group {
    return {
      name: req.name,
      accountList: req.accountList,
    }
  },
}
