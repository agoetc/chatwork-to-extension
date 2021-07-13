import {EffectGroupButton} from "../effecter/EffectGroupButton";

export const GroupButtonApplier = {
    getToListFooter(): HTMLElement {
        const toListFooter = document.getElementById('_toListFooter')
        if (toListFooter) {
            return toListFooter
        } else {
            // TODO
            throw new DOMException()
        }
    },
    applyGroupButton(modal: HTMLDialogElement): void {
        const toListFooter = this.getToListFooter()
        toListFooter.appendChild(EffectGroupButton.effect(modal))
    }
}