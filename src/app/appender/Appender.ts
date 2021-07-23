import { GroupingDialogAppender } from './group/dialog/GroupingDialogAppender'
import { GroupButtonAppender } from './group/GroupButtonAppender'
import { GroupStorageRepository } from '../../adapter/storage/repository/GroupStorageRepository'

export const Appender = {
  append(): void {
    GroupButtonAppender.append()
  },
  reload(): Promise<void> {
    return GroupStorageRepository.get().then((groupList) => {
      GroupingDialogAppender.reload(groupList)
    })
  },
}
