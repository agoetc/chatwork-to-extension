import { GroupEditForm } from '../../../builder/builder/group/dialog/edit-form/GroupEditForm'
import { GroupList } from '../../../../../domain/Group'
import { GroupService } from '../../../../../affector/service/GroupService'
import { GroupDeleteButtonEffect } from '../../../builder/effector/group/dialog/edit-form/EffectDeleteGroupButton'
import { GroupGetter } from '../../../getter/group/GroupGetter'
import { SaveGroupEffectRemindInput } from '../../../builder/effector/group/dialog/edit-form/EffectSaveGroupButton'
import { AccountDomReader } from '../../../reader/original/AccountDomReader'
import { TableAccountRow } from '../../../builder/builder/group/dialog/account-save-table/TableAccountRow'
import {
  ChangeGroupEffect,
  EffectSelectGroup,
} from '../../../builder/effector/group/dialog/account-add-table/EffectSelectGroup'
import { EditGroupFormDomReader } from '../../../reader/group/EditGroupFormDomReader'
import { GroupSessionStorageRepository } from '../../../../session-storage/repository/GroupSessionStorageRepository'

export const EditGroupFormPreparer = {
  prepare(): HTMLDivElement {
    const addEffect = PEditGroupFormPreparer.addEffect()
    const deleteEffect = PEditGroupFormPreparer.deleteEffect()
    const changeGroupEffect = PEditGroupFormPreparer.changeGroupEffect()

    // TODO 消す
    const groupList = GroupSessionStorageRepository.get()

    return GroupEditForm.build(groupList, addEffect, deleteEffect, changeGroupEffect)
  },
  // group追加後、selectBoxに追加するための処理
  reloadSelectGroupElement(groupList: GroupList) {
    const selectGroupName = EditGroupFormDomReader.selectGroupName()
    const selectGroupElement = GroupGetter.getGroupSelectSpan()

    const changeGroupEffect = PEditGroupFormPreparer.changeGroupEffect()
    const reloadedSelectGroupElement = EffectSelectGroup.effect(
      groupList,
      changeGroupEffect,
      selectGroupName
    )

    selectGroupElement.innerHTML = ''
    selectGroupElement.appendChild(reloadedSelectGroupElement)
  },
}

const PEditGroupFormPreparer = {
  addEffect(): SaveGroupEffectRemindInput {
    return (input: HTMLInputElement) => () => {
      const groupList = GroupSessionStorageRepository.get()
      const result = GroupService.saveGroup(groupList, {
        name: input.value,
        accountList: { value: [] },
      })
      EditGroupFormPreparer.reloadSelectGroupElement(groupList)
      return result
    }
  },
  deleteEffect(): GroupDeleteButtonEffect {
    return () => {
      const deleteGroupName = EditGroupFormDomReader.selectGroupName()
      return GroupService.deleteGroup(deleteGroupName)
    }
  },
  changeGroupEffect(): ChangeGroupEffect {
    return () => {
      const groupList = GroupSessionStorageRepository.get()
      const toAccountList = AccountDomReader.getAccountList()
      const selectGroupName = EditGroupFormDomReader.selectGroupName()

      const group = GroupList.findGroupByName(groupList, selectGroupName)

      if (group !== undefined) {
        const tbody = GroupGetter.getTBody()
        while (tbody.childElementCount) {
          tbody.children[0].remove()
        }

        const tr = TableAccountRow.build(toAccountList, group.accountList)
        tbody.appendChild(tr)
      }
    }
  },
}
