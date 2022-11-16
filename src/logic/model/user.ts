import { iUser, iUserStatic } from '../interface/iUser';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import staticDecorator from "../interface/staticImplement";

const prisma : PrismaClient = new PrismaClient();

@staticDecorator<iUserStatic>()
export default class User implements iUser{
    username: string;
    password: string;
    email: string;
    id_role: number;

    constructor({username, password, email, id_role} :  Omit<PrismaUser, 'id'>){
        this.username = username;
        this.password = password;
        this.email = email;
        this.id_role = id_role;
    }

    async update(user_id : number) : Promise<PrismaUser | null>{
        const user = await prisma.user.update({
            data: {
                username: this.username,
                password: this.password,
                email: this.email,
                id_role: this.id_role
            },
            where: {
                id: user_id
            }
        })

        return user;
    }

    static async find(user_id : number) : Promise<PrismaUser | null>{
        const user = await prisma.user.findUnique({
            where: {
                id: user_id
            }
        })

        return user;
    }

    static async delete(user_id : number) : Promise<PrismaUser | null>{
        const user = await prisma.user.delete({
            where: {
                id: user_id
            }
        })

        return user;
    }

    static async create({username, password, email, id_role}  :  Omit<PrismaUser, 'id'>) : Promise<PrismaUser | null> {
        const user = await prisma.user.create({
            data:{
                username: username,
                password: password,
                email: email,
                id_role: id_role
            }
        })

        return user;
    }
}