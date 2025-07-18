export type GroupUserType = {
  user_id: string;
  role: string;
};

export type GroupType = {
  id: string;
  title: string;
  description: string;
  create_by_user: string;
  is_user_group: boolean;
  users: Array<GroupUserType>;
};

export type GroupCreationType = {
  title: string;
  description: string;
  create_by_user: string;
  is_user_group: boolean;
  users: Array<GroupUserType>;
};
