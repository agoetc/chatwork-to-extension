import { SaveAccountTable } from '../../../dom/generater/group/dialog/account-save-table/SaveAccountTable'
import { AccountDomReader } from '../../../../adapter/dom/original/reader/AccountDomReader'

export const AccountAddTableApplier = {
  apply() {
    const toAccountList = AccountDomReader.getAccountList()
    return SaveAccountTable.generate(toAccountList, { value: [] })
  },
}
