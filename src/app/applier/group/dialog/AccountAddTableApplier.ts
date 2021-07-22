import { AccountAddTable } from '../../../dom/generater/group/dialog/account-add-table/AccountAddTable'
import { AccountDomReader } from '../../../../adapter/dom/original/reader/AccountDomReader'

export const AccountAddTableApplier = {
  apply() {
    const toAccountList = AccountDomReader.getAccountList()
    return AccountAddTable.generate(toAccountList, { value: [] })
  },
}
