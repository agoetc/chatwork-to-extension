export type CreateDialogEffect = () => Promise<HTMLDialogElement>

export const EffectOpenDialogButton = {
  effect(createDialogEffect: CreateDialogEffect): HTMLAnchorElement {
    const button = PEffectOpenDialogButton.build()
    button.addEventListener('click', () => {
      createDialogEffect()
        .then((dialog) => {
          document.body.appendChild(dialog)
          dialog.showModal()
        })
        .catch((e) => {
          console.log(e.toString())
          throw e
        })
    })
    return button
  },
}

const PEffectOpenDialogButton = {
  build(): HTMLAnchorElement {
    const groupingButton: HTMLAnchorElement = document.createElement('a')
    groupingButton.innerText = 'グループの設定'
    return groupingButton
  },
}
