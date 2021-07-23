import { env } from '../../../../../../env'

export type SaveAccountListEffect = () => Promise<void>

export const EffectSaveAccountButton = {
  effect(saveAccountListEffect: SaveAccountListEffect): HTMLSpanElement {
    const button = PEffectSaveAccountButton.build()

    button.addEventListener('click', () => {
      saveAccountListEffect()
        .then(() => console.log('saved account list'))
        .catch((e) => {
          throw e
        })
    })

    return button
  },
}

const PEffectSaveAccountButton = {
  build(): HTMLSpanElement {
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
