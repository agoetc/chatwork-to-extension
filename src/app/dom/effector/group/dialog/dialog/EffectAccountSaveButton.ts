import { env } from '../../../../../../env'

export type AddAccountListEffect = () => Promise<void>

export const EffectAccountSaveButton = {
  effect(addAccountListEffect: AddAccountListEffect): HTMLSpanElement {
    const button = PEffectAccountSaveButton.generate()

    button.addEventListener('click', () => {
      addAccountListEffect()
        .then(() => console.log('saved account list'))
        .catch((e) => {
          throw e
        })
    })

    return button
  },
}

const PEffectAccountSaveButton = {
  generate(): HTMLSpanElement {
    const button = document.createElement('button')
    button.id = env.id.saveButton.button
    button.className = '_cwDGButton  button btnPrimary'

    button.textContent = '保存する'

    const span = document.createElement('span')
    span.id = env.id.saveButton.span
    span.appendChild(button)

    return span
  },
}
