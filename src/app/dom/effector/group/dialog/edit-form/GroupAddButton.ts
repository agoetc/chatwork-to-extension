export type AddGroupEffectRemindInput = (input: HTMLInputElement) => AddGroupEffect
type AddGroupEffect = () => Promise<void>

export const EffectAddButton = {
  effect(addEffect: AddGroupEffect): HTMLButtonElement {
    const button = PEffectAddButton.generate()
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

const PEffectAddButton = {
  generate(): HTMLButtonElement {
    const button = document.createElement('button')
    button.className = '_cwDGButton  button btnPrimary'
    button.textContent = '追加する'
    return button
  },
}
