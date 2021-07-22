import { Group, GroupList } from '../../../../domain/Group'

export const EffectGroupInList = {
  groupToFragment(
    filteredGroupList: GroupList,
    groupInToListEffectRemindGroup: AddGroupInToListEffectRemindGroup
  ): DocumentFragment {
    const fragment = document.createDocumentFragment()

    filteredGroupList.value.map((group) => {
      // liだとcwにclickイベント奪われるのでdivに
      const div = document.createElement('div')
      div.className = 'tooltipList__item'
      div.innerText = group.name
      div.addEventListener('click', groupInToListEffectRemindGroup(group))

      fragment.appendChild(div)
    })

    return fragment
  },
}

export type AddGroupInToListEffectRemindGroup = (group: Group) => () => void
