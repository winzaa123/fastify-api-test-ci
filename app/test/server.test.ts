import createServer from "../server"
import typeorm = require("typeorm")

import { ParkStatus } from "../modules/parking/enum";
import { Parking } from "../modules/parking/entity";
import { CarPark } from "../modules/carpark/entity";

import { CarSize,CarStatus } from "../modules/carpark/enum";

const parking   = <Parking[]> [
  {
    id:1
    ,code: "S1"
    ,priority: 0
    ,status:ParkStatus.ready
    ,parkSize:CarSize.small
  },
  {
    id:2
    ,code: "S2"
    ,priority: 1
    ,status:ParkStatus.ready
    ,parkSize:CarSize.small
  },  
  {
    id:3
    ,code: "M1"
    ,priority: 0
    ,status:ParkStatus.ready
    ,parkSize:CarSize.medium
  },  
  {
    id:4
    ,code: "M2"
    ,priority: 1
    ,status:ParkStatus.active
    ,parkSize:CarSize.medium
  },  
  {
    id:5
    ,code: "L1"
    ,priority: 1
    ,status:ParkStatus.ready
    ,parkSize:CarSize.large
  },  
  {
    id:6
    ,code: "L2"
    ,priority: 1
    ,status:ParkStatus.ready
    ,parkSize:CarSize.large
  }
]
const carPark =  <CarPark[]> [
  {
    id:1,
    plateNumber: "S-0001",
    size: CarSize.small,
    park: parking[0]
  },
  {
    id:2,
    plateNumber: "S-0002",
    park: parking[1],
    size: CarSize.small
  },
  {
    id:3,
    plateNumber: "M-0001",
    park: parking[1],
    size: CarSize.medium
  },
  {
    id:4,
    plateNumber: "M-0002",
    park: parking[1],
    size: CarSize.medium
  }
]

const dbMock = {
    dbPark: {
      createQueryBuilder: jest.fn(() => ({
        delete: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockReturnThis(),
      })),
      create: jest.fn().mockReturnValue(parking[0]),
      save: jest.fn().mockReturnValue(parking[0]),

      update: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnValue(parking),
      findOne: jest.fn().mockReturnValue(parking[0]),
      remove: jest.fn()
    },
    dbCarPark: {
      createQueryBuilder: jest.fn(() => ({
        delete: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockReturnThis(),
      })),
      create: jest.fn(),

      find: jest.fn().mockReturnValue(carPark),
      findOne: jest.fn().mockReturnValue(carPark[1]),
      save: jest.fn().mockReturnValue(carPark[0]),
      remove: jest.fn()
    }
}

typeorm.createConnection = jest.fn().mockReturnValue({
  getRepository: model => {
    if (model.name === 'Parking') return  dbMock.dbPark
    if (model.name === 'CarPark') return  dbMock.dbCarPark
  }
})

typeorm.getConnectionOptions = jest.fn().mockReturnValue({})

describe("Server", () => {
  const server = createServer()
  // server.decorate('db', dbMock)
  beforeEach(async () => {
    await server.ready()
  })
  afterAll(() => server.close())

  test("/health returns ok", done => {
    server.inject(
      {
        method: "GET",
        url: "/health"
      },
      (err, res) => {
        expect(res.statusCode).toBe(200)
        expect(JSON.parse(res.payload)).toEqual({ status: "ok" })
        done(err)
      }
    )
  })
  test("CREATE /parks/create FAILED", done => {
    const body =   {
      id: parking[0].id
      ,code: parking[0].code
    }
    server.inject(
      {
        method: "POST",
        url: `/parks/create`,
        payload: body,
      },
      (err, res) => {
        expect(res.statusCode).toBe(400)
        done(err)
      }
    )
  })
  test("CREATE /parks/create SUCCESS", done => {
    const body =   {
      id: parking[0].id
      ,code: parking[0].code
      ,priority: parking[0].priority
    }
    server.inject(
      {
        method: "POST",
        url: `/parks/create`,
        payload: body,
      },
      (err, res) => {
        expect(res.statusCode).toBe(201)
        expect(dbMock.dbPark.save).toHaveBeenCalled()
        const payload = JSON.parse(res.payload)
        expect(payload.status).toEqual(true)
        done(err)
      }
    )
  })

})
