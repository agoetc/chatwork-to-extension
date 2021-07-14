import { GroupEditDialog } from '../generater/group/dialog/GroupEditDialog'
import { GroupList } from '../../../domain/Group'
import { AccountDomReader } from '../../../adapter/dom/reader/AccountDomReader'
import { GroupGetter } from '../../../adapter/dom/getter/group/GroupGetter'
import { SelectBox } from '../generater/group/dialog/SelectBox'
import { ButtonField } from '../generater/group/dialog/ButtonField'

export const DialogApplier = {
  apply(groupList: GroupList): HTMLDialogElement {
    const toAccountList = AccountDomReader.getAccountList()
    console.log(toAccountList)
    const dialog = GroupEditDialog.generate(groupList, toAccountList)
    document.body.appendChild(dialog)
    return dialog
  },
  reload(groupList: GroupList) {
    console.log(groupList)
    // state.isDefaultSelect = true

    const selectGroupName = GroupGetter.getGroupSelect().value
    const selectDiv = GroupGetter.getGroupSelectSpan()

    selectDiv.innerHTML = ''
    selectDiv.appendChild(SelectBox.generate(groupList, selectGroupName))

    const buttonDiv = GroupGetter.getSaveButton()

    buttonDiv.innerHTML = ''
    buttonDiv.appendChild(ButtonField.groupSaveButton())
  },
}
