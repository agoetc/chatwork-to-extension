import { Applier } from './app/applier/Applier'
import { GroupGetter } from './adapter/dom/group/getter/GroupGetter'
import { GroupStorageRepository } from './adapter/storage/repository/GroupStorageRepository'
import { GroupInToList } from './app/dom/generater/original/GroupInToList'
import { ToListDomGetter } from './adapter/dom/original/getter/ToListDomGetter'

window.onload = () => setTimeout(listener, 1000)

const listener = async () => {
  await Applier.apply()
  ToListObserve.observeToList()
}

const ToListObserve = {
  observeToList() {
    const toList = ToListDomGetter.getToList()
    const toolTipList = ToListDomGetter.getToolTipList()

    const observer = new MutationObserver(() => {
      // 既にGroupのtoListが生成されていればなにもしない
      try {
        GroupGetter.getToList()
        return
      } catch {}

      GroupStorageRepository.get()
        .then((groupList) => {
          const groupListElement = GroupInToList.generate(groupList)

          console.log(groupListElement)

          toolTipList.insertBefore(groupListElement, toolTipList.children[1])
        })
        .catch((e) => {
          throw e
        })
    })

    const config = {
      attributes: false,
      childList: true,
      characterData: false,
    }

    return observer.observe(toList, config)
  },
}
