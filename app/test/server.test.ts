import createServer from "../server"

import { ParkStatus } from "../modules/parking/enum";
import { Parking } from "../modules/parking/entity";
import { CarPark } from "../modules/carpark/entity";
import { FastifyServer } from "../modules/context";



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
          id: "A TEST"
          ,code: "A Test"
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
    
      test("CREATE A1 /parks/create SUCCESS", done => {
        const body =   {
          code: "A1"
          ,priority: 0
        }
        server.inject(
          {
            method: "POST",
            url: `/parks/create`,
            payload: body,
          },
          (err, res) => {
            expect(res.statusCode).toBe(201)
            const payload = JSON.parse(res.payload)
            expect(payload.status).toEqual(true)
            done(err)
          }
        )
      })
      test("CREATE A2 /parks/create SUCCESS", done => {
        const body =   {
          code: "A2"
          ,priority: 0
        }
        server.inject(
          {
            method: "POST",
            url: `/parks/create`,
            payload: body,
          },
          (err, res) => {
            expect(res.statusCode).toBe(201)
            const payload = JSON.parse(res.payload)
            expect(payload.status).toEqual(true)
            done(err)
          }
        )
      })

      test("UPDATE A2 /parks/update/:id SUCCESS", done => {
        const  id =  2
        const body =   {
          code: "A22"
          ,priority: 2
        }
        server.inject(
          {
            method: "POST",
            url: `/parks/update/${id}`,
            payload: body,
          },
          (err, res) => {
            expect(res.statusCode).toBe(201)
            const payload = JSON.parse(res.payload)
            expect(payload.status).toEqual(true)
            done(err)
          }
        )
      })

      test("POST /parks/list List park", done => {
        const body =   {
          parkStatus: ParkStatus.ready
        }
        server.inject(
          {
            method: "POST",
            url: `/parks/list`,
            payload: body,
          },
          (err, res) => {
            expect(res.statusCode).toBe(200)
            const payload = JSON.parse(res.payload)
            expect(payload.total).toEqual(2)
            done(err)
          }
        )
      })
      test("GET /parks/available Check Available park", done => {
        server.inject(
          {
            method: "GET",
            url: `/parks/available`,
          },
          (err, res) => {
            expect(res.statusCode).toBe(200)
            const payload = JSON.parse(res.payload)
            expect(JSON.parse(res.payload)[0]).toEqual({
              "total": 2,
              "sTotal": 2,
              "mTotal": 0,
              "lTotal": 0
            })
            done(err)
          }
        )
      })
      test("GET /parks/available/:size Check Available park by Size", done => {
        server.inject(
          {
            method: "GET",
            url: `/parks/available/${ParkStatus.ready}`,
          },
          (err, res) => {
            expect(res.statusCode).toBe(200)
            const payload = JSON.parse(res.payload)
            expect(payload).toEqual({
              "total": 2,
              "available": 2
            })
            done(err)
          }
        )
      })

            

});