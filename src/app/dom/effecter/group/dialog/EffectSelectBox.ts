import { GroupList } from '../../../../../domain/Group'
import { GroupGetter } from '../../../../../adapter/dom/getter/group/GroupGetter'
import { Tr } from '../../../generater/group/dialog/Tr'
import { SelectBox } from '../../../generater/group/dialog/SelectBox'

export const EffectSelectBox = {
  effect(groupList: GroupList, selectGroupName = ''): HTMLSpanElement {
    const span = SelectBox.generate(groupList, selectGroupName)
    span.addEventListener('change', () => {
      // state.isDefaultSelect = false
      // TODO
      const select: HTMLSelectElement = span.getElementsByTagName('select')[0]
      const group = groupList.value.find((group) => group.name === select.value)
      if (group !== undefined) {
        const tBody = GroupGetter.getTBody()
        PEffectSelectBox.removeTBodyChild(tBody)

        // // 選択したら選択してくださいを削除
        // if (select.firstElementChild.id === env.id.defaultSelect) {
        //     select.firstElementChild.remove()
        // }

        const tr = Tr.generate(group.accountList)
        tBody.appendChild(tr)
      }
    })
    return span
  },
}

const PEffectSelectBox = {
  removeTBodyChild(tBody: HTMLElement): void {
    while (tBody.childElementCount) {
      tBody.children[0].remove()
    }
  },
}
