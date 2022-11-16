import { User } from '@prisma/client'

export interface iUser extends Omit<User, 'id'>{
    update(user_id: number) : Promise<User | null>;
}

export interface iUserStatic{
    find(user_id: number) : Promise<User | null>;
    delete(user_id: number) : Promise<User | null>;
    create(userObj : Omit<User, 'id'>) : Promise<User | null>;
}