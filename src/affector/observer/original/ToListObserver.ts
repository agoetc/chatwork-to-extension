import { ToListDomGetter } from '../../../adapter/dom/getter/original/ToListDomGetter'
import { GroupGetter } from '../../../adapter/dom/getter/group/GroupGetter'
import { GroupStorageRepository } from '../../../adapter/storage/repository/GroupStorageRepository'
import { GroupInToList } from '../../../adapter/dom/builder/builder/original/GroupInToList'
import { Group } from '../../../domain/Group'
import { AccountList } from '../../../domain/Account'
import { TextAreaDomGetter } from '../../../adapter/dom/getter/original/TextAreaDomGetter'
import { AddGroupInToListEffectRemindGroup } from '../../../adapter/dom/builder/effector/original/EffectGroupInToList'

export const ToListObserver = {
  observe() {
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
          const groupListElement = GroupInToList.build(
            groupList,
            PToListObserver.addGroupInToListEffectRemindGroup()
          )

          console.log(groupListElement)

          toolTipList.insertBefore(groupListElement, toolTipList.children[1])
        })
        .catch((e) => {
          throw e
        })
    })

    return observer.observe(toList, config)
  },
}

const PToListObserver = {
  addGroupInToListEffectRemindGroup(): AddGroupInToListEffectRemindGroup {
    return (group: Group) => () => this.insertText(group.accountList)
  },
  /** Groupに入っているaccountをtextAreaに突っ込む処理を付ける **/
  insertText(insideAccountList: AccountList) {
    const toList = insideAccountList.value.map((account) => {
      return `[To:${account.accountId.value}]${account.name}`
    })

    console.log(toList.join())
    const textArea = TextAreaDomGetter.getTextArea()
    textArea.value =
      textArea.value.substr(0, textArea.selectionStart) +
      toList.join('\n') +
      '\n' +
      textArea.value.substr(textArea.selectionStart)

    textArea.focus()
  },
}

const config = {
  attributes: false,
  childList: true,
  characterData: false,
}
