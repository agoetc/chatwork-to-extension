import { Group, GroupList } from '../../../../../domain/Group'
import { env } from '../../../../../env'
import { OptionFragment } from './OptionFragment'
import { GroupGetter } from '../../../../../adapter/dom/getter/group/GroupGetter'
import { Tr } from './Tr'

export const SelectBox = {
  effect(groupList: GroupList, selectGroupName = ''): HTMLSpanElement {
    const span = this.generate(groupList, selectGroupName)
    span.addEventListener('change', () => {
      // state.isDefaultSelect = false
      // TODO
      const select: HTMLSelectElement = span.getElementsByTagName('select')[0]
      const group = groupList.value.find((group) => group.name === select.value)
      if (group !== undefined) {
        const tBody = GroupGetter.getTBody()
        PSelectBox.removeTBodyChild(tBody)

        // // 選択したら選択してくださいを削除
        // if (select.firstElementChild.id === env.id.defaultSelect) {
        //     select.firstElementChild.remove()
        // }

        const tr = Tr.generate(group.accountList)
        tBody.appendChild(tr)
      }
    })
    return this.generate(groupList, selectGroupName)
  },
  generate(groupList: GroupList, selectGroupName = ''): HTMLSpanElement {
    const select = PSelectBox.select()
    const span = PSelectBox.span()

    PSelectBox.appendOption(select, groupList, selectGroupName)
    span.appendChild(select)
    return span
  },
}

const PSelectBox = {
  span(): HTMLSpanElement {
    const span = document.createElement('span')
    span.id = env.id.select.span
    return span
  },
  select(): HTMLSelectElement {
    const select = document.createElement('select')
    select.id = env.id.select.select
    return select
  },
  removeTBodyChild(tBody: HTMLElement): void {
    while (tBody.childElementCount) {
      tBody.children[0].remove()
    }
  },
  appendOption(
    select: HTMLSelectElement,
    groupList: GroupList,
    selectGroupName: string
  ) {
    const haveGroupName = groupList.value.some(
      (g) => g.name === selectGroupName
    )
    if (!haveGroupName) {
      const defaultOption = this.defaultOption()
      select.appendChild(defaultOption)
    }
    select.appendChild(OptionFragment.generate(groupList, selectGroupName))
  },
  defaultOption(): HTMLOptionElement {
    const option = document.createElement('option')
    option.id = env.id.defaultSelect
    option.selected = true
    option.innerText = '選択してください'
    option.value = ''

    return option
  },
}
