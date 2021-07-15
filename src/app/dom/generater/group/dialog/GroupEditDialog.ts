import { GroupList } from '../../../../../domain/Group'
import { ButtonField } from './ButtonField'
import { AddForm } from './AddForm'
import { SelectBox } from './SelectBox'
import { CheckTable } from './CheckTable'
import { AccountList } from '../../../../../domain/Account'
import { env } from '../../../../../env'
import { AddEffect } from '../../../effecter/group/dialog/AddForm'

export const GroupEditDialog = {
  generate(
    groupList: GroupList,
    toAccountList: AccountList,
    addEffect: (input: HTMLInputElement) => AddEffect
  ): HTMLDialogElement {
    console.log(groupList)
    const groupDiv = document.createElement('div')
    groupDiv.appendChild(AddForm.generate(groupList, addEffect))
    groupDiv.appendChild(SelectBox.generate(groupList))
    groupDiv.appendChild(PGroupEditDialog.deleteButton())

    const checkTable = CheckTable.generate(toAccountList, { value: [] })

    return PGroupEditDialog.dialog(groupDiv, checkTable)
  },
}

const PGroupEditDialog = {
  dialog(
    groupDiv: HTMLDivElement,
    checkTable: HTMLDivElement
  ): HTMLDialogElement {
    const dialog = document.createElement('dialog')
    dialog.id = 'grouping-dialog'
    const buttonField = ButtonField.generate(dialog)

    dialog.appendChild(groupDiv)
    dialog.appendChild(checkTable)

    dialog.appendChild(buttonField)
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
