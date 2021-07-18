import { GroupEditDialog } from '../generater/group/dialog/dialog/GroupEditDialog'
import { GroupList } from '../../../domain/Group'
import { AccountDomReader } from '../../../adapter/dom/original/reader/AccountDomReader'
import { GroupGetter } from '../../../adapter/dom/group/getter/GroupGetter'
import { SelectBox } from '../generater/group/dialog/edit-form/SelectBox'
import { ButtonField } from '../generater/group/dialog/dialog/ButtonField'
import { GroupService } from '../../service/GroupService'
import { GroupAddButtonEffect } from '../effector/group/dialog/edit-form/GroupAddButton'
import { GroupDeleteButtonEffect } from '../effector/group/dialog/edit-form/GroupDeleteButton'

export const DialogApplier = {
  apply(groupList: GroupList): HTMLDialogElement {
    const toAccountList = AccountDomReader.getAccountList()
    const addEffect = PDialogApplier.addEffect(groupList)
    const deleteEffect = PDialogApplier.deleteEffect(groupList)
    return GroupEditDialog.generate(groupList, toAccountList, addEffect, deleteEffect)
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

const PDialogApplier = {
  addEffect(groupList: GroupList): (input: HTMLInputElement) => GroupAddButtonEffect {
    return (input: HTMLInputElement) => () =>
      GroupService.addGroup(groupList, {
        name: input.value,
        accountList: { value: [] },
      })
  },
  deleteEffect(groupList: GroupList): GroupDeleteButtonEffect {
    return () => {
      const deleteGroupName = GroupGetter.getGroupSelect().value
      return GroupService.deleteGroup(groupList, deleteGroupName)
    }
  },
}
