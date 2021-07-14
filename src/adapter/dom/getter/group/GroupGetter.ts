import {env} from "../../../../env";
import {Common} from "../Common";

export const GroupGetter = {
    getTBody(): HTMLTableElement {
        const tBody = <HTMLTableElement>document.getElementById(env.id.tbody)
        return Common.nullCheck(tBody)
    },
    getGroupSelect(): HTMLSelectElement {
        const groupSelect = <HTMLSelectElement>document.getElementById(env.id.select.select)
        return Common.nullCheck(groupSelect)
    },
    getCheckAccounts(): HTMLCollection {
        const checkAccounts = <HTMLCollection>document.getElementsByClassName(env.class.checkBox)
        return Common.nullCheck(checkAccounts)
    }
}