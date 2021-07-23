import { SaveAccountTable } from '../../../../adapter/dom-builder/builder/group/dialog/account-save-table/SaveAccountTable'
import { AccountDomReader } from '../../../../adapter/dom-reader/original/AccountDomReader'

export const AccountAddTableApplier = {
  apply() {
    const toAccountList = AccountDomReader.getAccountList()
    return SaveAccountTable.build(toAccountList, { value: [] })
  },
}
