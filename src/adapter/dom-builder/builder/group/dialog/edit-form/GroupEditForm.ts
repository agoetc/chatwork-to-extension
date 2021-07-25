import { SaveGroupForm } from './SaveGroupForm'
import { SelectBox } from './SelectBox'
import { GroupList } from '../../../../../../domain/Group'
import { SaveGroupEffectRemindInput } from '../../../../effector/group/dialog/edit-form/EffectSaveGroupButton'
import {
  EffectDeleteGroupButton,
  GroupDeleteButtonEffect,
} from '../../../../effector/group/dialog/edit-form/EffectDeleteGroupButton'
import {
  ChangeGroupEffect,
  EffectSelectGroup,
} from '../../../../effector/group/dialog/account-add-table/EffectSelectGroup'

export const GroupEditForm = {
  build(
    groupList: GroupList,
    addEffect: SaveGroupEffectRemindInput,
    deleteEffect: GroupDeleteButtonEffect,
    changeGroupEffect: ChangeGroupEffect
  ): HTMLDivElement {
    const groupAddForm = SaveGroupForm.build(groupList, addEffect)

    const groupSelectBox = EffectSelectGroup.effect(groupList, changeGroupEffect)
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
