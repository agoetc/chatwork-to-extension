import { Appender } from './affector/appender/Appender'
import { ToListObserver } from './affector/observer/original/ToListObserver'

window.onload = () => setTimeout(listener, 1000)

const listener = async () => {
  await Appender.append()
  ToListObserver.observe()
}
