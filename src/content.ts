import { Applier } from './app/applier/Applier'
import { ToListObserver } from './app/observer/original/ToListObserver'

window.onload = () => setTimeout(listener, 1000)

const listener = async () => {
  await Applier.apply()
  ToListObserver.observe()
}
