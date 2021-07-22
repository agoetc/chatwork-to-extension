import { Applier } from './app/applier/Applier'
import { GroupGetter } from './adapter/dom/group/getter/GroupGetter'
import { GroupStorageRepository } from './adapter/storage/repository/GroupStorageRepository'
import { GroupInToList } from './app/dom/generater/original/GroupInToList'
import { ToListDomGetter } from './adapter/dom/original/getter/ToListDomGetter'
import { Group } from './domain/Group'
import { AccountList } from './domain/Account'
import { TextAreaDomGetter } from './adapter/dom/original/getter/TextAreaDomGetter'
import { ToListObserver } from './app/observer/original/ToListObserver'

window.onload = () => setTimeout(listener, 1000)

const listener = async () => {
  await Applier.apply()
  ToListObserver.observe()
}
