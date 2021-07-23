import { ToListObserver } from './affector/observer/original/ToListObserver'
import { OpenGroupDialogButtonAppender } from './affector/appender/original/OpenGroupDialogButtonAppender'

window.onload = () => setTimeout(listener, 1000)

const listener = async () => {
  await OpenGroupDialogButtonAppender.append()
  ToListObserver.observe()
}
