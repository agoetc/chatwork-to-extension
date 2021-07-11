import {env} from "../../../env"
import {Account, AccountList} from "../../../domain/Account";
import {GroupRequest} from "../../../domain/Group";

export const AccountDomReader = {
    buildAccountList(): AccountList {
        const toAccountListDOM: HTMLCollection =
            document
                .getElementsByClassName('_cwLTList tooltipList')[2]
                .getElementsByTagName('li')

        const accountList: AccountList = {value: []}

        for (let i = 0; i < toAccountListDOM.length; i++) {
            const item: Element | null = toAccountListDOM.item(i)
            if (item && !this.isToAll(item)) {
                const account = this.buildAccount(item)
                accountList.value.push(account)
            }
        }
        return accountList
    },
    buildAccount(accountDOM: Element): Account {
        return {
            accountId: Number(accountDOM.getAttribute('cwuiLtValue')),
            // TODO: stub
            imagePath: 'tmpImagePath',  //accountDOM[0].getAttribute('src'),
            name: 'tmpName' //accountDOM.children[1].innerText
        }
    },
    isToAll(accountDOM: Element): boolean {
        return Number(accountDOM.getAttribute('cwuiLtValue')) === 0
    }
}

export const GroupAccountListDomReader = {
    build() {
        /** @type {HTMLSelectElement} */
        const select: any = document.getElementById(env.id.select.select)
        /** @type {HTMLCollection} */
        const accountListDOM: any = document.getElementsByClassName(env.class.checkBox)

        const accountList: AccountList = {value: []}

        for (let i = 0; i < accountListDOM.length; i++) {
            /** @type {HTMLInputElement}*/
            const accountDOM: any = accountListDOM[i]

            if (accountDOM !== null && accountDOM.checked) {
                const account: Account = {
                    accountId: Number(accountDOM.dataset.aId),
                    imagePath: accountDOM.dataset.imagePath,
                    name: accountDOM.dataset.name
                }

                accountList.value.push(account)
            }
        }

        const request: GroupRequest = {
            name: select?.name,
            accountList: accountList
        }
        return request
    }
}
