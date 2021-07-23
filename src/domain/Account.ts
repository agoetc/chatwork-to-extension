import { ListObject, ValueObject } from './Common'

export interface Account {
  accountId: AccountId
  imagePath: string
  name: string
}

export interface AccountId extends ValueObject {
  value: number
}

export const AccountId = {
  fromString(idStr: string): AccountId {
    return { value: Number(idStr) }
  },
}

export interface AccountList extends ListObject {
  value: Account[]
}
