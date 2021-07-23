export type CloseDialogEffect = () => void
export type CloseDialogEffectRemindDialog = (dialog: HTMLDialogElement) => CloseDialogEffect

export const EffectCloseDialogButton = {
  effect(closeDialogEffect: CloseDialogEffect): HTMLButtonElement {
    const button = PEffectCloseDialogButton.build()
    button.addEventListener('click', closeDialogEffect)

    return button
  },
}

const PEffectCloseDialogButton = {
  build(): HTMLButtonElement {
    const button = document.createElement('button')
    button.className = '_cwDGButton  _cwDGButtonCancel button buttonGray'
    button.textContent = 'キャンセル'

    return button
  },
}
