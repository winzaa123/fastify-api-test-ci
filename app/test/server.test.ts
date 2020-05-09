import createServer from "../server"

import { ParkStatus } from "../modules/parking/enum";
import { Parking } from "../modules/parking/entity";
import { CarPark } from "../modules/carpark/entity";
import { FastifyServer } from "../modules/context";
import { CarSize, CarStatus } from "../modules/carpark/enum";



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
            expect(res.statusCode).toBe(200)
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
            expect(payload).toEqual({
              "total": 2,
              "sTotal": 2,
              "mTotal": 0,
              "lTotal": 0
            })
            done(err)
          }
        )
      })

      const checkSmall = (textDisplay,expectData) =>{
        test(textDisplay, done => {
          server.inject(
            {
              method: "GET",
              url: `/parks/available/${CarSize.small}`,
            },
            (err, res) => {
              expect(res.statusCode).toBe(200)
              const payload = JSON.parse(res.payload)
              expect(payload).toEqual(expectData)
              done(err)
            }
          )
        })
      }
      checkSmall( "GET /parks/available/:size Check Available park by Size Full",{
        "total": 2,
        "available": 2
      })
      
      test("POST /request/park  Request park slot unavailable", done => {
        const body =   {
          plateNumber: "ABC-1234",
          size: CarSize.medium
        }
        server.inject(
          {
            method: "POST",
            url: `/request/park`,
            payload: body,
          },
          (err, res) => {
            expect(res.statusCode).toBe(200)
            const payload = JSON.parse(res.payload)
            expect(payload.status).toEqual(false)
            done(err)
          }
        )
      })

      test("POST /request/park  Request park slot available #1", done => {
        const body =   {
          plateNumber: "ABC-1234",
          size: CarSize.small
        }
        server.inject(
          {
            method: "POST",
            url: `/request/park`,
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

      test("POST /request/park  Request park slot available #2", done => {
        const body =   {
          plateNumber: "ABC-2000",
          size: CarSize.small
        }
        server.inject(
          {
            method: "POST",
            url: `/request/park`,
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

      checkSmall( "GET /parks/available/:size Check Available park by Size after request",{
        "total": 2,
        "available": 0
      })

      test("POST /checkout/park  Request park slot available", done => {
        const body =   {
          id: 1
        }
        server.inject(
          {
            method: "POST",
            url: `/checkout/park`,
            payload: body,
          },
          (err, res) => {
            expect(res.statusCode).toBe(200)
            const payload = JSON.parse(res.payload)
            expect(payload.status).toEqual(true)
            done(err)
          }
        )
      })

      checkSmall( "GET /parks/available/:size Check Available park by Size after checkout",{
        "total": 2,
        "available": 1
      })


      test("POST /search/park  Request search car by keyword", done => {
        const body =   {
          plateNumber: "BC"
        }
        server.inject(
          {
            method: "POST",
            url: `/search/park`,
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
      
      test("POST /search/park  Request search car in park current", done => {
        const body = <CarPark>  {
          carStatus: CarStatus.park
        }
        server.inject(
          {
            method: "POST",
            url: `/search/park`,
            payload: body,
          },
          (err, res) => {
            expect(res.statusCode).toBe(200)
            const payload = JSON.parse(res.payload)
            expect(payload.total).toEqual(1)
            done(err)
          }
        )
      })

      test("POST /parks/list Search list park by keyword", done => {
        const body =  <Parking>  {
          code: "A"
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

            

});