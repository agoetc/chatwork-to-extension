import { env } from '../../../../env'
import { Common } from '../Common'

export const GroupGetter = {
  getTBody(): HTMLTableElement {
    const tBody = <HTMLTableElement>document.getElementById(env.id.tbody)
    return Common.nullCheck(tBody)
  },
  getGroupSelect(): HTMLSelectElement {
    const groupSelect = <HTMLSelectElement>document.getElementById(env.id.select.select)
    return Common.nullCheck(groupSelect)
  },
  getGroupSelectSpan(): HTMLSpanElement {
    const groupSelectSpan = <HTMLSpanElement>document.getElementById(env.id.select.span)
    return Common.nullCheck(groupSelectSpan)
  },
  getSaveButton() {
    const saveButtonSpan = <HTMLSpanElement>document.getElementById(env.id.saveButton.span)
    return Common.nullCheck(saveButtonSpan)
  },
  getCheckedAccountList(): HTMLCollectionOf<HTMLInputElement> {
    return <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName(env.class.checkBox)
  },
  getToList(): HTMLElement {
    const toList = document.getElementById(env.id.toList)
    return Common.nullCheck(toList)
  },
}
