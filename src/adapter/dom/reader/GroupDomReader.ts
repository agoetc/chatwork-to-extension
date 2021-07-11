import {AccountList} from "../../../domain/Account";
import {Group, GroupList, GroupRequest} from "../../../domain/Group";
import {GroupRepository} from "../../storage/repository/GroupRepository";

const groupRepository = GroupRepository
export const GroupDomReader = {
    buildByObj(groupListObj: GroupList): GroupList {
        const groupList: GroupList = {value: []}
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
    },
    addGroup(groupList: GroupList, req: GroupRequest): Promise<void> {
        // TODO: elseのときどうする？
        console.log(req)
        const group = this.getGroupByName(groupList, req.name)
        const existsGroupName = group !== undefined

        if (groupList.value.length === 0 || !existsGroupName) {
            groupList.value.push({
                name: req.name,
                accountList: req.accountList
            })
            return groupRepository.save(groupList)
        } else if (group !== undefined) {
            const mergedAccountList = AccountList.mergeAccountListRequest(group.accountList, req.accountList)
            groupList.value.push({
                name: req.name,
                accountList: mergedAccountList
            })
            return groupRepository.save(groupList)
        } else {
            return new Promise<void>(() => {
            });
        }
    },
    getGroupByName(groupList: GroupList, name: string): Group | undefined {
        return groupList.value.find(group => group.name === name)
    }
}
