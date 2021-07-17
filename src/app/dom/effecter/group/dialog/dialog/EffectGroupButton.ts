export type CreateDialogFunction = () => Promise<HTMLDialogElement>

export const EffectGroupButton = {
  generate(createDialogFunction: CreateDialogFunction): HTMLAnchorElement {
    const button = PGroupButton.generate()
    button.addEventListener('click', () => {
      createDialogFunction()
        .then((dialog) => {
          document.body.appendChild(dialog)
          dialog.showModal()
        })
        .catch((e) => {
          throw e
        })
    })
    return button
  },
}

const PGroupButton = {
  generate(): HTMLAnchorElement {
    const groupingButton: HTMLAnchorElement = document.createElement('a')
    groupingButton.innerText = 'グループの設定'
    return groupingButton
  },
}
