import { Group, GroupList } from '../../../../../domain/Group'
import { ButtonField } from './ButtonField'
import { AddForm } from './AddForm'
import { SelectBox } from './SelectBox'
import { CheckTable } from './CheckTable'
import { AccountList } from '../../../../../domain/Account'
import { env } from '../../../../../env'

export const GroupEditDialog = {
  generate(
    groupList: GroupList,
    toAccountList: AccountList
  ): HTMLDialogElement {
    console.log(groupList)
    const groupDiv = document.createElement('div')
    groupDiv.appendChild(AddForm.generate(groupList))
    groupDiv.appendChild(SelectBox.generate(groupList))
    groupDiv.appendChild(PGroupEditDialog.deleteButton())

    // モーダルに要素を追加している
    const dialog: HTMLDialogElement = PGroupEditDialog.dialog()
    dialog.appendChild(groupDiv)
    dialog.appendChild(CheckTable.generate(toAccountList, { value: [] }))

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
  deleteButton(): HTMLSpanElement {
    const button = document.createElement('button')
    button.id = env.id.saveButton.button
    button.className = '_cwDGButton  _cwDGButtonCancel button buttonGray'

    button.textContent = '削除する'
    button.addEventListener('click', () => {
      // if (!state.isDefaultSelect) {
      //   const groupName = document.getElementById(env.id.select.select).value
      //   this.groupList.deleteGroup(groupName)
      // }
    })

    const span = document.createElement('span')
    span.id = env.id.deleteButton.button
    span.appendChild(button)

    return span
  },
}
