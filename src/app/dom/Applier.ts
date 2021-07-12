import {GroupButton} from "./generater/GroupButton";

export const Applier = {
    applyGroupButton(): void {
        const toListFooter = document.getElementById('_toListFooter')
        if (toListFooter) {
            toListFooter.appendChild(GroupButton.generate())
        } else {
            // TODO
            throw new DOMException()
        }
    }
}