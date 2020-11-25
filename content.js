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

// dom読み込むのを待つ（2000は適当な数値）
window.onload = () => setTimeout(listener, 2000)

function listener() {

    // chrome.storage.sync.clear()

    addShortcutEvent()

    DomApplier.groupButton()

    DomApplier.observeToList()
}

function addShortcutEvent() {
    window.addEventListener('keydown', (e) => {
        // ctrl + t でToを開く
        if (e.ctrlKey && e.key === 't') document.getElementById('_to').click()
    })
}

// DomApplier ----------------------------------------------------------------------------
class DomApplier {
    /**
     *
     * @param {GroupList} groupList
     */
    static reloadModalContains(groupList) {
        console.log(groupList)
        const domBuilder = new GroupListDomBuilder(groupList)

        state.isDefaultSelect = true
        const selectGroupName = document.getElementById(env.id.select.select).value
        const selectDiv = document.getElementById(env.id.select.span)
        selectDiv.innerHTML = ''
        selectDiv.appendChild(domBuilder.selectDom(selectGroupName))

        const buttonDiv = document.getElementById(env.id.saveButton.span)
        buttonDiv.innerHTML = ''
        buttonDiv.appendChild(domBuilder.saveButton())
    }

    static openModal() {
        state.isDefaultSelect = true
        GroupList.get((groupList) => {
            console.log(groupList)
            const groupListDomBuilder = new GroupListDomBuilder(groupList)
            const dialog = document.createElement('dialog')
            dialog.id = 'grouping-modal'

            const groupDiv = document.createElement('div')
            groupDiv.appendChild(groupListDomBuilder.formDom())
            groupDiv.appendChild(groupListDomBuilder.selectDom())
            groupDiv.appendChild(groupListDomBuilder.deleteButton())

            const saveButton = groupListDomBuilder.saveButton()
            const closeButton = UtilDomBuilder.closeButton(dialog)

            const buttonDiv = document.createElement('div')
            buttonDiv.className = '_cwDGFooter dialogContainer__footer'
            buttonDiv.appendChild(saveButton)
            buttonDiv.appendChild(closeButton)

            // モーダルに要素を追加している
            dialog.appendChild(groupDiv)
            dialog.appendChild(groupListDomBuilder.settingTableDom())
            dialog.appendChild(buttonDiv)

            document.body.appendChild(dialog)
            dialog.showModal()
        })
    }

    static groupButton() {
        const toListFooter = document.getElementById('_toListFooter')
        toListFooter.appendChild(UtilDomBuilder.groupingSettingButton())
    }

    static observeToList() {
        const toList = document.getElementById('_toList')

        /** @type {HTMLUListElement} */
        const toolTipList = toList.getElementsByClassName('_cwLTList tooltipList')[0]
        const observer = new MutationObserver(() => {
            // 既にGroupのtoListが生成されていればなにもしない
            if (document.getElementById(env.id.toList) !== null) return

            GroupList.get((groupList) => {
                const groupListDomBuilder = new GroupListDomBuilder(groupList)
                toolTipList.insertBefore(groupListDomBuilder.addGroupOnToList(), toolTipList.children[1])
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

// DomBuilder ----------------------------------------------------------------------------

class UtilDomBuilder {
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
        groupingButton.addEventListener('click', () => DomApplier.openModal())
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

    /** @returns {HTMLSpanElement}*/
    formDom() {
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
    selectDom(selectGroupName = '') {

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
                    DomApplier.addText(chatInsideAccountList)
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
                DomApplier.reloadModalContains(this)
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
        return BuildGroupAccountListRequestByCheckBox.build()
    }
}

// BuildByDom ----------------------------------------------------------------------------

class BuildAccountListByToListDom {
    /**
     * To一覧からAccountListを作成
     * @returns {AccountList}
     */
    static build() {
        /**
         *  ('_cwLTList tooltipList')[2]がtoの一覧
         * @type {HTMLCollection<HTMLLIElement>}
         */
        const toAccountListDom =
            document
                .getElementsByClassName('_cwLTList tooltipList')[2]
                .getElementsByTagName('li')

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
        const select = document.getElementById(env.id.select.select)

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
