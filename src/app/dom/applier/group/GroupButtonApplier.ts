import { EffectGroupButton } from '../../effector/group/dialog/dialog/EffectGroupButton'
import { GroupingDialogApplier } from './dialog/GroupingDialogApplier'
import { GroupStorageRepository } from '../../../../adapter/storage/repository/GroupStorageRepository'
import { ToListDomGetter } from '../../../../adapter/dom/original/getter/ToListDomGetter'

export const GroupButtonApplier = {
  applyGroupButton(): void {
    const toListFooter = ToListDomGetter.getToListFooter()
    const groupButton = EffectGroupButton.effect(this.createDialogFunction())
    toListFooter.appendChild(groupButton)
  },
  createDialogFunction(): () => Promise<HTMLDialogElement> {
    return () => GroupStorageRepository.get().then((gl) => GroupingDialogApplier.apply(gl))
  },
}
