import {GroupEditDialog} from "../generater/group/dialog/GroupEditDialog";
import {GroupList} from "../../../domain/Group";

export const ModalApplier = {
    apply(groupList: GroupList): HTMLDialogElement {
        const modal = GroupEditDialog.generate(groupList)
        document.body.appendChild(modal)
        return modal
    }
}
