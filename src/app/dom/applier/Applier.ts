import {ModalApplier} from "./ModalApplier";
import {GroupButtonApplier} from "./GroupButtonApplier";
import {GroupStorageRepository} from "../../../adapter/storage/repository/GroupStorageRepository";

export const Applier = {
    apply(): Promise<void> {
        return GroupStorageRepository.get()
            .then(groupList => {
                const modal = ModalApplier.apply(groupList)
                GroupButtonApplier.applyGroupButton(modal)
            })

    }
}
