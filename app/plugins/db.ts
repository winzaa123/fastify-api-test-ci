import "reflect-metadata"
import fp from "fastify-plugin"
import { createConnection, getConnectionOptions } from "typeorm"

export default fp(async server => {
  try {
    const connectionOptions = await getConnectionOptions()
    Object.assign(connectionOptions, {
      entities: [ ]
    })

    console.log(`connecting to database: ${connectionOptions.type}...`)
    const connection = await createConnection(connectionOptions)
    console.log("database connected")

    server.decorate("db", {
      

    })
  } catch (error) {
    console.log(error)
    console.log("make sure you have set .env variables - see .env.sample")
  }
})
