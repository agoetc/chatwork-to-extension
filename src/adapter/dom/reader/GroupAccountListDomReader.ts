import {Account, AccountId, AccountList} from "../../../domain/Account";
import {GroupRequest} from "../../../domain/Group";
import {GroupGetter} from "../getter/group/GroupGetter";

export const GroupAccountListDomReader = {
    getRequest(): GroupRequest {
        const select = GroupGetter.getGroupSelect()
        const checkedAccountList = GroupGetter.getCheckAccounts()

        const accountList: AccountList = AccountListElement.buildAccountList(checkedAccountList)

        return {
            name: select.name,
            accountList: accountList
        }
    }
}

const AccountListElement = {
    buildAccountList(accountListElement: HTMLCollection): AccountList {
        const accountList: AccountList = {value: []}

        for (let i = 0; i < accountListElement.length; i++) {
            const checkedAccountElement = <HTMLInputElement>accountListElement[i]
            const checkedAccount = this.buildAccount(checkedAccountElement)
            accountList.value.push(checkedAccount)
        }

        return accountList

    },
    buildAccount(accountElement: HTMLInputElement): Account {
        const accountId = accountElement.dataset.aid
        const imagePath = accountElement.dataset.imagePath
        const name = accountElement.dataset.name

        if (accountId !== undefined
            && imagePath !== undefined
            && name !== undefined
        ) {
            return {
                accountId: AccountId.fromString(accountId),
                imagePath: imagePath,
                name: name
            }
        } else {
            throw DOMException
        }
    }

}