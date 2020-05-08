import { createParkSchema,updateParkSchema   } from "./schema"
import { Repository } from "typeorm";
import { Parking } from "./entity"

export default (server , options, next) => {

    server.post(
    "/create",
    { schema: createParkSchema},
    async (req, res) => {
      const {code,priority,status} = req.body
      , db : Repository<Parking>  = server.db.parking
      await db.save(db.create({
        code,priority,status
      }))
      res.code(200).send({status:true,msg:"Create Success"})
    }
  )
    server.post(
    "/update/:id",
    { schema: updateParkSchema},
    async (req, res) => {
      req.log.info(`update #${req.params.id}`)
      const {code,priority,status} = req.body
      , db : Repository<Parking>  = server.db.parking
      await db.update(req.params.id,{
        code,priority,status
      })
      res.code(200).send({status:true,msg:"Update Success"})
    }
  )
  next()
}
