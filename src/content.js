const env = {
    id: {
        select: {
            select: 'group-select',
            span: 'group-select-span'
        },
        saveButton: {
            button: 'group-save-account-list-button',
            span: 'group-save-account-list-button-span'
        },
        deleteButton: {
            button: 'group-delete-button',
        },
        defaultSelect: 'group-default-select',
        tbody: 'group-body',
        toList: 'group-to-list'
    },
    class: {
        checkBox: 'group-check'
    }
}

const state = {
    isDefaultSelect: true
}

// DOM読み込むのを待つ（2000は適当な数値）
window.onload = () => setTimeout(listener, 2000)

function listener() {

    // chrome.storage.sync.clear()

    addShortcutEvent()

    DOMApplier.groupButton()

    DOMApplier.observeToList()
}

function addShortcutEvent() {
    window.addEventListener('keydown', (e) => {
        // ctrl + t でToを開く
        if (e.ctrlKey && e.key === 't') document.getElementById('_to').click()
    })
}

// DOMApplier ----------------------------------------------------------------------------
class DOMApplier {
    /**
     *
     * @param {GroupList} groupList
     */
    static reloadModalContains(groupList) {
        console.log(groupList)
        const domBuilder = new GroupListDOMBuilder(groupList)

        state.isDefaultSelect = true
        const selectGroupName = document.getElementById(env.id.select.select).value
        const selectDiv = document.getElementById(env.id.select.span)
        selectDiv.innerHTML = ''
        selectDiv.appendChild(domBuilder.selectDOM(selectGroupName))

        const buttonDiv = document.getElementById(env.id.saveButton.span)
        buttonDiv.innerHTML = ''
        buttonDiv.appendChild(domBuilder.saveButton())
    }

    static openModal() {
        state.isDefaultSelect = true
        GroupList.get((groupList) => {
            console.log(groupList)
            const groupListDOMBuilder = new GroupListDOMBuilder(groupList)
            const dialog = document.createElement('dialog')
            dialog.id = 'grouping-modal'

            const groupDiv = document.createElement('div')
            groupDiv.appendChild(groupListDOMBuilder.formDOM())
            groupDiv.appendChild(groupListDOMBuilder.selectDOM())
            groupDiv.appendChild(groupListDOMBuilder.deleteButton())

            const saveButton = groupListDOMBuilder.saveButton()
            const closeButton = UtilDOMBuilder.closeButton(dialog)

            const buttonDiv = document.createElement('div')
            buttonDiv.className = '_cwDGFooter dialogContainer__footer'
            buttonDiv.appendChild(saveButton)
            buttonDiv.appendChild(closeButton)

            // モーダルに要素を追加している
            dialog.appendChild(groupDiv)
            dialog.appendChild(groupListDOMBuilder.settingTableDOM())
            dialog.appendChild(buttonDiv)

            document.body.appendChild(dialog)
            dialog.showModal()
        })
    }

    static groupButton() {
        const toListFooter = document.getElementById('_toListFooter')
        toListFooter.appendChild(UtilDOMBuilder.groupingSettingButton())
    }

    static observeToList() {
        const toList = document.getElementById('_toList')

        /** @type {HTMLUListElement} */
        const toolTipList = toList.getElementsByClassName('_cwLTList tooltipList')[0]
        const observer = new MutationObserver(() => {
            // 既にGroupのtoListが生成されていればなにもしない
            if (document.getElementById(env.id.toList) !== null) return

            GroupList.get((groupList) => {
                const groupListDOMBuilder = new GroupListDOMBuilder(groupList)
                toolTipList.insertBefore(groupListDOMBuilder.addGroupOnToList(), toolTipList.children[1])
            })
        })

        const config = {
            attributes: false,
            childList: true,
            characterData: false
        }

        observer.observe(toList, config)
    }

    /** @param {AccountList} accountList */
    static addText(accountList) {

        const toList = accountList.value.map(account => {
            return `[To:${account.accountId}]${account.name}`
        })

        console.log(toList.join())
        const textArea = document.getElementById('_chatText')
        textArea.value =
            textArea.value.substr(0, textArea.selectionStart)
            + toList.join('\n') + ('\n')
            + textArea.value.substr(textArea.selectionStart)

        textArea.focus()
    }


}

// DOMBuilder ----------------------------------------------------------------------------

class UtilDOMBuilder {
    /**
     * @param {HTMLDialogElement} dialog
     * @return {HTMLButtonElement}
     */
    static closeButton(dialog) {
        const button = document.createElement('button')
        button.className = '_cwDGButton  _cwDGButtonCancel button buttonGray'
        button.textContent = 'キャンセル'

        button.addEventListener('click', () => {
            dialog.close()
            dialog.remove()
        })

        return button
    }

    /**
     * @return {HTMLAnchorElement}
     */
    static groupingSettingButton() {
        const groupingButton = document.createElement('a')
        groupingButton.innerText = 'グループの設定'
        groupingButton.addEventListener('click', () => DOMApplier.openModal())
        return groupingButton
    }

}

class GroupListDOMBuilder {
    /** @type {GroupList} */
    groupList

    /** @param {GroupList} groupList*/
    constructor(groupList) {
        this.groupList = groupList
    }

    /** @returns {HTMLSpanElement}*/
    formDOM() {
        const datalist = document.createElement('datalist')
        datalist.id = 'group-list-datalist'

        datalist.appendChild(this.#optionFragment())

        // 入力欄
        const input = document.createElement('input')
        input.type = 'text'
        input.autocomplete = 'on'
        input.setAttribute('list', 'group-list-datalist')


        // 追加ボタン作成
        const button = document.createElement('button')
        button.className = '_cwDGButton  button btnPrimary'
        button.textContent = '追加する'
        button.addEventListener('click', () => {
            const request = new GroupRequest(input.value)
            this.groupList.addGroup(request)
            input.value = ''
        })

        // まとめ役
        const span = document.createElement('span')
        span.id = 'group-form-span'

        span.appendChild(input)
        span.appendChild(datalist)
        span.appendChild(button)

        return span
    }

    /**
     *
     * @param {string} selectGroupName
     * @return {HTMLSpanElement}
     */
    selectDOM(selectGroupName = '') {

        const select = document.createElement('select')
        select.id = env.id.select.select

        const haveGroupName = this.groupList.value.some(g => g.name === selectGroupName)
        if (!haveGroupName) {
            const option = document.createElement('option')
            option.id = env.id.defaultSelect
            option.selected = true
            option.innerText = '選択してください'
            option.value = ''

            select.appendChild(option)
        }

        select.appendChild(this.#optionFragment(selectGroupName))

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

        const span = document.createElement('span')
        span.id = env.id.select.span
        span.appendChild(select)

        return span
    }

    /**
     * @param {AccountList} checkedAccountList
     * @return {HTMLDivElement}
     */
    settingTableDOM(checkedAccountList = new AccountList()) {
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

    /**
     * @param {string} selectGroupName
     * @return {DocumentFragment}
     */
    #optionFragment(selectGroupName = '') {
        const fragment = document.createDocumentFragment()

        this.groupList.value.forEach(group => {
            const option = document.createElement('option')
            option.value = group.name
            option.innerText = group.name
            if (group.name === selectGroupName) {
                option.selected = true
            }
            fragment.appendChild(option)
        })

        return fragment
    }


    /**
     * @return {HTMLSpanElement}
     */
    saveButton() {
        const button = document.createElement('button')
        button.id = env.id.saveButton.button
        button.className = '_cwDGButton  button btnPrimary'

        button.textContent = '保存する'
        button.addEventListener('click', () => {
            if (!state.isDefaultSelect) {
                const req = GroupRequest.buildByCheckBox()
                this.groupList.addGroup(req)
            }
        })

        const span = document.createElement('span')
        span.id = env.id.saveButton.span
        span.appendChild(button)

        return span
    }

    deleteButton() {
        const button = document.createElement('button')
        button.id = env.id.saveButton.button
        button.className = '_cwDGButton  _cwDGButtonCancel button buttonGray'

        button.textContent = '削除する'
        button.addEventListener('click', () => {
            if (!state.isDefaultSelect) {
                const groupName = document.getElementById(env.id.select.select).value
                this.groupList.deleteGroup(groupName)
            }
        })

        const span = document.createElement('span')
        span.id = env.id.deleteButton.button
        span.appendChild(button)

        return span
    }

    /**
     * @return {HTMLDivElement}
     */
    addGroupOnToList() {
        const groupToList = document.createElement('div')
        const fragment = document.createDocumentFragment()
        const toAccountList = AccountList.getByToList()
        groupToList.id = env.id.toList

        this.groupList.value.map(group => {
            // chat内の人だけに絞る
            const chatInsideAccountList =
                new AccountList(
                    toAccountList.value.filter(account => group.accountList.value.some(a => a.accountId === account.accountId))
                )

            if (chatInsideAccountList.value.length > 0) {
                // liだとcwにclickイベント奪われるのでdivに
                const div = document.createElement('div')
                div.className = 'tooltipList__item'
                div.innerText = group.name

                div.addEventListener('click', () => {
                    DOMApplier.addText(chatInsideAccountList)
                })

                fragment.appendChild(div)
            }
        })

        groupToList.appendChild(fragment)
        return groupToList
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
            tr.className = 'group-table-tr'

            tr.appendChild(iconTd)
            tr.appendChild(nameTd)
            tr.appendChild(groupTd)

            groupSettingTableBodyFragment.appendChild(tr)
        })

        state.isFirstLoad = false
        return groupSettingTableBodyFragment
    }
}

// Model ----------------------------------------------------------------------------

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

    /** @param {[Account]}accountList*/
    constructor(accountList = []) {
        this.value = accountList
    }

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
        return BuildAccountListByToListDOM.build()
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

    /**
     * @param {AccountList} accountList
     * @return {AccountList}
     */
    mergeAccountListRequest(accountList) {
        const accountListByToList = AccountList.getByToList()

        /**
         * チャット外の人は使い回す
         * 既にGroupに追加されている人は使い回さない（名前とか変わっている可能性あるので）
         * @type {Array<Account>}
         */
        const reuseAccountList = this.value.filter(oldAccount => {
            const isOutsider = !accountListByToList.value.some(toAccount => toAccount.accountId === oldAccount.accountId)
            const exists = accountList.value.some(reqAccount => reqAccount.accountId !== oldAccount.accountId)

            return isOutsider || !exists
        })

        return new AccountList(reuseAccountList.concat(accountList.value))
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
        const group = this.getGroupByName(req.name)
        const existsGroupName = group !== undefined

        if (this.value.length === 0 || !existsGroupName) {
            this.value.push(new Group(req.name, req.accountList))
            this.save()
        } else if (existsGroupName) {
            const mergedAccountList = group.accountList.mergeAccountListRequest(req.accountList)
            this.value.push(new Group(req.name, mergedAccountList))
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
    async save() {
        chrome.storage.sync.set({'group': this.#toObj()}, () => {
            console.log('Settings saved')
            GroupList.getAsync().then(groupList => {
                this.value = groupList.value
                DOMApplier.reloadModalContains(this)
            })
        })
    }

    /** @param {string} groupName */
    deleteGroup(groupName) {
        this.value = this.value.filter(g => g.name !== groupName)
        this.save()
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
        })
    }

    /**
     * @return {Promise<GroupList>}
     */
    static async getAsync() {
        return new Promise((resolve) => GroupList.get(resolve))
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
        return BuildGroupAccountListRequestByCheckBoxDOM.build()
    }
}

// BuildByDOM ----------------------------------------------------------------------------

class BuildAccountListByToListDOM {
    /**
     * To一覧からAccountListを作成
     * @returns {AccountList}
     */
    static build() {
        /**
         *  ('_cwLTList tooltipList')[2]がtoの一覧
         * @type {HTMLCollection<HTMLLIElement>}
         */
        const toAccountListDOM =
            document
                .getElementsByClassName('_cwLTList tooltipList')[2]
                .getElementsByTagName('li')

        const accountList = new AccountList()

        for (let i = 0; i < toAccountListDOM.length; i++) {
            if (!this.#isToAll(toAccountListDOM[i])) {
                const account = this.#buildAccount(toAccountListDOM[i])
                accountList.value.push(account)
            }
        }
        return accountList
    }

    /**
     * @param {HTMLCollection}accountDOM
     * @returns {Account}
     */
    static #buildAccount(accountDOM) {
        return new Account(
            Number(accountDOM.dataset.cwuiLtValue),
            accountDOM.children[0].getAttribute('src'),
            accountDOM.children[1].innerText
        )
    }

    /**
     * @param {HTMLCollection}accountDOM
     * @return {boolean}
     */
    static #isToAll(accountDOM) {
        return Number(accountDOM.dataset.cwuiLtIdx) === 0
    }
}

class BuildGroupAccountListRequestByCheckBoxDOM {
    /**
     * @returns {GroupRequest}
     */
    static build() {
        /** @type {HTMLSelectElement} */
        const select = document.getElementById(env.id.select.select)

        /** @type {HTMLCollection} */
        const accountListDOM = document.getElementsByClassName(env.class.checkBox)

        const accountList = new AccountList()

        for (let i = 0; i < accountListDOM.length; i++) {
            /** @type {HTMLInputElement}*/
            const accountDOM = accountListDOM[i]

            if (accountDOM.checked) {
                const account = new Account(
                    Number(accountDOM.dataset.aId),
                    accountDOM.dataset.imagePath,
                    accountDOM.dataset.name
                )

                accountList.value.push(account)
            }
        }

        return new GroupRequest(select.value, accountList)

    }
}
