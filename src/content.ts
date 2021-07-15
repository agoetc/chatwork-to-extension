import { AccountService } from './app/service/AccountService'
import { Applier } from './app/dom/applier/Applier'
import { GroupGetter } from './adapter/dom/getter/group/GroupGetter'
import { GroupStorageRepository } from './adapter/storage/repository/GroupStorageRepository'
import { GroupInToList } from './app/dom/generater/GroupInToList'
import { TextAreaDomGetter } from './adapter/dom/getter/TextAreaDomGetter'

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
    const toList = TextAreaDomGetter.getToList()
    const toolTipList = TextAreaDomGetter.getToolTipList()

    const observer = new MutationObserver(() => {
      // 既にGroupのtoListが生成されていればなにもしない
      try {
        GroupGetter.getToList()
      } catch {
        return
      }

      GroupStorageRepository.get().then((groupList) => {
        toolTipList.insertBefore(
          GroupInToList.generate(groupList),
          toolTipList.children[1]
        )
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
