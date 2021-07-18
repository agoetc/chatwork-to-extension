import { AddForm } from './AddForm'
import { SelectBox } from './SelectBox'
import { GroupList } from '../../../../../../domain/Group'
import { GroupAddButtonEffect } from '../../../../effector/group/dialog/edit-form/GroupAddButton'
import {
  GroupDeleteButton,
  GroupDeleteButtonEffect,
} from '../../../../effector/group/dialog/edit-form/GroupDeleteButton'

export const GroupEditForm = {
  generate(
    groupList: GroupList,
    addEffect: (input: HTMLInputElement) => GroupAddButtonEffect,
    deleteEffect: GroupDeleteButtonEffect
  ): HTMLDivElement {
    const groupAddForm = AddForm.generate(groupList, addEffect)
    const groupSelectBox = SelectBox.generate(groupList)
    const groupDeleteBox = GroupDeleteButton.effect(deleteEffect)

    return PGroupEditForm.groupEditDiv(groupAddForm, groupSelectBox, groupDeleteBox)
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
}
