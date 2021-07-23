import {
  CreateDialogEffect,
  EffectOpenDialogButton,
} from '../../../adapter/dom-builder/effector/group/dialog/dialog/EffectOpenDialogButton'
import { GroupStorageRepository } from '../../../adapter/storage/repository/GroupStorageRepository'
import { EditGroupDialogPreparer } from '../group/dialog/EditGroupDialogPreparer'

export const OpenGroupDialogButtonPreparer = {
  prepare(): HTMLAnchorElement {
    return EffectOpenDialogButton.effect(POpenGroupDialogButtonPreparer.createDialogEffect())
  },
}

const POpenGroupDialogButtonPreparer = {
  createDialogEffect(): CreateDialogEffect {
    return () => GroupStorageRepository.get().then((gl) => EditGroupDialogPreparer.prepare(gl))
  },
}
