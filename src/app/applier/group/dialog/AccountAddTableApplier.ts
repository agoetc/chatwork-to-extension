import { SaveAccountTable } from '../../../dom/builder/group/dialog/account-save-table/SaveAccountTable'
import { AccountDomReader } from '../../../../adapter/dom/original/reader/AccountDomReader'

export const AccountAddTableApplier = {
  apply() {
    const toAccountList = AccountDomReader.getAccountList()
    return SaveAccountTable.build(toAccountList, { value: [] })
  },
}
