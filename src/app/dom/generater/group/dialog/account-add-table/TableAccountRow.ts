import { Account, AccountList } from '../../../../../../domain/Account'
import { env } from '../../../../../../env'

export const TableAccountRow = {
  generate(
    toAccountList: AccountList,
    inGroupAccountList: AccountList = { value: [] }
  ): DocumentFragment {
    return PTableAccountRow.fragment(toAccountList, inGroupAccountList)
  },
}

const PTableAccountRow = {
  fragment(toAccountList: AccountList, inGroupAccountList: AccountList): DocumentFragment {
    const groupSettingTableBodyFragment = document.createDocumentFragment()

    toAccountList.value.forEach((account) => {
      const tr = this.tr()

      tr.appendChild(this.iconTd(account))
      tr.appendChild(this.nameTd(account))
      tr.appendChild(this.groupTd(account, inGroupAccountList))

      groupSettingTableBodyFragment.appendChild(tr)
    })

    // state.isFirstLoad = false
    return groupSettingTableBodyFragment
  },
  tr(): HTMLTableRowElement {
    const tr = document.createElement('tr')
    tr.className = 'group-table-tr'
    return tr
  },
  iconTd(account: Account): HTMLTableDataCellElement {
    const iconTd = document.createElement('td')
    const icon = document.createElement('img')
    icon.className = 'avatarMedium _avatar'
    icon.src = account.imagePath
    iconTd.appendChild(icon)

    return iconTd
  },
  nameTd(account: Account): HTMLTableDataCellElement {
    const nameTd = document.createElement('td')
    const nameSpan = document.createElement('span')
    const name = document.createElement('span')

    nameSpan.className = 'autotrim'

    name.innerText = account.name
    nameSpan.appendChild(name)
    nameTd.appendChild(nameSpan)

    return nameTd
  },
  groupTd(account: Account, inGroupAccountList: AccountList): HTMLTableDataCellElement {
    const groupTd = document.createElement('td')
    const input = document.createElement('input')

    input.type = 'checkbox'
    input.className = env.class.checkBox

    input.dataset.aId = account.accountId.value.toString()
    input.dataset.imagePath = account.imagePath
    input.dataset.name = account.name

    // 選択してください状態ならdisabled
    // if (state.isDefaultSelect) {
    //     input.disabled = true
    // }

    const isInGroup = inGroupAccountList.value.some((savedAccount) => {
      return savedAccount.accountId === account.accountId
    })

    if (isInGroup) input.checked = true

    groupTd.appendChild(input)
    return groupTd
  },
}