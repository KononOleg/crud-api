export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: IUser[] = [
  {
    id: "75442486-0878-440c-9db1-a7006c25a39f",
    username: "Tom",
    age: 54,
    hobbies: ["Tiller"],
  },
];
export default users;
