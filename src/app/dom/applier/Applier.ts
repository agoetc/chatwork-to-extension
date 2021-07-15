import { DialogApplier } from './DialogApplier'
import { GroupButtonApplier } from './GroupButtonApplier'
import { GroupStorageRepository } from '../../../adapter/storage/repository/GroupStorageRepository'

export const Applier = {
  apply(): void {
    GroupButtonApplier.applyGroupButton()
  },
  reload(): Promise<void> {
    return GroupStorageRepository.get().then((groupList) => {
      DialogApplier.reload(groupList)
    })
  },
}
