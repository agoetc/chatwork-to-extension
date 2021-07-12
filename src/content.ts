import {AccountService} from "./service/AccountService";
import {Applier} from "./app/dom/Applier";

window.onload = () => setTimeout(listener, 2000)

const listener = () => {
    Applier.applyGroupButton()
    setInterval(aa, 10000)
}

const aa = () => {
    console.log(AccountService.getAccountList())
}