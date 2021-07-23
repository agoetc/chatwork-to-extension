import {
  CreateDialogEffect,
  EffectOpenDialogButton,
} from '../../../adapter/dom-builder/effector/group/dialog/dialog/EffectOpenDialogButton'
import { GroupingDialogAppender } from './dialog/GroupingDialogAppender'
import { GroupStorageRepository } from '../../../adapter/storage/repository/GroupStorageRepository'
import { ToListDomGetter } from '../../../adapter/dom-getter/original/ToListDomGetter'

export const GroupButtonAppender = {
  append(): void {
    const toListFooter = ToListDomGetter.getToListFooter()
    const groupButton = EffectOpenDialogButton.effect(PGroupButtonApplier.createDialogEffect())
    toListFooter.appendChild(groupButton)
  },
}

const PGroupButtonApplier = {
  createDialogEffect(): CreateDialogEffect {
    return () => GroupStorageRepository.get().then((gl) => GroupingDialogAppender.append(gl))
  },
}
