// dom読み込むのを待つ（2000は適当な数値）
window.onload = () => setTimeout(listener, 2000);

function listener() {

    // TODO: grouping setting
    createGroupingSettingButton();

    window.addEventListener('keydown', (e) => {
        // ctrl + t でToを開く
        if (e.ctrlKey && e.key === 't') document.getElementById("_to").click();
    });

}

function createGroupingSettingButton() {
    const toList = document.getElementById("_toListFooter");
    const groupingButton = document.createElement("a");
    groupingButton.innerText = "グループの設定";
    groupingButton.addEventListener("click", () => getAccounts())

    toList.appendChild(groupingButton);
}

function getAccounts() {
    // ("_cwLTList tooltipList")[2]がtoの一覧
    const toList = document.getElementsByClassName("_cwLTList tooltipList")[2].children;

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