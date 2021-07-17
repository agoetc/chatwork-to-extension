import { GroupList } from '../../../../../../domain/Group'
import { OptionFragment } from './OptionFragment'
import { AddEffect, EffectAddForm } from '../../../../effecter/group/dialog/edit-form/AddForm'

export const AddForm = {
  generate(
    groupList: GroupList,
    addEffect: (input: HTMLInputElement) => AddEffect
  ): HTMLSpanElement {
    const datalist = PAddForm.datalist(groupList)
    const input = PAddForm.input()
    const button = EffectAddForm.effectAddButton(addEffect(input))

    return PAddForm.span(input, datalist, button)
  },
  addButton(): HTMLButtonElement {
    const button = document.createElement('button')
    button.className = '_cwDGButton  button btnPrimary'
    button.textContent = '追加する'
    return button
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
