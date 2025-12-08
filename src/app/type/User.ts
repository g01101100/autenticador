export interface IUser{
    id: number;
    password: string;
    email:string;
    imgProfile?: string;
}


export default class User implements IUser{
    id!: number;
    password!: string;
    email!: string;
    imgProfile?: string | '';


    constructor(
        password?: string,
        email?: string,
        imgProfile?: string,
    ) {
        if (password) this.password = password
        if (email) this.email = email
        if (imgProfile) this.imgProfile = imgProfile
    }
}