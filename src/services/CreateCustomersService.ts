import exp from "constants";
import prismaClient from "../prisma";
import bcrypt from 'bcrypt';

interface CreateCustomersProps{
    name: string;
    password: string;
    email: string;
}

class CreateCustomersService {
    async execute({name, password, email}: CreateCustomersProps){
        
        if(!name && !password && !email){
            throw new Error("Preencha todos os campos")
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const customer = await prismaClient.customer.create({
            data:{
                name,
                password: hashPassword,
                email,
                status: true
            }
        })

        return customer
    }
}

export { CreateCustomersService }