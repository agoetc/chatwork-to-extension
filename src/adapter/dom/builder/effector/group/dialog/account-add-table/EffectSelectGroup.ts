import { GroupList } from '../../../../../../../domain/Group'
import { SelectBox } from '../../../../builder/group/dialog/edit-form/SelectBox'

export type ChangeGroupEffect = () => void

export const EffectSelectGroup = {
  effect(groupList: GroupList, changeGroupEffect: ChangeGroupEffect): HTMLSpanElement {
    const span = SelectBox.build(groupList)
    span.addEventListener('change', changeGroupEffect)
    return span
  },
}
