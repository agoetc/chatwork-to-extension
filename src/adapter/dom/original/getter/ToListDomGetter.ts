import { Common } from '../../Common'

export const ToListDomGetter = {
  getAccountListFromTo(): HTMLCollection {
    const AccountListDom: HTMLCollection = document
      .getElementsByClassName('_cwLTList tooltipList')[2]
      .getElementsByTagName('li')
    return Common.nullCheck(AccountListDom)
  },
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
  getToListFooter(): HTMLDivElement {
    const toListFooter = <HTMLDivElement>document.getElementById('_toListFooter')
    return Common.nullCheck(toListFooter)
  },
}
