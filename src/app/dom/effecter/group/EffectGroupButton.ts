import { GroupButton } from '../../generater/group/dialog/GroupButton'

export const EffectGroupButton = {
  effect(dialog: HTMLDialogElement): HTMLAnchorElement {
    const button = GroupButton.generate()
    button.addEventListener('click', () => {
      dialog.showModal()
    })
    return button
  },
}