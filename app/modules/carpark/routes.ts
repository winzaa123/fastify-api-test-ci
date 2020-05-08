import {requestCarParkSchema  } from "./schema"
import { Repository } from "typeorm";
import { CarPark } from "./entity"
import { ParkStatus } from "../parking/enum"


import { Parking } from "../parking/entity"


export default (server, options, next) => {
  server.post(
    "/request/park",
    { schema: requestCarParkSchema},
    async (req, res) => {
      const {plateNumber,size} = req.body
      , dbPark : Repository<Parking>  = server.db.parking
      , dbCar : Repository<CarPark>  = server.db.carPark

      const parkFirst = await dbPark.findOne({where:{status:ParkStatus.ready},order:{priority:"ASC"}})

      if(!parkFirst){
        return {status:false,msg:"Can't process because slot full"}
      }
      await dbPark.update(parkFirst,{status:ParkStatus.active})
      await dbCar.save(dbCar.create({
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
      , dbPark : Repository<Parking>  = server.db.parking
      , dbCar : Repository<CarPark>  = server.db.carPark

    }
  )
  next()
}
