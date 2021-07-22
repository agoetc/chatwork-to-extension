import {
  AddAccountListEffect,
  EffectAccountSaveButton,
} from '../../../../effector/group/dialog/dialog/EffectAccountSaveButton'
import {
  CloseDialogEffect,
  EffectDialogCloseButton,
} from '../../../../effector/group/dialog/dialog/EffectDialogCloseButton'

export const ButtonField = {
  generate(
    addAccountListEffect: AddAccountListEffect,
    closeDialogEffect: CloseDialogEffect
  ): HTMLDivElement {
    const buttonDiv = document.createElement('div')
    buttonDiv.className = '_cwDGFooter dialogContainer__footer'
    buttonDiv.appendChild(EffectAccountSaveButton.effect(addAccountListEffect))
    buttonDiv.appendChild(EffectDialogCloseButton.effect(closeDialogEffect))

    return buttonDiv
  },
}
