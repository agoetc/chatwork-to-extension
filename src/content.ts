import { AccountService } from './app/service/AccountService'
import { Applier } from './app/dom/applier/Applier'

window.onload = () => setTimeout(listener, 1000)

const listener = async () => {
  await Applier.apply()
  setInterval(aa, 10000)
}

const aa = () => {
  console.log(AccountService.getAccountList())
}
