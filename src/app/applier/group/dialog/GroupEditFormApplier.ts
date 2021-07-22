import { GroupEditForm } from '../../../dom/generater/group/dialog/edit-form/GroupEditForm'
import { GroupList } from '../../../../domain/Group'
import { GroupAddButtonEffect } from '../../../dom/effector/group/dialog/edit-form/GroupAddButton'
import { GroupService } from '../../../service/GroupService'
import { GroupDeleteButtonEffect } from '../../../dom/effector/group/dialog/edit-form/GroupDeleteButton'
import { GroupGetter } from '../../../../adapter/dom/group/getter/GroupGetter'

export const GroupEditFormApplier = {
  apply(groupList: GroupList): HTMLDivElement {
    const addEffect = PGroupEditFormApplier.addEffect(groupList)
    const deleteEffect = PGroupEditFormApplier.deleteEffect(groupList)
    return GroupEditForm.generate(groupList, addEffect, deleteEffect)
  },
}

const PGroupEditFormApplier = {
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
