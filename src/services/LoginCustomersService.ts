import prismaClient from "../prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface LoginCustomerProps{
    email:string,
    password:string;
}

interface AuthorizationProps{
    authorization:string;
}

type JwtPayLoad = {
    id:string;
}


class LoginCustomersService{
    async execute({ email, password }: LoginCustomerProps){

        if(!password && !email){
            throw new Error("Preencha todos os campos")
        }


        const findCustomer = await prismaClient.customer.findFirst({
            where:{
                email : email
            }
        })

        if(!findCustomer){
            throw new Error("Cliente não cadastrado")
        }
        
        const verifyPass = await bcrypt.compare(password,  findCustomer.password)

        if(!verifyPass){
            throw new Error("Senha incorreta")
        }

        const token = jwt.sign({id: findCustomer.id}, process.env.JWT_PASS ?? '', {expiresIn: '1d'})

        console.log(token)


        return findCustomer

    }

    async getProfile({authorization} : AuthorizationProps){
        
        if(!authorization){
            throw new Error ("Usuario não autorizado");
        }

        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayLoad
        
        const findCustomer = await prismaClient.customer.findFirst({
            where:{
                id : id
            }
        })

        if(!findCustomer){
            throw new Error("Usuario não autorizado")
        }

        const {password:_, ... loggedUser} = findCustomer

        return findCustomer

    }
    

}

export { LoginCustomersService }