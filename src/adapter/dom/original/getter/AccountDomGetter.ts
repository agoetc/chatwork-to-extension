import { Common } from '../../Common'

export const AccountDomGetter = {
  getAccountListFromTo(): HTMLCollection {
    const AccountListDom: HTMLCollection = document
      .getElementsByClassName('_cwLTList tooltipList')[2]
      .getElementsByTagName('li')

    return Common.nullCheck(AccountListDom)
  },
}
