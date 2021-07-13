import {AccountService} from "./service/AccountService";
import {Applier} from "./app/dom/applier/Applier";

window.onload = () => setTimeout(listener, 2000)

const listener = async () => {

    await Applier.apply()
    setInterval(aa, 10000)
}

const aa = () => {
    console.log(AccountService.getAccountList())
}