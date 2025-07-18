import { GroupCreationType, GroupType } from "@/@types/entitites/group.types";

export interface GroupReppositoryInterface {
  create: (data: GroupCreationType) => Promise<GroupType>;
}
