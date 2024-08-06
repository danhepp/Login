import { FastifyRequest, FastifyReply } from "fastify";
import { LoginCustomersService } from "../services/LoginCustomersService";



class LoginCustomersController{
    async handle(request: FastifyRequest, reply: FastifyReply){

        const {email , password} = request.body as { email:string, password:string }

        const loginService = new LoginCustomersService();

        const usuario = await loginService.execute({email, password})  

        reply.send({message: "Logado com sucesso."})
}

    async getProfile(request:FastifyRequest, reply: FastifyReply) {
        const {authorization} = request.headers as {authorization:string}

     
        const loginService = new LoginCustomersService()

        const autorizacao = await loginService.getProfile({authorization})

        
        reply.send("Usuario autenticado");
    }

}

export {LoginCustomersController}