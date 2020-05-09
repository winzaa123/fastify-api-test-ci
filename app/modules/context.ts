import { FastifyInstance } from "fastify";

import { ServerDB } from "../plugins/db";


export interface FastifyServer extends FastifyInstance {

    db : ServerDB
}


export const takeDefault = 20

export const calculatePage = (page, take = 20 ) => isNaN(page) || page ==0?0:((page-1)*take)
