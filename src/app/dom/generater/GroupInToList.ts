import { env } from '../../../env'
import { Group, GroupList } from '../../../domain/Group'
import { AccountList } from '../../../domain/Account'
import { AccountDomReader } from '../../../adapter/dom/reader/AccountDomReader'
import { TextAreaDomGetter } from '../../../adapter/dom/getter/TextAreaDomGetter'

// to一覧に追加する、Group一覧のDom
export const GroupInToList = {
  generate(groupList: GroupList): HTMLDivElement {
    const groupToList = document.createElement('div')
    groupToList.id = env.id.toList
    const toAccountList = AccountDomReader.getAccountList()
    const filteredGroupList = PGroupTnToList.filterGroupList(groupList, toAccountList)

    const fragment = PGroupTnToList.groupToFragment(filteredGroupList)
    groupToList.appendChild(fragment)
    return groupToList
  },
}

const PGroupTnToList = {
  groupToFragment(filteredGroupList: GroupList): DocumentFragment {
    const fragment = document.createDocumentFragment()

    filteredGroupList.value.map((group) => {
      // liだとcwにclickイベント奪われるのでdivに
      const div = document.createElement('div')
      div.className = 'tooltipList__item'
      div.innerText = group.name

      div.addEventListener('click', () => {
        this.insertText(group.accountList)
      })

      fragment.appendChild(div)
    })

    return fragment
  },
  /** Groupに入っているaccountをtextAreaに突っ込む処理を付ける **/
  insertText(insideAccountList: AccountList) {
    const toList = insideAccountList.value.map((account) => {
      return `[To:${account.accountId}]${account.name}`
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
  // Chat内に入っているAccountに絞る
  squeezeAccountOfInChat(group: Group, toAccountList: AccountList): AccountList {
    return {
      value: toAccountList.value.filter((toAccount) => {
        group.accountList.value.some((account) => account.accountId === toAccount.accountId)
      }),
    }
  },
  // Chat内に入っているAccountに絞り、0人のGroupがあれば取り除く
  filterGroupList(groupList: GroupList, toAccountList: AccountList): GroupList {
    const groups: Group[] = groupList.value
      .map((group) => {
        const inChatAccount = PGroupTnToList.squeezeAccountOfInChat(group, toAccountList)
        return {
          name: group.name,
          accountList: inChatAccount,
        }
      })
      .filter((group) => group.accountList.value.length > 0)

    return { value: groups }
  },
}
