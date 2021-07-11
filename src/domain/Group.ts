import {AccountList} from "./Account";
import {GroupAccountListDomReader} from "../adapter/dom/reader/AccountDomReader";

export interface Group {
    name: string,
    accountList: AccountList
}

export interface GroupList {
    value: Group[]
}

export interface GroupRequest {
    name: string,
    accountList: AccountList
}

export const GroupRequest = {
    buildByCheckBox() {
        return GroupAccountListDomReader.build()
    }
}