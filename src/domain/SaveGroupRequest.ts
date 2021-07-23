import { AccountList } from './Account'
import { Group } from './Group'

export interface SaveGroupRequest {
  name: string
  accountList: AccountList
}

export const SaveGroupRequest = {
  toGroup(req: SaveGroupRequest): Group {
    return {
      name: req.name,
      accountList: req.accountList,
    }
  },
}
