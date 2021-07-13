import {env} from "../../../../env";

export const GroupGetter = {
    getTBody(): HTMLElement {
        const tBody = document.getElementById(env.id.tbody)
        if (tBody !== null) {
            return tBody
        } else {
            throw DOMException
        }

    }
}