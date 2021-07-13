import {GroupButton} from "../generater/GroupButton";

export const EffectGroupButton = {
    effect(modal: HTMLDialogElement): HTMLAnchorElement {
        const button = GroupButton.generate()
        button.addEventListener('click', () => {
            modal.showModal()
        })
        return button
    }
}