import { AccountList } from '../../../../../domain/Account'
import { env } from '../../../../../env'
import { Tr } from './Tr'

export const CheckTable = {
  generate(
    toAccountList: AccountList,
    checkedAccountList: AccountList = { value: [] }
  ): HTMLDivElement {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')

    thead.appendChild(PCheckTable.header())
    tbody.appendChild(Tr.generate(toAccountList, checkedAccountList))
    tbody.id = env.id.tbody

    table.appendChild(thead)
    table.appendChild(tbody)

    const scrollableTable = document.createElement('div')
    scrollableTable.className = 'scrollableTable'
    scrollableTable.appendChild(table)

    return scrollableTable
  },
}

const PCheckTable = {
  header(): HTMLTableRowElement {
    const iconTh = document.createElement('th')
    const nameTh = document.createElement('th')
    nameTh.innerText = '名前'
    const groupTh = document.createElement('th')
    groupTh.innerText = 'グループ'

    const tr = document.createElement('tr')

    tr.appendChild(iconTh)
    tr.appendChild(nameTh)
    tr.appendChild(groupTh)

    return tr
  },
}
