const env = {
    id: {
        select: 'group-select'
    },
    class: {
        checkBox: 'group-check'
    }
}

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
        console.log(groupList)
        const groupListDomBuilder = new GroupListDomBuilder(groupList)
        const dialog = document.createElement('dialog')
        dialog.id = 'grouping-modal'

        // モーダルに要素を追加している
        dialog.appendChild(groupListDomBuilder.formDom())
        dialog.appendChild(groupListDomBuilder.selectDom())
        dialog.appendChild(groupListDomBuilder.settingTableDom())

        const button = document.createElement('button')
        button.textContent = 'Close'
        dialog.appendChild(button)
        button.addEventListener('click', () => dialog.close())

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
        const button = document.createElement('button')
        button.textContent = '追加'
        button.addEventListener('click', () => {
            // FIXME: テスト中のため差し替え
            const request = GroupRequest.buildByCheckBox()
            // const request = new GroupRequest(input.value)
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

    /** @return {HTMLSelectElement}*/
    selectDom() {
        const select = document.createElement('select')
        select.id = env.id.select
        select.appendChild(this.optionFragment())

        return select
    }

    /** @return {HTMLDivElement}*/
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
                const input = document.createElement('input')

                input.type = 'checkbox'
                input.className = env.class.checkBox
                input.value = account.accountId

                groupTd.appendChild(input)

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

    /**
     * TODO: addEventListener('click')でtextareaにtoを入れる
     * @return {HTMLDivElement}
     */
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
}

class AccountList {
    /** @type {[Account]} */
    value = []

    /**
     * {
     *   accountId: 8888888888
     *   imagePath: "http://hogehoge.com"
     *   name: "hoge"
     * }
     * @param {object} accountListObj
     */
    static buildByObj(accountListObj) {
        const accountList = new AccountList()
        Object.keys(accountListObj).forEach((key) => {
            const account = new Account(
                accountListObj[key].accountId,
                accountListObj[key].imagePath,
                accountListObj[key].name,
            )
            accountList.value.push(account)
        })

        return accountList
    }

    /**
     * To一覧からAccountListを作成
     * @return {AccountList}
     */
    static getByToList() {
        return BuildAccountListByToListDom.build()
    }
}

class BuildAccountListByToListDom {
    /**
     * To一覧からAccountListを作成
     * @returns {AccountList}
     */
    static build() {
        // ('_cwLTList tooltipList')[2]がtoの一覧
        const toAccountListDom = document.getElementsByClassName('_cwLTList tooltipList')[2].children

        const accountList = new AccountList()

        for (let i = 0; i < toAccountListDom.length; i++) {
            if (!this.#isToAll(toAccountListDom[i])) {
                const account = this.#buildAccount(toAccountListDom[i])
                accountList.value.push(account)
            }
        }
        return accountList
    }

    /**
     * @param {HTMLCollection}accountDom
     * @returns {Account}
     */
    static #buildAccount(accountDom) {
        return new Account(
            accountDom.dataset.cwuiLtValue,
            accountDom.children[0].getAttribute('src'),
            accountDom.children[1].innerText
        )
    }

    /**
     * @param {HTMLCollection}accountDom
     * @return {boolean}
     */
    static #isToAll(accountDom) {
        return Number(accountDom.dataset.cwuiLtIdx) === 0
    }
}

// TODO objectからGroupを生成できるように
class Group {
    /** @type {string} */
    name

    /** @type {AccountList} */
    accountList

    /**
     * @param {string} name
     * @param {AccountList} accountList
     */
    constructor(name, accountList = new AccountList()) {
        this.name = name
        this.accountList = accountList
    }
}

class GroupList {
    /** @type {[Group]} */
    value = []

    /** @param {object} savedGroupList */
    constructor(savedGroupList) {
        for (let groupName in savedGroupList.group) {
            if (savedGroupList.group.hasOwnProperty(groupName)) {
                const accountListObj = savedGroupList.group[groupName].accountList
                const accountList = AccountList.buildByObj(accountListObj)
                this.value.push(new Group(groupName, accountList))
            }
        }
    }

    /** @param {GroupRequest} req */
    addGroup(req) {
        // TODO: elseのときどうする？
        if (this.value.length === 0 || !this.value.includes(req.name)) {
            this.value.push(new Group(req.name, req.accountList))
            this.save()
        }
    }


    /** @returns {{}}*/
    #toObj() {
        const object = {}
        this.value.forEach(group => {
            object[group.name] = {}
            object[group.name]['accountList'] = group.accountList.value
        })
        return object
    }

    // storage ---------------------------------------------------------------------

    /**
     * 保存
     */
    save() {
        chrome.storage.sync.set({'group': this.#toObj()}, function () {
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
            console.log(savedGroupList)
            callback(new GroupList(savedGroupList))
        });
    }

}

class GroupRequest {
    /** @type {string} */
    name

    /** @type {AccountList} */
    accountList

    /**
     * @param {string} name
     * @param {AccountList} accountList
     */
    constructor(name, accountList = new AccountList()) {
        this.name = name
        this.accountList = accountList
    }

    /**
     * @return {GroupRequest}
     */
    static buildByCheckBox() {
        return BuildGroupAccountListRequestByCheckBox.build()
    }
}

class BuildGroupAccountListRequestByCheckBox {
    /**
     * @returns {GroupRequest}
     */
    static build() {
        const name = document.getElementById(env.id.select).value
        const accountsDom = document.getElementsByClassName(env.class.checkBox)

        const accountList = new AccountList()
        accountList.value.push(new Account(8888888888, 'http://hogehoge.com', 'hoge'))

        return new GroupRequest('hogehoge', accountList)

        // for (let i = 0; i < accountListCheckBoxDom.length; i++) {
        //     const account = Account.buildAccount(accountListCheckBoxDom[i])
        //     accountList.value.push(account)
        // }
    }
}
