// dom読み込むのを待つ（2000は適当な数値）
window.onload = () => setTimeout(listener, 2000);

function listener() {

    addShortcutEvent()

    // TODO: grouping setting
    createGroupingSettingButton();
}

function addShortcutEvent() {
    window.addEventListener('keydown', (e) => {
        // ctrl + t でToを開く
        if (e.ctrlKey && e.key === 't') document.getElementById('_to').click();
    });
}

function createGroupingSettingButton() {
    const toList = document.getElementById('_toListFooter');
    const groupingButton = document.createElement('a')
    groupingButton.innerText = 'グループの設定';
    groupingButton.addEventListener('click', () => openModal())

    toList.appendChild(groupingButton);
}


function getAccounts() {
    // ('_cwLTList tooltipList')[2]がtoの一覧
    const toList = document.getElementsByClassName('_cwLTList tooltipList')[2].children;

    // toallの下に突っ込む
    toList[0].parentNode.insertBefore(buildTag(), toList[0].nextSibling);

    // 0は toallなので含めない
    for (let i = 1; i < toList.length; i++) {
        console.log(toList[i].dataset.cwuiLtValue);
    }
}


// TODO: addEventListener('click')でtextareaにtoを入れる
function buildTag() {
    // liだとcwにclickイベント奪われるのでdivに
    const div = document.createElement('div');
    div.innerText = 'グループ名';
    div.addEventListener('click', () => {
        console.log('グルーピングしてる人間をtoで突っ込みたい')
    })
    return div;
}


//  modal ----------------------------------------------------------------------------
function openModal() {

    chrome.storage.sync.get('group', (savedGroupList) => {
        const groupList = new GroupList(savedGroupList);


        const dialog = document.createElement("dialog")
        dialog.id = 'grouping-modal';
        dialog.appendChild(addGroupElement(groupList));

        const button = document.createElement("button")
        button.textContent = "Close"
        dialog.appendChild(button)
        button.addEventListener("click", () => dialog.close())
        document.body.appendChild(dialog)
        dialog.showModal()

    });
}

/**
 *
 * @param {GroupList} groupList
 * @returns {HTMLDivElement}
 */
function addGroupElement(groupList) {
    const datalist = document.createElement('datalist');
    datalist.id = 'group-list'

    groupList.value.forEach(group => {
        const option = document.createElement('option')
        option.value = group.name
        datalist.appendChild(option)
    })

    // 入力欄
    const input = document.createElement('input');
    input.type = 'text'
    input.autocomplete = 'on'
    input.setAttribute('list', 'group-list')


    // 追加ボタン作成
    const button = document.createElement("button")
    button.textContent = "追加"
    button.addEventListener('click', () => {
        saveChanges(input.value)
        input.value = ''
    })

    // まとめ役
    const div = document.createElement('div');

    div.appendChild(input)
    div.appendChild(datalist)
    div.appendChild(button)

    return div;
}

function saveChanges(groupName) {
    chrome.storage.sync.get('group', (groupList) => {
        if (typeof groupList.group === 'undefined') {
            save({[groupName]: {}})
        } else if (typeof groupList.group === 'object' && groupList.group[groupName] !== {}) {
            groupList.group[groupName] = {}
            save(groupList.group)
        }
    });

    function save(groupList) {
        chrome.storage.sync.set({'group': groupList}, function () {
            console.log('Settings saved');
        });
    }
}

class Group {
    /** @param {string} name */
    constructor(name) {
        this.name = name;
    }
}


class GroupList {
    /** @param {object} savedGroupList */
    constructor(savedGroupList) {
        /** @type {[Group]} */
        this.value = [];
        for (let groupName in savedGroupList.group) {
            if (savedGroupList.group.hasOwnProperty(groupName)) {
                this.value.push(new Group(groupName))
            }
        }
    }
}