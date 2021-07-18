import { GroupingDialogApplier } from './group/dialog/GroupingDialogApplier'
import { GroupButtonApplier } from './group/GroupButtonApplier'
import { GroupStorageRepository } from '../../../adapter/storage/repository/GroupStorageRepository'

export const Applier = {
  apply(): void {
    GroupButtonApplier.applyGroupButton()
  },
  reload(): Promise<void> {
    return GroupStorageRepository.get().then((groupList) => {
      GroupingDialogApplier.reload(groupList)
    })
  },
}
