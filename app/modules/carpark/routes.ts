import { requestCarParkSchema,checkoutCarParkSchema,listCarSchema } from "./schema";
import { ParkStatus } from "../parking/enum";
import { CarStatus } from "./enum";


import { FastifyServer } from "../context";

export default (server: FastifyServer, options, next) => {
  server.post(
    "/request/park",
    { schema: requestCarParkSchema },
    async (req, res) => {
      const { plateNumber, size } = req.body,
        { dbCarPark, dbPark } = server.db,
        counterPark = 0

      const parkFirst = await dbPark
        .createQueryBuilder("q")
        .andWhere("status = :parkStatus", { parkStatus: ParkStatus.ready })
        .andWhere("parkSize = :size", { size })
        // .andWhere('priority >=  (:counterPark *.9)  AND priority <= (:counterPark *1.1)',{counterPark})
        .addOrderBy(`ABS(priority - ${counterPark})`)
        .getOne();
      // console.log(parkFirst);
      // const parkFirst = await dbPark.findOne({where:{status:ParkStatus.ready},order:{priority:"ASC"}})
      if (!parkFirst) {
        return { status: false, msg: "Can't process because slot full" };
      }
      await dbPark.update(parkFirst.id, { status: ParkStatus.active });
      await dbCarPark.save(
        dbCarPark.create({
          plateNumber,
          size,
          parkId: parkFirst.id,
        })
      );

      res.code(200).send({ status: true, msg: "Request Success" });
    }
  );
  server.post(
    "/checkout/park",
    { schema: checkoutCarParkSchema },
    async (req, res) => {
      const { id } = req.body,
        { dbCarPark, dbPark } = server.db;

      const slot = await dbCarPark.findOne(id)

      if (!slot) {
        return { status: false, msg: "Not found slot" };
      }

      await dbPark.update(slot.parkId, { status: ParkStatus.ready })
      await dbCarPark.update(slot.id,{carStatus:CarStatus.checkoutSuccess})
      return { status: true, msg: "Checkout Success" };
    }
  );
  server.post("/search/park", { schema: listCarSchema }, async (req, res) => {
    const { plateNumber, carSize, parkStatus } = req.body,
      { dbCarPark } = server.db
      const query =  dbCarPark.createQueryBuilder("q")

      if(parkStatus){
        query.leftJoin("q.park", "park")
        query.andWhere("park.status = :parkStatus", { parkStatus })
      }
      if(carSize){
        query.andWhere("carSize = :carSize", { carSize })
      }else{
        query.addOrderBy("q.size","ASC")
      }
      if(plateNumber){
        query.andWhere('q.plateNumber LIKE :plateNumber',{plateNumber: `%${plateNumber}%`})
      }
      


      const [items,total] = await query
      .getManyAndCount()
      console.log(items)

    
    res.code(200).send({ items,total });
  });
  next();
};
