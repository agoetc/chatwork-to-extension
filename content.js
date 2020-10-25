// dom読み込むのを待つ（2000は適当な数値）
window.onload = () => setTimeout(listener, 2000);

function listener() {
    const _chatText = document.getElementById("_chatText");
    console.log(_chatText);
    _chatText.value = "hoge";
}