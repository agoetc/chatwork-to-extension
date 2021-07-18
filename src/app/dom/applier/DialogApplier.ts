import { GroupEditDialog } from '../generater/group/dialog/dialog/GroupEditDialog'
import { GroupList } from '../../../domain/Group'
import { AccountDomReader } from '../../../adapter/dom/reader/AccountDomReader'
import { GroupGetter } from '../../../adapter/dom/getter/group/GroupGetter'
import { SelectBox } from '../generater/group/dialog/edit-form/SelectBox'
import { ButtonField } from '../generater/group/dialog/dialog/ButtonField'
import { GroupService } from '../../service/GroupService'
import { GroupAddButtonEffect } from '../effector/group/dialog/edit-form/GroupAddButton'

export const DialogApplier = {
  apply(groupList: GroupList): HTMLDialogElement {
    const toAccountList = AccountDomReader.getAccountList()
    const addEffect = PDialogApplier.addEffect(groupList)
    return GroupEditDialog.generate(groupList, toAccountList, addEffect)
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
      GroupService.add(groupList, {
        name: input.value,
        accountList: { value: [] },
      })
  },
}
