import { Account, AccountId, AccountList } from '../../../../domain/Account'
import { AccountReader } from '../../../../domain/reader/AccountReader'
import { ToListDomGetter } from '../../getter/original/ToListDomGetter'

export const AccountDomReader: AccountReader = {
  /** CanDo **/
  getAccountList(): AccountList {
    const accountListDom = ToListDomGetter.getAccountListFromTo()
    return PAccountDomReader.buildAccountList(accountListDom)
  },
}

const PAccountDomReader = {
  buildAccountList(accountListDom: HTMLCollection): AccountList {
    const accountList: AccountList = { value: [] }

    for (let i = 0; i < accountListDom.length; i++) {
      const accountDom = <HTMLLIElement>accountListDom[i]
      if (PAccountDomReader.isAccount(accountDom)) {
        const account: Account = PAccountDomReader.buildAccount(accountDom)
        accountList.value.push(account)
      }
    }
    return accountList
  },
  /**
   * CanDo
   */
  buildAccount(accountDOM: HTMLLIElement): Account {
    const accountId: string | undefined = accountDOM.dataset.cwuiLtValue
    const imagePath: string | null = accountDOM.children[0].getAttribute('src')
    const name: string | null = accountDOM.children[1].textContent
    if (accountId !== undefined && imagePath !== null && name !== null) {
      return {
        accountId: AccountId.fromString(accountId),
        imagePath: imagePath,
        name: name,
      }
    } else {
      console.log('error')
      console.log(accountId, imagePath, name)
      throw new DOMException("doe's not build account")
    }
  },
  /**
   * CanDo
   */
  isAccount(accountDOM: HTMLLIElement): boolean {
    const index: string | undefined = accountDOM.dataset.cwuiLtValue
    return index !== undefined && index !== 'toall'
  },
}
