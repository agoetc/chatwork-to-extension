import { GroupList } from '../../../../../../domain/Group'
import { OptionFragment } from './OptionFragment'
import {
  GroupAddButtonEffect,
  EffectAddButton,
} from '../../../../effector/group/dialog/edit-form/GroupAddButton'

export const AddForm = {
  generate(
    groupList: GroupList,
    addEffect: (input: HTMLInputElement) => GroupAddButtonEffect
  ): HTMLSpanElement {
    const datalist = PAddForm.datalist(groupList)
    const input = PAddForm.input()
    const button = EffectAddButton.effect(addEffect(input))

    return PAddForm.span(input, datalist, button)
  },
}

const PAddForm = {
  span(
    input: HTMLInputElement,
    datalist: HTMLDataListElement,
    button: HTMLButtonElement
  ): HTMLSpanElement {
    const span = document.createElement('span')
    span.id = 'group-form-span'

    span.appendChild(input)
    span.appendChild(datalist)
    span.appendChild(button)

    return span
  },
  datalist(groupList: GroupList): HTMLDataListElement {
    const datalist: HTMLDataListElement = document.createElement('datalist')
    datalist.id = 'group-list-datalist'
    datalist.appendChild(OptionFragment.generate(groupList))
    return datalist
  },
  // 入力欄
  input(): HTMLInputElement {
    const input: HTMLInputElement = document.createElement('input')
    input.type = 'text'
    input.autocomplete = 'on'
    input.setAttribute('list', 'group-list-datalist')
    return input
  },
}
