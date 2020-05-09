import { createParkSchema, updateParkSchema,listParkSchema } from "./schema";

import { FastifyServer } from "../context";

export default (server: FastifyServer, options, next) => {
  server.post("/create", { schema: createParkSchema }, async (req, res) => {
    const { code, priority, status, parkSize } = req.body,
      { dbPark } = server.db;
    await dbPark.save(
      dbPark.create({
        code,
        priority,
        status,
        parkSize,
      })
    );
    res.code(200).send({ status: true, msg: "Create Success" });
  });
  server.post("/update/:id", { schema: updateParkSchema }, async (req, res) => {
    req.log.info(`update #${req.params.id}`);
    const { code, priority, status, parkSize } = req.body,
      { dbPark } = server.db;
    await dbPark.update(req.params.id, {
      code,
      priority,
      status,
      parkSize,
    });
    res.code(200).send({ status: true, msg: "Update Success" });
  });

  server.post("/list", { schema: listParkSchema }, async (req, res) => {
    const { code, counterPark, parkStatus, parkSize } = req.body,
      { dbPark } = server.db
      const query =  dbPark.createQueryBuilder("q")

      if(parkStatus){
        query.andWhere("status = :parkStatus", { parkStatus })
      }
      if(parkSize){
        query.andWhere("parkSize = :parkSize", { parkSize })
      }else{
        query.addOrderBy("q.parkSize","ASC")
      }
      if(code){
        query.andWhere('q.code LIKE :code',{code: `%${code}%`})
      }
      if(counterPark){
        query.addOrderBy(`ABS(priority - ${counterPark})`)
      }
      


      const [items,total] = await query
      .take(30)
      .getManyAndCount()
      console.log(items)

    
    res.code(200).send({ items,total });
  });
  next();
};
