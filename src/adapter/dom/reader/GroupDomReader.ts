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
    }
}
