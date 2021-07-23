import { GroupList } from '../../../../../../domain/Group'
import { GroupGetter } from '../../../../../../adapter/dom/group/getter/GroupGetter'
import { TableAccountRow } from '../../../../builder/group/dialog/account-save-table/TableAccountRow'
import { SelectBox } from '../../../../builder/group/dialog/edit-form/SelectBox'

export const EffectSelectGroup = {
  effect(groupList: GroupList, selectGroupName = ''): HTMLSpanElement {
    const span = SelectBox.build(groupList, selectGroupName)
    span.addEventListener('change', () => {
      // state.isDefaultSelect = false
      // TODO
      const selectGroup: HTMLSelectElement = GroupGetter.getGroupSelect()
      const group = groupList.value.find((group) => group.name === selectGroup.value)
      if (group !== undefined) {
        const tBody = GroupGetter.getTBody()
        PEffectSelectGroup.removeTBodyChild(tBody)

        // // 選択したら選択してくださいを削除
        // if (select.firstElementChild.id === env.id.defaultSelect) {
        //     select.firstElementChild.remove()
        // }

        const tr = TableAccountRow.build(group.accountList)
        tBody.appendChild(tr)
      }
    })
    return span
  },
}

const PEffectSelectGroup = {
  removeTBodyChild(tBody: HTMLElement): void {
    while (tBody.childElementCount) {
      tBody.children[0].remove()
    }
  },
}
