import { GroupEditDialog } from '../generater/group/dialog/GroupEditDialog'
import { GroupList } from '../../../domain/Group'

export const DialogApplier = {
  apply(groupList: GroupList): HTMLDialogElement {
    const dialog = GroupEditDialog.generate(groupList)
    document.body.appendChild(dialog)
    return dialog
  },
}
