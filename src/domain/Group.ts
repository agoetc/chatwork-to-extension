import {AccountList} from "./Account";
import {GroupAccountListDomReader} from "../adapter/dom/reader/GroupAccountListDomReader";

export interface Group {
    name: string,
    accountList: AccountList
}

export interface GroupList {
    value: Group[]
}

export const GroupList = {
    toObj(groupList: GroupList) {
        const object: any = {} // TODO: delete any
        groupList.value.forEach(group => {
            object[group.name] = {}
            object[group.name]['accountList'] = group.accountList.value
        })
        return object
    }
}

export interface GroupRequest {
    name: string,
    accountList: AccountList
}