import { EffectGroupButton } from '../effector/group/dialog/dialog/EffectGroupButton'
import { DialogApplier } from './DialogApplier'
import { GroupStorageRepository } from '../../../adapter/storage/repository/GroupStorageRepository'
import { Common } from '../../../adapter/dom/Common'

export const GroupButtonApplier = {
  getToListFooter(): HTMLElement {
    return Common.nullCheck(document.getElementById('_toListFooter'))
  },
  applyGroupButton(): void {
    const toListFooter = this.getToListFooter()
    const groupButton = EffectGroupButton.effect(this.createDialogFunction())
    toListFooter.appendChild(groupButton)
  },
  createDialogFunction(): () => Promise<HTMLDialogElement> {
    return () => GroupStorageRepository.get().then((gl) => DialogApplier.apply(gl))
  },
}
