export const GroupButton = {
  generate(): HTMLAnchorElement {
    const groupingButton: HTMLAnchorElement = document.createElement('a')
    groupingButton.innerText = 'グループの設定'
    return groupingButton
  },
}
