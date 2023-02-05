export interface User {
  id?: number;
  name?: string;
  surname?: string;
  profilePicture?: string;
  telephoneNumber?: string;
  email: string;
  address: string;
  password?: string;
  blocked?: boolean;
  active?: boolean;
  role?: string;
}

export interface UserWithNoPassword {
  id: number;
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
}

export interface UserWithNoId {
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
  password: string;
}

export interface UserPanicResponse {
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
}

export interface PageUsers {
  totalCount: number;
  results: User[];
}

export interface NewOldPassword {
  newPassword: string;
  oldPassword: string;
}

export interface NewPasswordCode {
  newPassword: string;
  code: string;
}

export interface IdEmail {
  id: number;
  email: string;
}
