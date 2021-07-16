import { GroupButton } from '../../../../generater/group/dialog/dialog/GroupButton'

export const EffectGroupButton = {
  effect(createDialogFunction: CreateDialogFunction): HTMLAnchorElement {
    const button = GroupButton.generate()
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

export type CreateDialogFunction = () => Promise<HTMLDialogElement>
