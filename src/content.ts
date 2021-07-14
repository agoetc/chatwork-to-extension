import { AccountService } from './app/service/AccountService'
import { Applier } from './app/dom/applier/Applier'

window.onload = () => setTimeout(listener, 1000)

const listener = async () => {
  await Applier.apply()
  setInterval(aa, 5000)
}

const aa = async () => {
  console.log(AccountService.getAccountList())
}
