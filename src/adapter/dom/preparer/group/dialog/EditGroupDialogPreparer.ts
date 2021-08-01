import { GroupingDialog } from '../../../builder/builder/group/dialog/dialog/GroupingDialog'
import { GroupList } from '../../../../../domain/Group'
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
