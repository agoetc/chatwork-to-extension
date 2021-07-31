import { SaveAccountTable } from '../../../builder/builder/group/dialog/account-save-table/SaveAccountTable'
import { AccountDomReader } from '../../../reader/original/AccountDomReader'

export const AddAccountTablePreparer = {
  prepare() {
    const toAccountList = AccountDomReader.getAccountList()
    return SaveAccountTable.build(toAccountList, { value: [] })
  },
}
