import {requestCarParkSchema  } from "./schema"
import { ParkStatus } from "../parking/enum"


import { FastifyServer } from "../context"


export default (server: FastifyServer, options, next) => {
  server.post(
    "/request/park",
    { schema: requestCarParkSchema},
    async (req, res) => {
      const {plateNumber,size} = req.body
      , {dbCarPark,dbPark}  = server.db

      const parkFirst = await dbPark.findOne({where:{status:ParkStatus.ready},order:{priority:"ASC"}})

      if(!parkFirst){
        return {status:false,msg:"Can't process because slot full"}
      }
      await dbPark.update(parkFirst,{status:ParkStatus.active})
      await dbCarPark.save(dbCarPark.create({
        plateNumber,size,parkId:parkFirst.id
      }))

      res.code(200).send({status:true,msg:"Request Success"})

    }
  )
  server.post(
    "/update/park",
    { schema: requestCarParkSchema},
    async (req, res) => {
      const {plateNumber,size,parkStatus,parkId} = req.body
      , {dbCarPark,dbPark}  = server.db

    }
  )
  next()
}
