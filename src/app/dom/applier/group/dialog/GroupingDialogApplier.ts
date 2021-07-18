import { GroupingDialog } from '../../../generater/group/dialog/dialog/GroupingDialog'
import { GroupList } from '../../../../../domain/Group'
import { GroupGetter } from '../../../../../adapter/dom/group/getter/GroupGetter'
import { SelectBox } from '../../../generater/group/dialog/edit-form/SelectBox'
import { ButtonField } from '../../../generater/group/dialog/dialog/ButtonField'
import { GroupEditFormApplier } from './GroupEditFormApplier'
import { AccountAddTableApplier } from './AccountAddTableApplier'

export const GroupingDialogApplier = {
  apply(groupList: GroupList): HTMLDialogElement {
    const groupEditForm = GroupEditFormApplier.apply(groupList)
    const accountAddTable = AccountAddTableApplier.apply()
    return GroupingDialog.generate(groupEditForm, accountAddTable)
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
