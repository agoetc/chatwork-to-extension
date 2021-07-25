import { GroupEditForm } from '../../../../adapter/dom-builder/builder/group/dialog/edit-form/GroupEditForm'
import { GroupList } from '../../../../domain/Group'
import { GroupService } from '../../../service/GroupService'
import { GroupDeleteButtonEffect } from '../../../../adapter/dom-builder/effector/group/dialog/edit-form/EffectDeleteGroupButton'
import { GroupGetter } from '../../../../adapter/dom-getter/group/GroupGetter'
import { SaveGroupEffectRemindInput } from '../../../../adapter/dom-builder/effector/group/dialog/edit-form/EffectSaveGroupButton'
import { AccountDomReader } from '../../../../adapter/dom-reader/original/AccountDomReader'
import { TableAccountRow } from '../../../../adapter/dom-builder/builder/group/dialog/account-save-table/TableAccountRow'
import { ChangeGroupEffect } from '../../../../adapter/dom-builder/effector/group/dialog/account-add-table/EffectSelectGroup'

export const EditGroupFormPreparer = {
  prepare(groupList: GroupList): HTMLDivElement {
    const addEffect = PEditGroupFormPreparer.addEffect(groupList)
    const deleteEffect = PEditGroupFormPreparer.deleteEffect(groupList)
    const changeGroupEffect = PEditGroupFormPreparer.changeGroupEffect(groupList)
    return GroupEditForm.build(groupList, addEffect, deleteEffect, changeGroupEffect)
  },
}

const PEditGroupFormPreparer = {
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
  // TODO 動いてない
  changeGroupEffect(groupList: GroupList): ChangeGroupEffect {
    return () => {
      console.log('hugahuga')

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
