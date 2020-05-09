require('dotenv').config()

import fastify from "fastify"
import cors from "cors"

import db from "./plugins/db"
import carparkRoute from "./modules/carpark/routes"
import parkRoute from "./modules/parking/routes"


function createServer() {
  const server = fastify({ logger: { prettyPrint: true } })
  server.use(cors())

  server.register(require("fastify-oas"), {
    routePrefix: "/docs",
    exposeRoute: true,
    swagger: {
      info: {
        title: "inventory api",
        description: "api documentation",
        version: "0.1.0"
      },
      servers: [
        { url: "http://localhost:3000", description: "development" },
        {
          url: "https://<production-url>",
          description: "production"
        }
      ],
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      security: [{ bearerAuth: [] }],
    }
  })

  server.register(db)
  server.register(parkRoute,{prefix:'/parks'})
  server.register(carparkRoute)



  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.send({ error })
  })


  return server
}

export default createServer
