const env = {
    id: {
        select: 'group-select',
        defaultSelect: 'group-default-select',
        tbody: 'group-body'
    },
    class: {
        checkBox: 'group-check'
    }
}

const state = {
    isDefaultSelect: true
}

// dom読み込むのを待つ（2000は適当な数値）
window.onload = () => setTimeout(listener, 2000)

function listener() {

    // chrome.storage.sync.clear()

    addShortcutEvent()

    const toListFooter = document.getElementById('_toListFooter')
    toListFooter.appendChild(UtilDomBuilder.groupingSettingButton())

    const toList = document.getElementById('_toList')

    /** @type {HTMLUListElement} */
    const toolTipList = toList.getElementsByClassName('_cwLTList tooltipList')[0]
    const observer = new MutationObserver(() => {
        /** DOMの変化が起こった時の処理 */
        console.log('DOMが変化しました');

        // TODO: なんか閉じたときにいっぱいDOM変化してそう
        GroupList.get((groupList) => {
            const groupListDomBuilder = new GroupListDomBuilder(groupList)
            toolTipList.insertBefore(groupListDomBuilder.buildTag(), toolTipList.children[1])
        })
    })

    const config = {
        attributes: true,
        childList: false,
        characterData: true
    }


    observer.observe(toList, config)

}

function addShortcutEvent() {
    window.addEventListener('keydown', (e) => {
        // ctrl + t でToを開く
        if (e.ctrlKey && e.key === 't') document.getElementById('_to').click()
    })
}

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

        const buttonDiv = document.createElement('div')
        const saveButton = groupListDomBuilder.saveButton()
        const closeButton = UtilDomBuilder.closeButton(dialog)

        buttonDiv.appendChild(saveButton)
        buttonDiv.appendChild(closeButton)

        dialog.appendChild(buttonDiv)
        document.body.appendChild(dialog)
        dialog.showModal()

    })
}


// domBuilder ----------------------------------------------------------------------------
class UtilDomBuilder {
    /**
     * @param {HTMLDialogElement} dialog
     * @return {HTMLButtonElement}
     */
    static closeButton(dialog) {
        const button = document.createElement('button')

        button.textContent = '閉じる'
        button.addEventListener('click', () => dialog.close())

        return button
    }

    /**
     * @return {HTMLAnchorElement}
     */
    static groupingSettingButton() {
        const groupingButton = document.createElement('a')
        groupingButton.innerText = 'グループの設定'
        groupingButton.addEventListener('click', () => openModal())
        return groupingButton
    }

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

    /** @return {HTMLSelectElement}*/
    selectDom() {
        const select = document.createElement('select')
        select.id = env.id.select

        const option = document.createElement('option')
        option.id = env.id.defaultSelect
        option.selected = true
        option.innerText = '選択してください'

        select.appendChild(option)
        select.appendChild(this.optionFragment())

        select.addEventListener('change', () => {
            state.isDefaultSelect = false

            const group = this.groupList.getGroupByName(select.value)
            if (group !== undefined) {
                const tbody = document.getElementById(env.id.tbody)

                while (tbody.childElementCount) {
                    tbody.children[0].remove()
                }

                // 選択したら選択してくださいを削除
                if (select.firstElementChild.id === env.id.defaultSelect) {
                    select.firstElementChild.remove()
                }
                const tr = this.#bodyTr(group.accountList)
                tbody.appendChild(tr)
            }
        })
        return select
    }

    /**
     * @param {AccountList} checkedAccountList
     * @return {HTMLDivElement}
     */
    settingTableDom(checkedAccountList = new AccountList()) {
        const table = document.createElement('table')
        const thead = document.createElement('thead')
        const tbody = document.createElement('tbody')
        tbody.id = env.id.tbody

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

        thead.appendChild(headTr())
        tbody.appendChild(this.#bodyTr(checkedAccountList))

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


    saveButton() {
        const button = document.createElement('button')

        button.textContent = '保存'
        button.addEventListener('click', () => {
            if (!state.isDefaultSelect) {
                const req = GroupRequest.buildByCheckBox()
                this.groupList.addGroup(req)
            }
        })

        return button
    }


    /**
     * TODO: addEventListener('click')でtextareaにtoを入れる
     * @return {DocumentFragment}
     */
    buildTag() {
        const fragment = document.createDocumentFragment()
        this.groupList.value.map(group => {
            // liだとcwにclickイベント奪われるのでdivに
            const div = document.createElement('div')
            div.innerText = group.name
            div.addEventListener('click', () => {
                console.log(group.accountList)

                // TODO: いい感じにする
                GroupListDomBuilder.addText(group.accountList)
            })

            fragment.appendChild(div)
        })

        return fragment
    }

    /** @param {AccountList} accountList */
    static addText(accountList) {

        const toList = accountList.value.map(account => {
            return `[To:${account.accountId}]${account.name}`
        })

        console.log(toList.join())
        const textArea = document.getElementById('_chatText');
        textArea.value =
            textArea.value.substr(0, textArea.selectionStart)
            + toList.join('\n')
            + textArea.value.substr(textArea.selectionStart);

        textArea.focus()
    }


    /**
     * @param {AccountList} checkedAccountList
     * @return {DocumentFragment}
     */
    #bodyTr(checkedAccountList = new AccountList()) {
        const toAccountList = AccountList.getByToList()

        const groupSettingTableBodyFragment = document.createDocumentFragment()


        toAccountList.value.forEach(account => {
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

            input.dataset.aId = account.accountId
            input.dataset.imagePath = account.imagePath
            input.dataset.name = account.name

            // 選択してください状態ならdisabled
            if (state.isDefaultSelect) {
                input.disabled = true
            }

            if (checkedAccountList.isSaved(account)) {
                input.checked = true
            }

            groupTd.appendChild(input)

            const tr = document.createElement('tr')

            tr.appendChild(iconTd)
            tr.appendChild(nameTd)
            tr.appendChild(groupTd)

            groupSettingTableBodyFragment.appendChild(tr)
        })

        state.isFirstLoad = false
        return groupSettingTableBodyFragment
    }
}

// model ----------------------------------------------------------------------------

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
                Number(accountListObj[key].accountId),
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

    /**
     * @param {Account} account
     * @return {boolean}
     */
    isSaved(account) {
        return this.value.some(savedAccount => {
            return savedAccount.accountId === account.accountId
        })
    }
}

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

    /**
     * @param {object} groupListObj
     * @return {GroupList}
     */
    static buildByObj(groupListObj) {
        const groupList = new GroupList()

        for (let groupName in groupListObj.group) {
            if (groupListObj.group.hasOwnProperty(groupName)) {
                const accountListObj = groupListObj.group[groupName].accountList
                const accountList = AccountList.buildByObj(accountListObj)
                groupList.value.push(new Group(groupName, accountList))
            }
        }

        return groupList
    }

    /** @param {GroupRequest} req */
    addGroup(req) {
        // TODO: elseのときどうする？
        console.log(req)
        const existsGroupName = this.value.find(a => a.name === req.name) !== undefined
        if (this.value.length === 0 || !existsGroupName) {
            this.value.push(new Group(req.name, req.accountList))
            this.save()
        } else if (existsGroupName) {
            // TODO: 上書きされてしまう　本当は元あるデータとmergeしたい
            this.value.push(new Group(req.name, req.accountList))
            this.save()
        }
    }

    /**
     * @param {string} name
     * @return {Group | undefined}
     */
    getGroupByName(name) {
        return this.value.find(group => group.name === name)
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
        chrome.storage.sync.get('group', (groupListObj) => {
            console.log(groupListObj)
            callback(GroupList.buildByObj(groupListObj))
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


// modelBuilder ----------------------------------------------------------------------------

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
            // TODO: 自分で作ったgroup一覧も除外する
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
            Number(accountDom.dataset.cwuiLtValue),
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

class BuildGroupAccountListRequestByCheckBox {
    /**
     * @returns {GroupRequest}
     */
    static build() {
        /** @type {HTMLSelectElement} */
        const select = document.getElementById(env.id.select)

        /** @type {HTMLCollection} */
        const accountListDom = document.getElementsByClassName(env.class.checkBox)

        const accountList = new AccountList()

        for (let i = 0; i < accountListDom.length; i++) {
            /** @type {HTMLInputElement}*/
            const accountDom = accountListDom[i]

            if (accountDom.checked) {
                const account = new Account(
                    Number(accountDom.dataset.aId),
                    accountDom.dataset.imagePath,
                    accountDom.dataset.name
                )

                accountList.value.push(account)
            }
        }

        return new GroupRequest(select.value, accountList)

    }
}
