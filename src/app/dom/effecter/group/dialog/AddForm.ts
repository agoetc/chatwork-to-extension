import { AddForm } from '../../../generater/group/dialog/AddForm'

export const EffectAddForm = {
  effectAddButton(addEffect: AddEffect): HTMLButtonElement {
    const button = AddForm.addButton()
    button.addEventListener('click', () => {
      addEffect()
        .then(() => console.log('hoge'))
        .catch((e) => {
          throw e
        })
    })

    return button
  },
}

export type AddEffect = () => Promise<void>
