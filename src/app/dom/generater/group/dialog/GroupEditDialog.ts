import {GroupList, GroupRequest} from "../../../../../domain/Group";
import {GroupService} from "../../../../../service/GroupService";
import {env} from "../../../../../env";

const common = {
    optionFragment(groupList: GroupList) {
        const fragment = document.createDocumentFragment()

        groupList.value.forEach(group => {
            const option = document.createElement('option')
            option.value = group.name
            option.innerText = group.name
            fragment.appendChild(option)
        })

        return fragment
    },
    dialog(): HTMLDialogElement {
        const dialog = document.createElement('dialog')
        dialog.id = 'grouping-dialog'
        return dialog
    }
}

const form = {
    datalist(groupList: GroupList): HTMLDataListElement {
        const datalist: HTMLDataListElement = document.createElement('datalist')
        datalist.id = 'group-list-datalist'
        datalist.appendChild(common.optionFragment(groupList))
        return datalist
    },
    // 入力欄
    input(): HTMLInputElement {
        const input: HTMLInputElement = document.createElement('input')
        input.type = 'text'
        input.autocomplete = 'on'
        input.setAttribute('list', 'group-list-datalist')
        return input
    },
    button(groupList: GroupList, input: HTMLInputElement): HTMLButtonElement {
        // 追加ボタン作成
        const button = document.createElement('button')
        button.className = '_cwDGButton  button btnPrimary'
        button.textContent = '追加する'
        button.addEventListener('click', () => {
            GroupService.add(groupList, {
                name: input.value,
                accountList: {value: []}
            })
                .then(() => input.value = '')
                .catch((e) => {
                    console.log(e)
                    throw DOMException
                })
        })
        return button
    },
    formSpan(groupList: GroupList): HTMLSpanElement {
        const datalist: HTMLDataListElement = this.datalist(groupList);
        const input = this.input()
        const button = this.button(groupList, input)

        const span = document.createElement('span')
        span.id = 'group-form-span'
        span.appendChild(input)
        span.appendChild(datalist)
        span.appendChild(button)

        return span
    },
}

export const ButtonField = {
    groupSaveButton() {
        const button = document.createElement('button')
        button.id = env.id.saveButton.button
        button.className = '_cwDGButton  button btnPrimary'

        button.textContent = '保存する'
        button.addEventListener('click', () => {
            console.log('save')
            // if (!state.isDefaultSelect) {
            //     const req = GroupRequest.buildByCheckBox()
            //     this.groupList.addGroup(req)
            // }
        })

        const span = document.createElement('span')
        span.id = env.id.saveButton.span
        span.appendChild(button)

        return span
    },
    closeButton(dialog: HTMLDialogElement): HTMLButtonElement {
        const button = document.createElement('button')
        button.className = '_cwDGButton  _cwDGButtonCancel button buttonGray'
        button.textContent = 'キャンセル'

        button.addEventListener('click', () => {
            dialog.close()
            dialog.remove()
        })
        return button

    },
    generate(dialog: HTMLDialogElement): HTMLDivElement {
        const buttonDiv = document.createElement('div')
        buttonDiv.className = '_cwDGFooter dialogContainer__footer'
        buttonDiv.appendChild(this.groupSaveButton())
        buttonDiv.appendChild(this.closeButton(dialog))

        return buttonDiv
    }

}

export const GroupEditDialog = {
    generate(groupList: GroupList): HTMLDialogElement {
        console.log(groupList)
        const groupDiv = document.createElement('div')
        groupDiv.appendChild(form.formSpan(groupList))
        // groupDiv.appendChild(groupListDOMBuilder.selectDOM())
        // groupDiv.appendChild(groupListDOMBuilder.deleteButton())


        // モーダルに要素を追加している
        const dialog: HTMLDialogElement = common.dialog()
        dialog.appendChild(groupDiv)
        // dialog.appendChild(groupListDOMBuilder.settingTableDOM())

        const buttonField = ButtonField.generate(dialog)
        dialog.appendChild(buttonField)

        return dialog
    }
}
