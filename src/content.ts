import {AccountService} from "./service/AccountService";

window.onload = () => setTimeout(listener, 2000)

const listener = () => {
    setInterval(aa, 10000)
}

const aa = ()  =>  {
    console.log(AccountService.getAccountList())
}