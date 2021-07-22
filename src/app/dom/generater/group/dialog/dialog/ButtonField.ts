import {
  SaveAccountListEffect,
  EffectSaveAccountButton,
} from '../../../../effector/group/dialog/dialog/EffectSaveAccountButton'
import {
  CloseDialogEffect,
  EffectCloseDialogButton,
} from '../../../../effector/group/dialog/dialog/EffectCloseDialogButton'

export const ButtonField = {
  generate(
    saveAccountListEffect: SaveAccountListEffect,
    closeDialogEffect: CloseDialogEffect
  ): HTMLDivElement {
    const buttonDiv = document.createElement('div')
    buttonDiv.className = '_cwDGFooter dialogContainer__footer'
    buttonDiv.appendChild(EffectSaveAccountButton.effect(saveAccountListEffect))
    buttonDiv.appendChild(EffectCloseDialogButton.effect(closeDialogEffect))

    return buttonDiv
  },
}
