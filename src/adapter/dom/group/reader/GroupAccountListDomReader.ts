import { Account, AccountId, AccountList } from '../../../../domain/Account'
import { GroupRequest } from '../../../../domain/Group'
import { GroupGetter } from '../getter/GroupGetter'

export const GroupAccountListDomReader = {
  buildRequestByAccountAddTable(): GroupRequest {
    const select = GroupGetter.getGroupSelect()
    const checkedAccountList = GroupGetter.getCheckedAccountList()

    const accountList: AccountList = AccountListElement.buildAccountList(checkedAccountList)

    return {
      name: select.name,
      accountList: accountList,
    }
  },
}

const AccountListElement = {
  buildAccountList(accountListElement: HTMLCollectionOf<HTMLInputElement>): AccountList {
    const accountList: AccountList = { value: [] }

    for (let i = 0; i < accountListElement.length; i++) {
      const checkedAccountElement = accountListElement[i]
      const checkedAccount = this.buildAccount(checkedAccountElement)
      accountList.value.push(checkedAccount)
    }

    return accountList
  },
  buildAccount(accountElement: HTMLInputElement): Account {
    const accountId = accountElement.dataset.aId
    const imagePath = accountElement.dataset.imagePath
    const name = accountElement.dataset.name

    if (accountId !== undefined && imagePath !== undefined && name !== undefined) {
      return {
        accountId: AccountId.fromString(accountId),
        imagePath: imagePath,
        name: name,
      }
    } else {
      console.log(accountElement.dataset)
      throw DOMException
    }
  },
}
