import { Group, GroupList } from '../../../../../domain/Group'
import { ButtonField } from './ButtonField'
import { AddForm } from './AddForm'
import { SelectBox } from './SelectBox'
import { CheckTable } from './CheckTable'
import { AccountList } from '../../../../../domain/Account'

export const GroupEditDialog = {
  generate(
    groupList: GroupList,
    toAccountList: AccountList
  ): HTMLDialogElement {
    console.log(groupList)
    const groupDiv = document.createElement('div')
    groupDiv.appendChild(AddForm.generate(groupList))
    groupDiv.appendChild(SelectBox.generate(groupList))
    // groupDiv.appendChild(groupListDOMBuilder.deleteButton())

    // モーダルに要素を追加している
    const dialog: HTMLDialogElement = PGroupEditDialog.dialog()
    dialog.appendChild(groupDiv)
    dialog.appendChild(CheckTable.generate(toAccountList))

    const buttonField = ButtonField.generate(dialog)
    dialog.appendChild(buttonField)

    return dialog
  },
}

const PGroupEditDialog = {
  dialog(): HTMLDialogElement {
    const dialog = document.createElement('dialog')
    dialog.id = 'grouping-dialog'
    return dialog
  },
}
