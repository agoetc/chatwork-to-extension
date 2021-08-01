import { GroupingDialog } from '../../../builder/builder/group/dialog/dialog/GroupingDialog'
import { EditGroupFormPreparer } from './EditGroupFormPreparer'
import { AddAccountTablePreparer } from './AddAccountTablePreparer'
import { SaveAccountListEffect } from '../../../builder/effector/group/dialog/dialog/EffectSaveAccountButton'
import { GroupAccountListDomReader } from '../../../reader/group/GroupAccountListDomReader'
import { GroupService } from '../../../../../affector/service/GroupService'
import { CloseDialogEffectRemindDialog } from '../../../builder/effector/group/dialog/dialog/EffectCloseDialogButton'
import { GroupSessionStorageRepository } from '../../../../session-storage/repository/GroupSessionStorageRepository'

export const EditGroupDialogPreparer = {
  prepare(): HTMLDialogElement {
    const groupEditForm = EditGroupFormPreparer.prepare()
    const accountAddTable = AddAccountTablePreparer.prepare()
    const saveAccountListEffect = PEditGroupDialogPreparer.saveAccountListEffect()
    return GroupingDialog.build(
      groupEditForm,
      accountAddTable,
      saveAccountListEffect,
      PEditGroupDialogPreparer.closeDialogEffectRemindDialog()
    )
  },
}

const PEditGroupDialogPreparer = {
  saveAccountListEffect(): SaveAccountListEffect {
    return () => {
      const groupList = GroupSessionStorageRepository.get()
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
