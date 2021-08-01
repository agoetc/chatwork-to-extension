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
import { EditGroupDialogPreparer } from './EditGroupDialogPreparer'
import { SelectBox } from '../../../builder/builder/group/dialog/edit-form/SelectBox'
import { EditGroupFormDomReader } from '../../../reader/group/EditGroupFormDomReader'

export const EditGroupFormPreparer = {
  prepare(groupList: GroupList): HTMLDivElement {
    const addEffect = PEditGroupFormPreparer.addEffect(groupList)
    const deleteEffect = PEditGroupFormPreparer.deleteEffect(groupList)
    const changeGroupEffect = PEditGroupFormPreparer.changeGroupEffect(groupList)
    return GroupEditForm.build(groupList, addEffect, deleteEffect, changeGroupEffect)
  },
  // group追加後、selectBoxに追加するための処理
  reloadSelectGroupElement(groupList: GroupList) {
    const selectGroupName = EditGroupFormDomReader.selectGroupName()
    const selectGroupElement = GroupGetter.getGroupSelectSpan()

    const changeGroupEffect = PEditGroupFormPreparer.changeGroupEffect(groupList)
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
  addEffect(groupList: GroupList): SaveGroupEffectRemindInput {
    return (input: HTMLInputElement) => () => {
      const result = GroupService.saveGroup(groupList, {
        name: input.value,
        accountList: { value: [] },
      })
      EditGroupFormPreparer.reloadSelectGroupElement(groupList)
      return result
    }
  },
  deleteEffect(groupList: GroupList): GroupDeleteButtonEffect {
    return () => {
      const deleteGroupName = EditGroupFormDomReader.selectGroupName()
      return GroupService.deleteGroup(groupList, deleteGroupName)
    }
  },
  changeGroupEffect(groupList: GroupList): ChangeGroupEffect {
    return () => {
      const toAccountList = AccountDomReader.getAccountList()
      const selectGroup = GroupGetter.getGroupSelect()
      // state.isDefaultSelect = false
      const group = GroupList.findGroupByName(groupList, selectGroup.value)
      if (group !== undefined) {
        const tbody = GroupGetter.getTBody()
        while (tbody.childElementCount) {
          tbody.children[0].remove()
        }

        // 選択したら選択してくださいを削除
        // if (selectGroup.firstElementChild.id === env.id.defaultSelect) {
        //   selectGroup.firstElementChild.remove()
        // }

        const tr = TableAccountRow.build(toAccountList, group.accountList)
        tbody.appendChild(tr)
      }
    }
  },
}
