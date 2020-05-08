import "reflect-metadata"
import fp from "fastify-plugin"
import { createConnection, getConnectionOptions,getRepository,Repository } from "typeorm"
import { CarPark } from "../modules/carpark/entity"
import { Parking } from "../modules/parking/entity"


export type ServerDB = {
    dbPark: Repository<Parking>
    ,dbCarPark: Repository<CarPark>  
}

export default fp(async server => {
  try {
    const connectionOptions = await getConnectionOptions()
    Object.assign(connectionOptions, {
      entities: [ CarPark,Parking]
    })

    console.log(`connecting to database: ${connectionOptions.type}...`)
    const connection = await createConnection(connectionOptions)
    console.log("database connected")

    server.decorate("db", <ServerDB> {
      dbPark: connection.getRepository(Parking)
      ,dbCarPark: connection.getRepository(CarPark)
    })
  } catch (error) {
    console.log(error)
    console.log("make sure you have set .env variables - see .env.sample")
  }
})
