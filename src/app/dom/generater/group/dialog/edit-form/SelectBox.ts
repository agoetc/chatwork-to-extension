import { Group, GroupList } from '../../../../../../domain/Group'
import { env } from '../../../../../../env'
import { OptionFragment } from './OptionFragment'
import { GroupGetter } from '../../../../../../adapter/dom/group/getter/GroupGetter'
import { TableAccountRow } from '../account-add-table/TableAccountRow'

export const SelectBox = {
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
  appendOption(select: HTMLSelectElement, groupList: GroupList, selectGroupName: string) {
    const haveGroupName = groupList.value.some((g) => g.name === selectGroupName)
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
