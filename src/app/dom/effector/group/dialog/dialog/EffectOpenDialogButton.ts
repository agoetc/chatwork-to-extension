export type CreateDialogEffect = () => Promise<HTMLDialogElement>

export const EffectOpenDialogButton = {
  effect(createDialogEffect: CreateDialogEffect): HTMLAnchorElement {
    const button = PEffectOpenDialogButton.generate()
    button.addEventListener('click', () => {
      createDialogEffect()
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

const PEffectOpenDialogButton = {
  generate(): HTMLAnchorElement {
    const groupingButton: HTMLAnchorElement = document.createElement('a')
    groupingButton.innerText = 'グループの設定'
    return groupingButton
  },
}
