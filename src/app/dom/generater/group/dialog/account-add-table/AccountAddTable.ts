import { AccountList } from '../../../../../../domain/Account'
import { env } from '../../../../../../env'
import { TableAccountRow } from './TableAccountRow'

export const AccountAddTable = {
  generate(toAccountList: AccountList, checkedAccountList: AccountList): HTMLDivElement {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')

    thead.appendChild(PAccountAddTable.header())
    tbody.appendChild(TableAccountRow.generate(toAccountList, checkedAccountList))
    tbody.id = env.id.tbody

    table.appendChild(thead)
    table.appendChild(tbody)

    const scrollableTable = document.createElement('div')
    scrollableTable.className = 'scrollableTable'
    scrollableTable.appendChild(table)

    return scrollableTable
  },
}

const PAccountAddTable = {
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
