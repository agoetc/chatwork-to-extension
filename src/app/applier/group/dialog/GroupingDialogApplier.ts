import { GroupingDialog } from '../../../dom/generater/group/dialog/dialog/GroupingDialog'
import { GroupList } from '../../../../domain/Group'
import { GroupGetter } from '../../../../adapter/dom/group/getter/GroupGetter'
import { SelectBox } from '../../../dom/generater/group/dialog/edit-form/SelectBox'
import { GroupEditFormApplier } from './GroupEditFormApplier'
import { AccountAddTableApplier } from './AccountAddTableApplier'
import { AddAccountListEffect } from '../../../dom/effector/group/dialog/dialog/EffectAccountSaveButton'
import { GroupAccountListDomReader } from '../../../../adapter/dom/group/reader/GroupAccountListDomReader'
import { GroupService } from '../../../service/GroupService'

export const GroupingDialogApplier = {
  apply(groupList: GroupList): HTMLDialogElement {
    console.log(groupList)

    const groupEditForm = GroupEditFormApplier.apply(groupList)
    const accountAddTable = AccountAddTableApplier.apply()
    const addAccountListEffect = PGroupingDialogApplier.addAccountListEffect(groupList)
    return GroupingDialog.generate(groupEditForm, accountAddTable, addAccountListEffect)
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
  addAccountListEffect(groupList: GroupList): AddAccountListEffect {
    return () => {
      const req = GroupAccountListDomReader.buildRequestByAccountAddTable()
      return GroupService.addGroup(groupList, req)
    }
  },
}
