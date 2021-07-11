import {AccountDomReader} from "../dom/reader/AccountDomReader";

export interface Account {
    accountId: number,
    imagePath: string,
    name: string
}

export interface ListObject {
}

export interface AccountList extends ListObject {
    value: Account[]
}

export const AccountList = {
    buildByObj(accountListObj: AccountList): AccountList {
        const accountList: AccountList = {value: []}
        Object.keys(accountListObj.value).forEach((key) => {
            const keyNumber = Number(key)
            const account: Account = {
                accountId: Number(accountListObj.value[keyNumber].accountId),
                imagePath: accountListObj.value[keyNumber].imagePath,
                name: accountListObj.value[keyNumber].name
            }
            accountList.value.push(account)
        })

        return accountList
    },
    mergeAccountListRequest(savedAccountList: AccountList, accountList: AccountList): AccountList {
        const accountListByToList: AccountList = AccountDomReader.buildAccountList()
        /**
         * チャット外の人は使い回す
         * 既にGroupに追加されている人は使い回さない（名前とか変わっている可能性あるので）
         * @type {Array<Account>}
         */
        const reuseAccountListAccount = savedAccountList.value.filter(oldAccount => {
            const isOutsider = !accountListByToList.value.some(toAccount => toAccount.accountId === oldAccount.accountId)
            const exists = accountList.value.some(reqAccount => reqAccount.accountId !== oldAccount.accountId)

            return isOutsider || !exists
        })

        return {value: reuseAccountListAccount.concat(accountList.value)}
    }

}

