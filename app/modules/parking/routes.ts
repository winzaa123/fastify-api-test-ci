import { createParkSchema,updateParkSchema   } from "./schema"

import { FastifyServer } from "../context"

export default (server :FastifyServer , options, next) => {
    server.post(
    "/create",
    { schema: createParkSchema},
    async (req, res) => {
      const {code,priority,status} = req.body
      , {dbPark}  = server.db
      await dbPark.save(dbPark.create({
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
      , {dbPark}  = server.db
      await dbPark.update(req.params.id,{
        code,priority,status
      })
      res.code(200).send({status:true,msg:"Update Success"})
    }
  )
  next()
}
