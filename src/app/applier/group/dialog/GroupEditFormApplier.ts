import { GroupEditForm } from '../../../dom/generater/group/dialog/edit-form/GroupEditForm'
import { GroupList } from '../../../../domain/Group'
import { GroupService } from '../../../service/GroupService'
import { GroupDeleteButtonEffect } from '../../../dom/effector/group/dialog/edit-form/EffectDeleteGroupButton'
import { GroupGetter } from '../../../../adapter/dom/group/getter/GroupGetter'
import { SaveGroupEffectRemindInput } from '../../../dom/effector/group/dialog/edit-form/EffectSaveGroupButton'

export const GroupEditFormApplier = {
  apply(groupList: GroupList): HTMLDivElement {
    const addEffect = PGroupEditFormApplier.addEffect(groupList)
    const deleteEffect = PGroupEditFormApplier.deleteEffect(groupList)
    return GroupEditForm.generate(groupList, addEffect, deleteEffect)
  },
}

const PGroupEditFormApplier = {
  addEffect(groupList: GroupList): SaveGroupEffectRemindInput {
    return (input: HTMLInputElement) => () =>
      GroupService.saveGroup(groupList, {
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
