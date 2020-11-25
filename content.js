// DOM読み込むのを待つ（2000は適当な数値）
window.onload = () => setTimeout(listener, 2000);

function listener() {
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 't') document.getElementById("_to").click();
    })
}
