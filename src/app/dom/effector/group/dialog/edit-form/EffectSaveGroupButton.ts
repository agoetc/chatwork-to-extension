export type SaveGroupEffectRemindInput = (input: HTMLInputElement) => SaveGroupEffect
type SaveGroupEffect = () => Promise<void>

export const EffectSaveGroupButton = {
  effect(addEffect: SaveGroupEffect): HTMLButtonElement {
    const button = PEffectSaveGroupButton.build()
    button.addEventListener('click', () => {
      addEffect()
        .then(() => console.log('saved group'))
        .catch((e) => {
          throw e
        })
    })

    return button
  },
}

const PEffectSaveGroupButton = {
  build(): HTMLButtonElement {
    const button = document.createElement('button')
    button.className = '_cwDGButton  button btnPrimary'
    button.textContent = '追加する'
    return button
  },
}
