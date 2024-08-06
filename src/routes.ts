import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { request } from "http";
import { CreateCustomersController } from "./controllers/CreateCustomersController";
import { ListCustomersController } from "./controllers/ListCustomersControllers";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { LoginCustomersController } from "./controllers/LoginCustomersController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
    fastify.get("/teste", async(request: FastifyRequest, reply: FastifyReply) => {
        return{ok:true}
    })

    fastify.post("/customer", async(request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomersController().handle(request, reply);

    })

    fastify.get("/customers", async(request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomersController().handle(request,reply)
    })
    fastify.delete("/customer", async(request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request,reply)
    })

    fastify.post("/login", async(request: FastifyRequest, reply: FastifyReply) => {
        return new LoginCustomersController().handle(request, reply);
    })

    fastify.get("/profile", async(request: FastifyRequest, reply:FastifyReply) => {
        return new LoginCustomersController().getProfile(request,reply);
    })
}