export interface User {
  id: number;
  firstName: string;
  lastName: string;
  group_Type: string;
  email: string;
  user_Type: string;
}

export interface update_User {
  firstName: string;
  lastName: string;
  email: string;
  user_Type: string;
}
