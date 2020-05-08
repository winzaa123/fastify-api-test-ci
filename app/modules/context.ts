import { FastifyInstance } from "fastify";

import { ServerDB } from "../plugins/db";


export interface FastifyServer extends FastifyInstance {

    db : ServerDB
}


