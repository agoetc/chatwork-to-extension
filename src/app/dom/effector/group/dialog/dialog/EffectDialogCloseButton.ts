export const EffectDialogCloseButton = {
  effect(closeDialogEffect: CloseDialogEffect): HTMLButtonElement {
    const button = PEffectDialogCloseButton.generate()
    button.addEventListener('click', closeDialogEffect)

    return button
  },
}

const PEffectDialogCloseButton = {
  generate(): HTMLButtonElement {
    const button = document.createElement('button')
    button.className = '_cwDGButton  _cwDGButtonCancel button buttonGray'
    button.textContent = 'キャンセル'

    return button
  },
}

export type CloseDialogEffect = () => void
