import {
  CreateDialogEffect,
  EffectOpenDialogButton,
} from '../../dom/effector/group/dialog/dialog/EffectOpenDialogButton'
import { GroupingDialogApplier } from './dialog/GroupingDialogApplier'
import { GroupStorageRepository } from '../../../adapter/storage/repository/GroupStorageRepository'
import { ToListDomGetter } from '../../../adapter/dom/original/getter/ToListDomGetter'

export const GroupButtonApplier = {
  apply(): void {
    const toListFooter = ToListDomGetter.getToListFooter()
    const groupButton = EffectOpenDialogButton.effect(PGroupButtonApplier.createDialogEffect())
    toListFooter.appendChild(groupButton)
  },
}

const PGroupButtonApplier = {
  createDialogEffect(): CreateDialogEffect {
    return () => GroupStorageRepository.get().then((gl) => GroupingDialogApplier.apply(gl))
  },
}
