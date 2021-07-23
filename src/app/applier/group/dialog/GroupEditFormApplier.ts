import { GroupEditForm } from '../../../../adapter/dom-builder/builder/group/dialog/edit-form/GroupEditForm'
import { GroupList } from '../../../../domain/Group'
import { GroupService } from '../../../service/GroupService'
import { GroupDeleteButtonEffect } from '../../../../adapter/dom-builder/effector/group/dialog/edit-form/EffectDeleteGroupButton'
import { GroupGetter } from '../../../../adapter/dom-getter/group/GroupGetter'
import { SaveGroupEffectRemindInput } from '../../../../adapter/dom-builder/effector/group/dialog/edit-form/EffectSaveGroupButton'

export const GroupEditFormApplier = {
  apply(groupList: GroupList): HTMLDivElement {
    const addEffect = PGroupEditFormApplier.addEffect(groupList)
    const deleteEffect = PGroupEditFormApplier.deleteEffect(groupList)
    return GroupEditForm.build(groupList, addEffect, deleteEffect)
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
