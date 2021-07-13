import {DialogApplier} from "./DialogApplier";
import {GroupButtonApplier} from "./GroupButtonApplier";
import {GroupStorageRepository} from "../../../adapter/storage/repository/GroupStorageRepository";

export const Applier = {
    apply(): Promise<void> {
        return GroupStorageRepository.get()
            .then(groupList => {
                const dialog = DialogApplier.apply(groupList)
                GroupButtonApplier.applyGroupButton(dialog)
            })

    }
}
