import { GroupingDialog } from '../../../builder/builder/group/dialog/dialog/GroupingDialog'
import { GroupList } from '../../../../../domain/Group'
import { GroupGetter } from '../../../getter/group/GroupGetter'
import { SelectBox } from '../../../builder/builder/group/dialog/edit-form/SelectBox'
import { EditGroupFormPreparer } from './EditGroupFormPreparer'
import { AddAccountTablePreparer } from './AddAccountTablePreparer'
import { SaveAccountListEffect } from '../../../builder/effector/group/dialog/dialog/EffectSaveAccountButton'
import { GroupAccountListDomReader } from '../../../reader/group/GroupAccountListDomReader'
import { GroupService } from '../../../../../affector/service/GroupService'
import { CloseDialogEffectRemindDialog } from '../../../builder/effector/group/dialog/dialog/EffectCloseDialogButton'

export const EditGroupDialogPreparer = {
  prepare(groupList: GroupList): HTMLDialogElement {
    console.log(groupList)

    const groupEditForm = EditGroupFormPreparer.prepare(groupList)
    const accountAddTable = AddAccountTablePreparer.prepare()
    const saveAccountListEffect = PEditGroupDialogPreparer.saveAccountListEffect(groupList)
    return GroupingDialog.build(
      groupEditForm,
      accountAddTable,
      saveAccountListEffect,
      PEditGroupDialogPreparer.closeDialogEffectRemindDialog()
    )
  },
  reload(groupList: GroupList) {
    console.log(groupList)
    // state.isDefaultSelect = true

    const selectGroupName = GroupGetter.getGroupSelect().value
    const selectDiv = GroupGetter.getGroupSelectSpan()

    selectDiv.innerHTML = ''
    selectDiv.appendChild(SelectBox.build(groupList, selectGroupName))

    const buttonDiv = GroupGetter.getSaveButton()

    buttonDiv.innerHTML = ''
    // buttonDiv.appendChild(ButtonField.groupSaveButton())
  },
}

const PEditGroupDialogPreparer = {
  saveAccountListEffect(groupList: GroupList): SaveAccountListEffect {
    return () => {
      const req = GroupAccountListDomReader.buildRequestByAccountAddTable()
      return GroupService.saveGroup(groupList, req)
    }
  },
  closeDialogEffectRemindDialog(): CloseDialogEffectRemindDialog {
    return (dialog: HTMLDialogElement) => () => {
      dialog.close()
      dialog.remove()
    }
  },
}
