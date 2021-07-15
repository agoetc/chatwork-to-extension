import { EffectGroupButton } from '../effecter/group/EffectGroupButton'
import { DialogApplier } from './DialogApplier'
import { GroupStorageRepository } from '../../../adapter/storage/repository/GroupStorageRepository'

export const GroupButtonApplier = {
  getToListFooter(): HTMLElement {
    const toListFooter = document.getElementById('_toListFooter')
    if (toListFooter) {
      return toListFooter
    } else {
      // TODO
      throw new DOMException()
    }
  },
  applyGroupButton(): void {
    const toListFooter = this.getToListFooter()
    const groupButton = EffectGroupButton.effect(this.createDialogFunction())
    toListFooter.appendChild(groupButton)
  },
  createDialogFunction(): () => Promise<HTMLDialogElement> {
    return () =>
      GroupStorageRepository.get().then((gl) => DialogApplier.apply(gl))
  },
}
