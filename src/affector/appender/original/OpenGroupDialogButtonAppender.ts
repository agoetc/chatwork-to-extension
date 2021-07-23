import {
  CreateDialogEffect,
  EffectOpenDialogButton,
} from '../../../adapter/dom-builder/effector/group/dialog/dialog/EffectOpenDialogButton'
import { GroupingDialogAppender } from '../group/dialog/GroupingDialogAppender'
import { GroupStorageRepository } from '../../../adapter/storage/repository/GroupStorageRepository'
import { ToListDomGetter } from '../../../adapter/dom-getter/original/ToListDomGetter'

export const OpenGroupDialogButtonAppender = {
  append(): void {
    const toListFooter = ToListDomGetter.getToListFooter()
    const groupButton = EffectOpenDialogButton.effect(
      POpenGroupDialogButtonAppender.createDialogEffect()
    )
    toListFooter.appendChild(groupButton)
  },
}

const POpenGroupDialogButtonAppender = {
  createDialogEffect(): CreateDialogEffect {
    return () => GroupStorageRepository.get().then((gl) => GroupingDialogAppender.append(gl))
  },
}
