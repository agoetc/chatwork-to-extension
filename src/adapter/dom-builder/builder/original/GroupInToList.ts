import { env } from '../../../../env'
import { Group, GroupList } from '../../../../domain/Group'
import { AccountList } from '../../../../domain/Account'
import { AccountDomReader } from '../../../dom-reader/original/AccountDomReader'
import {
  EffectGroupInList,
  AddGroupInToListEffectRemindGroup,
} from '../../effector/original/EffectGroupInToList'

// to一覧に追加する、Group一覧のDom
export const GroupInToList = {
  build(
    groupList: GroupList,
    groupInToListEffectRemindGroup: AddGroupInToListEffectRemindGroup
  ): HTMLDivElement {
    const groupToList = document.createElement('div')
    groupToList.id = env.id.toList
    const toAccountList = AccountDomReader.getAccountList()
    const accountInGroupList = PGroupTnToList.filterAccountInGroupList(groupList, toAccountList)

    const fragment = EffectGroupInList.groupToFragment(
      accountInGroupList,
      groupInToListEffectRemindGroup
    )
    groupToList.appendChild(fragment)
    return groupToList
  },
}

const PGroupTnToList = {
  // Chat内に入っているAccountに絞る
  squeezeAccountOfInChat(group: Group, toAccountList: AccountList): AccountList {
    const inChatAccountList = group.accountList.value.filter((account) => {
      return toAccountList.value.some((toAccount) => {
        return toAccount.accountId.value === account.accountId.value
      })
    })
    return { value: inChatAccountList }
  },
  // Chat内に入っているAccountに絞り、0人のGroupがあれば取り除く
  filterAccountInGroupList(groupList: GroupList, toAccountList: AccountList): GroupList {
    const groups: Group[] = groupList.value
      .map((group) => {
        const inChatAccountList = PGroupTnToList.squeezeAccountOfInChat(group, toAccountList)
        return {
          name: group.name,
          accountList: inChatAccountList,
        }
      })
      .filter((group) => group.accountList.value.length > 0)

    console.log(groups)
    return { value: groups }
  },
}
