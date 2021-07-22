import { GroupList } from '../../../../../../domain/Group'
import { OptionFragment } from './OptionFragment'
import {
  AddGroupEffectRemindInput,
  EffectAddGroupButton,
} from '../../../../effector/group/dialog/edit-form/EffectAddGroupButton'

export const AddForm = {
  generate(groupList: GroupList, addEffectRemindInput: AddGroupEffectRemindInput): HTMLSpanElement {
    const datalist = PAddForm.datalist(groupList)
    const input = PAddForm.input()
    const button = EffectAddGroupButton.effect(addEffectRemindInput(input))

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
    span.id = 'getter-form-span'

    span.appendChild(input)
    span.appendChild(datalist)
    span.appendChild(button)

    return span
  },
  datalist(groupList: GroupList): HTMLDataListElement {
    const datalist: HTMLDataListElement = document.createElement('datalist')
    datalist.id = 'getter-list-datalist'
    datalist.appendChild(OptionFragment.generate(groupList))
    return datalist
  },
  // 入力欄
  input(): HTMLInputElement {
    const input: HTMLInputElement = document.createElement('input')
    input.type = 'text'
    input.autocomplete = 'on'
    input.setAttribute('list', 'getter-list-datalist')
    return input
  },
}
