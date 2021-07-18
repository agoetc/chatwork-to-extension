import { Account, AccountId, AccountList } from '../../../../domain/Account'
import { GroupRequest } from '../../../../domain/Group'
import { GroupGetter } from '../getter/GroupGetter'

export const GroupAccountListDomReader = {
  buildRequestByAccountAddTable(): GroupRequest {
    const select = GroupGetter.getGroupSelect()
    const accountListElement = GroupGetter.getCheckedAccountList()

    const accountList: AccountList = AccountListElement.buildCheckedAccountList(accountListElement)

    return {
      name: select.value,
      accountList: accountList,
    }
  },
}

const AccountListElement = {
  buildCheckedAccountList(accountListElement: HTMLCollectionOf<HTMLInputElement>): AccountList {
    const checkedAccountList = Array.from(accountListElement)
      .filter((accountElement) => accountElement.checked)
      .map((accountElement) => {
        return this.buildAccount(accountElement)
      })

    return { value: checkedAccountList }
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
