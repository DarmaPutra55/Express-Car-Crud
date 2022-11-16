import { Car } from '@prisma/client'

export interface iCar extends Omit<Car, 'id'>{
    update(car_id: number) : Promise<Car | null>;
}

export interface iCarStatic{
    find(car_id: number) : Promise<Car | null>;
    delete(car_id: number) : Promise<Car | null>;
    create(carObj: Omit<Car, 'id'>) : Promise<Car | null>;
}