import { GroupList } from '../../../../../../../domain/Group'

export const OptionFragment = {
  build(groupList: GroupList, selectGroupName: string = '') {
    const fragment = document.createDocumentFragment()

    groupList.value.forEach((group) => {
      const option = document.createElement('option')
      option.value = group.name
      option.innerText = group.name
      fragment.appendChild(option)
      if (group.name === selectGroupName) {
        option.selected = true
      }
    })

    return fragment
  },
}
