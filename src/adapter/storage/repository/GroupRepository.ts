import {GroupList} from "../../../domain/Group";
import {browser} from "webextension-polyfill-ts";

export const GroupRepository = {
    toObj(groupList: GroupList) {
        const object: any = {} // TODO: delete any
        groupList.value.forEach(group => {
            object[group.name] = {}
            object[group.name]['accountList'] = group.accountList.value
        })
        return object
    },
    save(groupList: GroupList): Promise<void> {
        return browser.storage.sync.set({'group': this.toObj(groupList)})
    },
    deleteGroup(groupList: GroupList, groupName: string): Promise<void> {
        groupList.value.filter(g => g.name !== groupName)
        return this.save(groupList)
    },
    get() {
        return browser.storage.sync.get('group')
    }
}