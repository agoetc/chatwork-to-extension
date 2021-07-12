import {AccountDomReader} from "../adapter/dom/reader/AccountDomReader";
import {AccountReader} from "../domain/reader/AccountReader";


const accountReader: AccountReader = AccountDomReader

export const AccountService = {
    getAccountList() {
        accountReader.getAccountList()
    }
}
