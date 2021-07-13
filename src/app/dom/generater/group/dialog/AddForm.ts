import {GroupList} from "../../../../../domain/Group";
import {GroupService} from "../../../../../service/GroupService";

export const AddForm = {
    generate(groupList: GroupList): HTMLSpanElement {
        const datalist = PAddForm.datalist(groupList);
        const input = PAddForm.input()
        const button = PAddForm.button(groupList, input)

        const span = PAddForm.span()

        span.appendChild(input)
        span.appendChild(datalist)
        span.appendChild(button)

        return span
    }
}


const PAddForm = {
    span(): HTMLSpanElement {
        const span = document.createElement('span')
        span.id = 'group-form-span'
        return span
    },
    datalist(groupList: GroupList): HTMLDataListElement {
        const datalist: HTMLDataListElement = document.createElement('datalist')
        datalist.id = 'group-list-datalist'
        datalist.appendChild(OptionFragment.generate(groupList))
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
    }
}

const OptionFragment = {
    generate(groupList: GroupList) {
        const fragment = document.createDocumentFragment()

        groupList.value.forEach(group => {
            const option = document.createElement('option')
            option.value = group.name
            option.innerText = group.name
            fragment.appendChild(option)
        })

        return fragment
    }
}