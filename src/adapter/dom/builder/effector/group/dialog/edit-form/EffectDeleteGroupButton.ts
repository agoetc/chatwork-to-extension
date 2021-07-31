import { env } from '../../../../../../../env'

export type GroupDeleteButtonEffect = () => Promise<void>

export const EffectDeleteGroupButton = {
  effect(deleteEffect: GroupDeleteButtonEffect): HTMLSpanElement {
    const button = PEffectDeleteGroupButton.build()
    button.addEventListener('click', () => {
      deleteEffect()
        .then(() => console.log('deleted group'))
        .catch((e) => {
          throw e
        })
    })

    return button
  },
}

const PEffectDeleteGroupButton = {
  build(): HTMLSpanElement {
    const button = document.createElement('button')
    button.id = env.id.saveButton.button
    button.className = '_cwDGButton  _cwDGButtonCancel button buttonGray'
    button.textContent = '削除する'

    const span = document.createElement('span')
    span.id = env.id.deleteButton.button
    span.appendChild(button)

    return span
  },
}
