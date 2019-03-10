import { IdType } from '../enums';
export interface IUser {
    typeId: IdType;
    numberId: number;
    name: string;
    lastName: string;
    phone: string;
    address: string;
    countryId: number;
    departamentId: number;
    cityId: number;
    description: string;
    email: string;
    password: string;
    passworConfirm: string;
}
