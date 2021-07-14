import { GroupEditDialog } from '../generater/group/dialog/GroupEditDialog'
import { GroupList } from '../../../domain/Group'
import { AccountDomReader } from '../../../adapter/dom/reader/AccountDomReader'

export const DialogApplier = {
  apply(groupList: GroupList): HTMLDialogElement {
    const toAccountList = AccountDomReader.getAccountList()
    console.log(toAccountList)
    const dialog = GroupEditDialog.generate(groupList, toAccountList)
    document.body.appendChild(dialog)
    return dialog
  },
}
