export default interface ICreateUserDTO {
  username: string;
  full_name: string;
  age: number;
  password: string;
  email: string;
  UF: string;
  city: string;
  cpf?: string;
  isInfluencer: boolean;
}
