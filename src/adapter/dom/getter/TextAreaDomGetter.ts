import { Common } from './Common'

export const TextAreaDomGetter = {
  getToList(): HTMLElement {
    const toList = document.getElementById('_toList')
    return Common.nullCheck(toList)
  },
  getToolTipList(): HTMLUListElement {
    const toolTipList = <HTMLUListElement>(
      this.getToList().getElementsByClassName('_cwLTList tooltipList')[0]
    )
    return Common.nullCheck(toolTipList)
  },
  getTextArea(): HTMLTextAreaElement {
    const textArea = <HTMLTextAreaElement>document.getElementById('_chatText')
    return Common.nullCheck(textArea)
  },
}
