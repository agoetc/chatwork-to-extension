import { AccountList } from '../Account'

export interface AccountReader {
  getAccountList(): AccountList
}
