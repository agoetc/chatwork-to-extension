// dom読み込むのを待つ（2000は適当な数値）
window.onload = () => setTimeout(listener, 2000)

function listener() {

    // chrome.storage.sync.clear()

    addShortcutEvent()

    // TODO: grouping setting
    createGroupingSettingButton()
}

function addShortcutEvent() {
    window.addEventListener('keydown', (e) => {
        // ctrl + t でToを開く
        if (e.ctrlKey && e.key === 't') document.getElementById('_to').click()
    })
}

function createGroupingSettingButton() {
    const toList = document.getElementById('_toListFooter')
    const groupingButton = document.createElement('a')
    groupingButton.innerText = 'グループの設定'
    groupingButton.addEventListener('click', () => openModal())

    toList.appendChild(groupingButton)
}

//  modal ----------------------------------------------------------------------------
function openModal() {

    GroupList.get((groupList) => {
        const groupListDomBuilder = new GroupListDomBuilder(groupList)
        const dialog = document.createElement("dialog")
        dialog.id = 'grouping-modal'

        // モーダルに要素を追加している
        dialog.appendChild(groupListDomBuilder.formDom())
        dialog.appendChild(groupListDomBuilder.selectDom())
        dialog.appendChild(groupListDomBuilder.settingTableDom())

        const button = document.createElement("button")
        button.textContent = "Close"
        dialog.appendChild(button)
        button.addEventListener("click", () => dialog.close())

        document.body.appendChild(dialog)
        dialog.showModal()

    })
}

class GroupListDomBuilder {
    /** @type {GroupList} */
    groupList

    /** @param {GroupList} groupList*/
    constructor(groupList) {
        this.groupList = groupList
    }

    /** @returns {HTMLDivElement}*/
    formDom() {
        const datalist = document.createElement('datalist')
        datalist.id = 'group-list'

        datalist.appendChild(this.optionFragment())

        // 入力欄
        const input = document.createElement('input')
        input.type = 'text'
        input.autocomplete = 'on'
        input.setAttribute('list', 'group-list')


        // 追加ボタン作成
        const button = document.createElement("button")
        button.textContent = "追加"
        button.addEventListener('click', () => {
            const request = new GroupRequest(input.value)
            this.groupList.addGroup(request)
            input.value = ''
        })

        // まとめ役
        const div = document.createElement('div')

        div.appendChild(input)
        div.appendChild(datalist)
        div.appendChild(button)

        return div
    }

    /**
     * @return {HTMLSelectElement}
     */
    selectDom() {
        const select = document.createElement('select')
        select.appendChild(this.optionFragment())

        return select
    }

    /**
     * @return {HTMLDivElement}
     */
    settingTableDom() {
        const table = document.createElement('table')
        const thead = document.createElement('thead')
        const tbody = document.createElement('tbody')

        /** @return {HTMLTableRowElement} */
        const headTr = () => {
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
        }

        /** @return {DocumentFragment} */
        const bodyTr = () => {
            const accountList = AccountList.getByToList()

            const groupSettingTableBodyFragment = document.createDocumentFragment()

            accountList.value.forEach(account => {
                const iconTd = document.createElement('td')
                const icon = document.createElement('img')
                icon.className = 'avatarMedium _avatar'
                icon.src = account.imagePath
                iconTd.appendChild(icon)

                const nameTd = document.createElement('td')
                const nameSpan = document.createElement('span')
                nameSpan.className = 'autotrim'
                const name = document.createElement('span')

                name.innerText = account.name
                nameSpan.appendChild(name)
                nameTd.appendChild(nameSpan)

                const groupTd = document.createElement('td')
                const select = document.createElement('select')
                const optionFragment = this.optionFragment()
                select.appendChild(optionFragment)
                groupTd.appendChild(select)

                const tr = document.createElement('tr')

                tr.appendChild(iconTd)
                tr.appendChild(nameTd)
                tr.appendChild(groupTd)

                groupSettingTableBodyFragment.appendChild(tr)
            })

            return groupSettingTableBodyFragment
        }

        thead.appendChild(headTr())
        tbody.appendChild(bodyTr())

        table.appendChild(thead)
        table.appendChild(tbody)


        const scrollableTable = document.createElement('div')
        scrollableTable.className = 'scrollableTable'
        scrollableTable.appendChild(table)

        return scrollableTable
    }

    /** @return {DocumentFragment} */
    optionFragment() {
        const fragment = document.createDocumentFragment()

        this.groupList.value.forEach(group => {
            const option = document.createElement('option')
            option.value = group.name
            option.innerText = group.name
            fragment.appendChild(option)
        })

        return fragment
    }

    // TODO: addEventListener('click')でtextareaにtoを入れる
    buildTag() {
        // liだとcwにclickイベント奪われるのでdivに
        const div = document.createElement('div')
        div.innerText = 'グループ名'
        div.addEventListener('click', () => {
            console.log('グルーピングしてる人間をtoで突っ込みたい')
        })
        return div
    }
}

class Account {
    /** @type {int} */
    accountId

    /** @type {string} */
    imagePath

    /** @type {string} */
    name

    constructor(accountId, imagePath, name) {
        this.accountId = accountId
        this.imagePath = imagePath
        this.name = name
    }

    /**
     * @param {HTMLCollection} accountDom
     * @return boolean
     */
    static isToAllByAccountDom(accountDom) {
        return Number(accountDom.dataset.cwuiLtIdx) === 0
    }

    /**
     * @param {HTMLCollection}accountDom
     * @returns {Account}
     */
    static buildByAccountDom(accountDom) {
        return new Account(
            accountDom.dataset.cwuiLtValue,
            accountDom.children[0].getAttribute('src'),
            accountDom.children[1].innerText
        )
    }
}

class AccountList {
    /** @type {[Account]} */
    value = []

    /**
     * @param {HTMLCollection} accountListDom
     * @returns {AccountList}
     */
    static buildByAccountListDom(accountListDom) {
        const accountList = new AccountList()
        for (let i = 0; i < accountListDom.length; i++) {
            if (!Account.isToAllByAccountDom(accountListDom[i])) {
                const account = Account.buildByAccountDom(accountListDom[i])
                accountList.value.push(account)
            }
        }
        return accountList
    }

    static getByToList() {
        // ('_cwLTList tooltipList')[2]がtoの一覧
        const toAccountListDom = document.getElementsByClassName('_cwLTList tooltipList')[2].children
        return AccountList.buildByAccountListDom(toAccountListDom)
    }
}

class Group {
    /** @type {string} */
    name

    /** @type {[Account]} */
    accounts = []

    /**
     * @param {string} name
     * @param {object} accounts
     */
    constructor(name, accounts = {}) {
        this.name = name
    }
}

class GroupList {
    /** @type {[Group]} */
    value = []

    /** @param {object} savedGroupList */
    constructor(savedGroupList) {
        for (let groupName in savedGroupList.group) {
            if (savedGroupList.group.hasOwnProperty(groupName)) {
                this.value.push(new Group(groupName))
            }
        }
    }

    /** @param {GroupRequest} req */
    addGroup(req) {
        // TODO: elseのときどうする？
        if (this.value.length === 0 || !this.value.includes(req.name)) {
            this.value.push(new Group(req.name))
            this.save()
        }
    }


    /** @returns {{}}*/
    toObj() {
        const object = {}
        this.value.forEach(group => {
            object[group.name] = {}
            object[group.name]['accounts'] = group.accounts
        })
        return object
    }

    // storage ---------------------------------------------------------------------

    /**
     * 保存
     */
    save() {
        chrome.storage.sync.set({'group': this.toObj()}, function () {
            console.log('Settings saved')
        })
    }

    /**
     * 読込
     * @callback getGroupList
     * @param {GroupList} groupList
     */

    /** @param {getGroupList} callback */
    static get(callback) {
        chrome.storage.sync.get('group', (savedGroupList) => {
            callback(new GroupList(savedGroupList))
        });
    }

}

class GroupRequest {
    /** @type {string} */
    name

    /** @param {string} name */
    constructor(name) {
        this.name = name
    }
}