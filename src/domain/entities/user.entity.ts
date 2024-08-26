export interface UserEntityProps {
  id: string;
  name: string;
  gender: "male" | "female" | "other";
  dateOfBirth: Date;
  email: string;
  password: string;
}

export class UserEntity {
  #props: UserEntityProps;

  constructor(props: UserEntityProps) {
    this.#props = props;
  }

  get user() {
    return this.#props;
  }
}
