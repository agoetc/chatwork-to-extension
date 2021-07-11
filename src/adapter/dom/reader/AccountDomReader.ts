import {Account, AccountId, AccountList} from "../../../domain/Account";

export const AccountDomReader = {
    /** CanDo **/
    buildAccountList(): AccountList {
        const toAccountListDOM: HTMLCollection =
            document
                .getElementsByClassName('_cwLTList tooltipList')[2]
                .getElementsByTagName('li')

        const accountList: AccountList = {value: []}

        for (let i = 0; i < toAccountListDOM.length; i++) {
            const item: Element = toAccountListDOM[i]
            if (!PrivateAccountDomReader.isToAll(item)) {
                const account: Account | null = PrivateAccountDomReader.buildAccount(item)
                if (account !== null) {
                    accountList.value.push(account)
                }
            }
        }
        return accountList
    }
}
const PrivateAccountDomReader = {
    /**
     * CanDo
     * TODO: any
     * @param accountDOM
     */
    buildAccount(accountDOM: any): Account | null {
        const accountId: string | null = accountDOM.dataset.cwuiLtValue
        const imagePath: string | null = accountDOM.children[0].getAttribute('src')
        const name: string | null = accountDOM.children[1].textContent
        if (accountId !== null && imagePath !== null && name !== null) {
            return {
                accountId: AccountId.fromString(accountId),
                imagePath: imagePath,
                name: name
            }
        } else {
            console.log('error')
            console.log(accountId, imagePath, name)
            // TODO: throw
            return null
        }
    },
    /**
     * CanDo
     * TODO: any
     * @param accountDOM Element
     */
    isToAll(accountDOM: any): boolean {
        return Number(accountDOM.dataset.cwuiLtValue) === 0
    }
}
