import { AccountService } from './app/service/AccountService'
import { Applier } from './app/dom/applier/Applier'
import { GroupGetter } from './adapter/dom/group/getter/GroupGetter'
import { GroupStorageRepository } from './adapter/storage/repository/GroupStorageRepository'
import { GroupInToList } from './app/dom/generater/original/GroupInToList'
import { TextAreaDomGetter } from './adapter/dom/original/getter/TextAreaDomGetter'
import { ToListDomGetter } from './adapter/dom/original/getter/ToListDomGetter'

window.onload = () => setTimeout(listener, 1000)

const listener = async () => {
  await Applier.apply()
  hoge.observeToList()
  setInterval(aa, 5000)
}

const aa = async () => {
  console.log(AccountService.getAccountList())
}

const hoge = {
  observeToList() {
    const toList = ToListDomGetter.getToList()
    const toolTipList = ToListDomGetter.getToolTipList()

    const observer = new MutationObserver(() => {
      // 既にGroupのtoListが生成されていればなにもしない
      try {
        GroupGetter.getToList()
      } catch {
        return
      }

      GroupStorageRepository.get().then((groupList) => {
        toolTipList.insertBefore(GroupInToList.generate(groupList), toolTipList.children[1])
      })
    })

    const config = {
      attributes: false,
      childList: true,
      characterData: false,
    }

    observer.observe(toList, config)
  },
}
