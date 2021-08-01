import {
  CreateDialogEffect,
  EffectOpenDialogButton,
} from '../../builder/effector/group/dialog/dialog/EffectOpenDialogButton'
import { GroupStorageRepository } from '../../../storage/repository/GroupStorageRepository'
import { EditGroupDialogPreparer } from '../group/dialog/EditGroupDialogPreparer'
import { GroupSessionStorageRepository } from '../../../session-storage/repository/GroupSessionStorageRepository'

export const OpenGroupDialogButtonPreparer = {
  prepare(): HTMLAnchorElement {
    return EffectOpenDialogButton.effect(POpenGroupDialogButtonPreparer.createDialogEffect())
  },
}

const POpenGroupDialogButtonPreparer = {
  createDialogEffect(): CreateDialogEffect {
    return () =>
      GroupStorageRepository.get().then((gl) => {
        GroupSessionStorageRepository.update(gl)
        return EditGroupDialogPreparer.prepare()
      })
  },
}
