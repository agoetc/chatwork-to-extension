import { env } from '../../../../../env'

export const ButtonField = {
  generate(dialog: HTMLDialogElement): HTMLDivElement {
    const buttonDiv = document.createElement('div')
    buttonDiv.className = '_cwDGFooter dialogContainer__footer'
    buttonDiv.appendChild(this.groupSaveButton())
    buttonDiv.appendChild(PButtonField.closeButton(dialog))

    return buttonDiv
  },
  groupSaveButton() {
    const button = document.createElement('button')
    button.id = env.id.saveButton.button
    button.className = '_cwDGButton  button btnPrimary'

    button.textContent = '保存する'
    button.addEventListener('click', () => {
      console.log('save')
      // if (!state.isDefaultSelect) {
      //     const req = GroupRequest.buildByCheckBox()
      //     this.groupList.addGroup(req)
      // }
    })

    const span = document.createElement('span')
    span.id = env.id.saveButton.span
    span.appendChild(button)

    return span
  },
}

const PButtonField = {
  closeButton(dialog: HTMLDialogElement): HTMLButtonElement {
    const button = document.createElement('button')
    button.className = '_cwDGButton  _cwDGButtonCancel button buttonGray'
    button.textContent = 'キャンセル'

    button.addEventListener('click', () => {
      dialog.close()
      dialog.remove()
    })
    return button
  },
}
