import {
  AddAccountListEffect,
  EffectAccountSaveButton,
} from '../../../../effector/group/dialog/dialog/EffectAccountSaveButton'

export const ButtonField = {
  generate(dialog: HTMLDialogElement, addAccountListEffect: AddAccountListEffect): HTMLDivElement {
    const buttonDiv = document.createElement('div')
    buttonDiv.className = '_cwDGFooter dialogContainer__footer'
    buttonDiv.appendChild(EffectAccountSaveButton.effect(addAccountListEffect))
    buttonDiv.appendChild(PButtonField.closeButton(dialog))

    return buttonDiv
  },
}

const PButtonField = {
  closeButton(dialog: HTMLDialogElement): HTMLButtonElement {
    const button = document.createElement('button')
    button.className = '_cwDGButton  _cwDGButtonCancel button buttonGray'
    button.textContent = 'キャンセル'

    button.addEventListener('click', () => {
      dialog.close()
      dialog.remove()
    })
    return button
  },
}
