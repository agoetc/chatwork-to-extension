import { env } from '../../../../../../env'
import { AddForm } from './AddForm'
import { SelectBox } from './SelectBox'
import { GroupList } from '../../../../../../domain/Group'
import { AddEffect } from '../../../../effecter/group/dialog/edit-form/AddForm'

export const GroupEditForm = {
  generate(
    groupList: GroupList,
    addEffect: (input: HTMLInputElement) => AddEffect
  ): HTMLDivElement {
    const groupAddForm = AddForm.generate(groupList, addEffect)
    const groupSelectBox = SelectBox.generate(groupList)
    const groupDeleteBox = PGroupEditForm.deleteButton()

    return PGroupEditForm.groupEditDiv(
      groupAddForm,
      groupSelectBox,
      groupDeleteBox
    )
  },
}

const PGroupEditForm = {
  groupEditDiv(
    groupAddForm: HTMLSpanElement,
    groupSelectBox: HTMLSpanElement,
    groupDeleteButton: HTMLSpanElement
  ) {
    const groupDiv = document.createElement('div')
    groupDiv.appendChild(groupAddForm)
    groupDiv.appendChild(groupSelectBox)
    groupDiv.appendChild(groupDeleteButton)

    return groupDiv
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
