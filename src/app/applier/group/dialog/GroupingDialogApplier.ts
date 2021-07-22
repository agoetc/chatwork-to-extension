import { GroupingDialog } from '../../../dom/generater/group/dialog/dialog/GroupingDialog'
import { GroupList } from '../../../../domain/Group'
import { GroupGetter } from '../../../../adapter/dom/group/getter/GroupGetter'
import { SelectBox } from '../../../dom/generater/group/dialog/edit-form/SelectBox'
import { GroupEditFormApplier } from './GroupEditFormApplier'
import { AccountAddTableApplier } from './AccountAddTableApplier'
import { SaveAccountListEffect } from '../../../dom/effector/group/dialog/dialog/EffectSaveAccountButton'
import { GroupAccountListDomReader } from '../../../../adapter/dom/group/reader/GroupAccountListDomReader'
import { GroupService } from '../../../service/GroupService'
import { CloseDialogEffectRemindDialog } from '../../../dom/effector/group/dialog/dialog/EffectCloseDialogButton'

export const GroupingDialogApplier = {
  apply(groupList: GroupList): HTMLDialogElement {
    console.log(groupList)

    const groupEditForm = GroupEditFormApplier.apply(groupList)
    const accountAddTable = AccountAddTableApplier.apply()
    const saveAccountListEffect = PGroupingDialogApplier.saveAccountListEffect(groupList)
    return GroupingDialog.generate(
      groupEditForm,
      accountAddTable,
      saveAccountListEffect,
      PGroupingDialogApplier.closeDialogEffectRemindDialog()
    )
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
    // buttonDiv.appendChild(ButtonField.groupSaveButton())
  },
}

const PGroupingDialogApplier = {
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
