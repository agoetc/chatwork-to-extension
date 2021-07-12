import {env} from "../../../env";
import {Account, AccountId, AccountList} from "../../../domain/Account";
import {GroupRequest} from "../../../domain/Group";

export const GroupAccountListDomReader = {
    getRequest(): GroupRequest {
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
                    accountId: AccountId.fromString(accountDOM.dataset.aId),
                    imagePath: accountDOM.dataset.imagePath,
                    name: accountDOM.dataset.name
                }

                accountList.value.push(account)
            }
        }

        return {
            name: select?.name,
            accountList: accountList
        }
    }
}
