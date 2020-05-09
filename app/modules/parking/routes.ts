import { createParkSchema, updateParkSchema,listParkSchema,availableParkSchema,availableBySizeParkSchema } from "./schema";

import { FastifyServer } from "../context";
import { CarSize } from "../carpark/enum";
import { ParkStatus } from "./enum";

export default (server: FastifyServer, options, next) => {
  server.post("/create", { schema: createParkSchema }, async (req, res) => {
    const { code, priority, status, parkSize } = req.body,
      { dbPark } = server.db
      const d = dbPark.create({
        code,
        priority,
        status,
        parkSize,
      })
    await dbPark.save(d);
    res.code(201).send({ status: true, msg: "Create Success" });
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
        query.andWhere("q.status = :parkStatus", { parkStatus })
      }
      if(parkSize){
        query.andWhere("q.parkSize = :parkSize", { parkSize })
      }else{
        query.addOrderBy("q.parkSize","ASC")
      }
      if(code){
        query.andWhere('q.code LIKE :code',{code: `%${code}%`})
      }
      if(counterPark){
        query.addOrderBy(`ABS(q.priority - ${counterPark})`)
      }
      


      const [items,total] = await query
      .getManyAndCount()
      // console.log(items)

    
    res.code(200).send({ items,total });
  });
  server.get("/available", { schema: availableParkSchema }, async (req, res) => {
    const  { dbPark } = server.db
      const query =  dbPark.createQueryBuilder("q")

      const items= await query
      .select('id')
      .addSelect("COUNT(*)","total")
      .addSelect(`SUM(case when (q.parkSize = '${CarSize.small}'  AND q.status = '${ParkStatus.ready}' ) then 1 else 0 end)`,"sTotal")
      .addSelect(`SUM(case when (q.parkSize = '${CarSize.medium}' AND q.status = '${ParkStatus.ready}' ) then 1 else 0 end)`,"mTotal")
      .addSelect(`SUM(case when (q.parkSize = '${CarSize.large}'  AND q.status = '${ParkStatus.ready}' ) then 1 else 0 end)`,"lTotal")
      .getRawOne()
      const {sTotal,total,mTotal,lTotal}  = items

    res.code(200).send({ sTotal,total,mTotal,lTotal });
  });
  server.get("/available/:size", { schema: availableBySizeParkSchema }, async (req, res) => {
    const  { dbPark } = server.db
    const {size} = req.params
    const query =  dbPark.createQueryBuilder("q")
      const items= await query
      .select('id')
      .addSelect("COUNT(*)","total")
      .addSelect(`SUM(case when (q.parkSize = '${size}'  AND q.status = '${ParkStatus.ready}' ) then 1 else 0 end)`,"available")
      .getRawOne()
      const {available,total}  = items

    res.code(200).send({available,total });
  });
  next();
};
