import { Appender } from './app/appender/Appender'
import { ToListObserver } from './app/observer/original/ToListObserver'

window.onload = () => setTimeout(listener, 1000)

const listener = async () => {
  await Appender.append()
  ToListObserver.observe()
}
