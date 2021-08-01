import { GroupGetter } from '../../getter/group/GroupGetter'

export const EditGroupFormDomReader = {
  selectGroupName(): string {
    return GroupGetter.getGroupSelect().value
  },
}
