import {AccountDomReader} from "./adapter/dom/reader/AccountDomReader";

window.onload = () => setTimeout(listener, 2000)

const listener = () => {
    setInterval(aa, 10000)
}

const aa = ()  =>  {
    console.log(AccountDomReader.getAccountList())
}