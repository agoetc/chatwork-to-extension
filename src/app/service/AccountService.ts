import { AccountDomReader } from '../../adapter/dom/reader/AccountDomReader'
import { AccountReader } from '../../domain/reader/AccountReader'
import { AccountList } from '../../domain/Account'

const accountReader: AccountReader = AccountDomReader

export const AccountService = {
  getAccountList(): AccountList {
    return accountReader.getAccountList()
  },
}
