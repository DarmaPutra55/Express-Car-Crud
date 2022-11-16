import { iCar, iCarStatic } from "../interface/iCar";
import { PrismaClient, Car as PrismaCar } from '@prisma/client'
import staticDecorator from "../interface/staticImplement";

const prisma : PrismaClient = new PrismaClient();

@staticDecorator<iCarStatic>()
export default class Car implements iCar{
    name: string;
    owner_id: number;
    status_id: number;

    constructor({name, owner_id, status_id} :  Omit<PrismaCar, 'id'>){
        this.name = name;
        this.owner_id = owner_id;
        this.status_id = status_id;
    }

    async update(car_id : number) : Promise<PrismaCar | null>{
        const car = await prisma.car.update({
            data: {
                name: this.name,
                owner_id: this.owner_id,
                status_id: this.status_id
            },
            where: {
                id: car_id
            }
        })

        return car;
    }

    static async find(car_id : number) : Promise<PrismaCar | null>{
        const car = await prisma.car.findUnique({
            where: {
                id: car_id
            }
        })

        return car;
    }

    static async delete(car_id : number) : Promise<PrismaCar | null>{
        const car = await prisma.car.delete({
            where: {
                id: car_id
            }
        })

        return car;
    }

    static async create({name, owner_id, status_id} :  Omit<PrismaCar, 'id'>) : Promise<PrismaCar | null> {
        const car = await prisma.car.create({
            data:{
                name: name,
                owner_id: owner_id,
                status_id: status_id
            }
        })

        return car;
    }
}