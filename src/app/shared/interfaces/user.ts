import { IdType } from '../enums';
export interface IUser {
    typeId: IdType;
    numberId: number;
    name: string;
    lastName: string;
    phone: number;
    address: string;
    countryId: number;
    departamentId: number;
    cityId: number;
    description: string;
    email: string;
    password: string;
    passworConfirm: string;
}
