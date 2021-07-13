import {GroupListModal} from "../generater/GroupListModal";
import {GroupList} from "../../../domain/Group";

export const ModalApplier = {
    apply(groupList: GroupList): HTMLDialogElement {
        const modal = GroupListModal.generate(groupList)
        document.body.appendChild(modal)
        return modal
    }
}
