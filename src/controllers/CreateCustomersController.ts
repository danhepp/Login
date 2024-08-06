import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomersService } from "../services/CreateCustomersService";


class CreateCustomersController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {name, password, email} = request.body as {name: string, password: string, email: string}

        const customerService = new CreateCustomersService();
        const customer = await customerService.execute({name, password, email});

        reply.send(customer);
    }
}

export { CreateCustomersController }