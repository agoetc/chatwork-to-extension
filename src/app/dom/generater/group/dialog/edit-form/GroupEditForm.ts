import { AddForm } from './AddForm'
import { SelectBox } from './SelectBox'
import { GroupList } from '../../../../../../domain/Group'
import { AddGroupEffectRemindInput } from '../../../../effector/group/dialog/edit-form/EffectAddGroupButton'
import {
  EffectDeleteGroupButton,
  GroupDeleteButtonEffect,
} from '../../../../effector/group/dialog/edit-form/EffectDeleteGroupButton'

export const GroupEditForm = {
  generate(
    groupList: GroupList,
    addEffect: AddGroupEffectRemindInput,
    deleteEffect: GroupDeleteButtonEffect
  ): HTMLDivElement {
    const groupAddForm = AddForm.generate(groupList, addEffect)
    const groupSelectBox = SelectBox.generate(groupList)
    const groupDeleteBox = EffectDeleteGroupButton.effect(deleteEffect)

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
