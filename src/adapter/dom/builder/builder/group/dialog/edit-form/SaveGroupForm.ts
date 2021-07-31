import { GroupList } from '../../../../../../../domain/Group'
import { OptionFragment } from './OptionFragment'
import {
  SaveGroupEffectRemindInput,
  EffectSaveGroupButton,
} from '../../../../effector/group/dialog/edit-form/EffectSaveGroupButton'

export const SaveGroupForm = {
  build(groupList: GroupList, saveEffectRemindInput: SaveGroupEffectRemindInput): HTMLSpanElement {
    const datalist = PSaveForm.datalist(groupList)
    const input = PSaveForm.input()
    const button = EffectSaveGroupButton.effect(saveEffectRemindInput(input))

    return PSaveForm.span(input, datalist, button)
  },
}

const PSaveForm = {
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
    datalist.appendChild(OptionFragment.build(groupList))
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
