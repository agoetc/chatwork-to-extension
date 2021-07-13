import {Group, GroupList, GroupRequest} from "../../../domain/Group";
import {browser} from "webextension-polyfill-ts";
import {AccountList} from "../../../domain/Account";

const PrivateGroupStorageRepository = {
    getListByName(groupList: GroupList, name: string): Group | undefined {
        return groupList.value.find(group => group.name === name)
    },
    save(groupList: GroupList): Promise<void> {
        return browser.storage.sync.set({'group': GroupList.toObj(groupList)})
    },
    buildGroupListByObj(groupListObj: any): GroupList {
        const groupList: GroupList = {value: []}
        console.log(groupListObj)

        for (let groupName in groupListObj.value) {
            if (groupListObj.value.hasOwnProperty(groupName)) {
                const accountListObj = groupListObj.value[groupName].accountList
                const accountList = AccountList.buildByObj(accountListObj)
                groupList.value.push({
                    name: groupName,
                    accountList: accountList
                })
            }
        }

        return groupList
    }
}

export const GroupStorageRepository = {
    delete(groupList: GroupList, groupName: string): Promise<void> {
        groupList.value.filter(g => g.name !== groupName)
        return PrivateGroupStorageRepository.save(groupList)
    },
    get(): Promise<GroupList> {
        return browser.storage.sync.get('group').then((a) =>
            PrivateGroupStorageRepository.buildGroupListByObj(a)
        )
    },
    addList(groupList: GroupList, req: GroupRequest): Promise<void> {
        // TODO: elseのときどうする？
        console.log(req)
        const group = PrivateGroupStorageRepository.getListByName(groupList, req.name)
        const existsGroupName = group !== undefined

        if (groupList.value.length === 0 || !existsGroupName) {
            groupList.value.push({
                name: req.name,
                accountList: req.accountList
            })
            return PrivateGroupStorageRepository.save(groupList)
        } else if (group !== undefined) {
            const mergedAccountList = AccountList.mergeAccountListRequest(group.accountList, req.accountList)
            groupList.value.push({
                name: req.name,
                accountList: mergedAccountList
            })
            return PrivateGroupStorageRepository.save(groupList)
        } else {
            return new Promise<void>(() => {
            });
        }
    }
}