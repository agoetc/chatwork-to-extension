import { Common } from '../../Common'

export const TextAreaDomGetter = {
  getTextArea(): HTMLTextAreaElement {
    const textArea = <HTMLTextAreaElement>document.getElementById('_chatText')
    return Common.nullCheck(textArea)
  },
}
