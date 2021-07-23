import { GroupingDialog } from '../../../../adapter/dom-builder/builder/group/dialog/dialog/GroupingDialog'
import { GroupList } from '../../../../domain/Group'
import { GroupGetter } from '../../../../adapter/dom-getter/group/GroupGetter'
import { SelectBox } from '../../../../adapter/dom-builder/builder/group/dialog/edit-form/SelectBox'
import { EditGroupFormPreparer } from './EditGroupFormPreparer'
import { AddAccountTablePreparer } from './AddAccountTablePreparer'
import { SaveAccountListEffect } from '../../../../adapter/dom-builder/effector/group/dialog/dialog/EffectSaveAccountButton'
import { GroupAccountListDomReader } from '../../../../adapter/dom-reader/group/GroupAccountListDomReader'
import { GroupService } from '../../../service/GroupService'
import { CloseDialogEffectRemindDialog } from '../../../../adapter/dom-builder/effector/group/dialog/dialog/EffectCloseDialogButton'

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
