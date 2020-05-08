import {
  CarSize
} from './enum'

const carSize = Object.keys(CarSize).map(k => CarSize[k])
// ,  carStatus = Object.keys(CarStatus).map(k => CarStatus[k])
export const carSchema = {
  id: {
    type: "number",
  },
  plateNumber: {
    type: "string"
  },
  // size: {
  //   type: "string",
  //   enum: carStatus
  // },
  // parkStatus: {
  //   type: "string",
  //   enum: carSize,
  //   default: CarStatus.atCounter
  // },

  createdAt: {
    type: "string",
    format: "date-time"
  },
  updatedAt: {
    type: "string",
    format: "date-time"
  }
}

// export const listCarParkSchema = {
//   summary: "List Car Parking slot",
//   description: "List Paring slot",
//   response: {
//     200: {
//       type: "object",
//       properties: {
//         total: {
//           type: "number"
//         },
//         items: {
//           type: "array",
//           items: carSchema
//         }
//       }
//     }
//   }
// }

export const requestCarParkSchema = {
  summary: "Request park the car",
  description: "Request park the car",
  body: {
    type: "object",
    required: ["plateNumber", "size","parkId"],
    properties: {
      plateNumber: {
        type: "string"
      },
      size: {
        type: "string",
        enum: carSize
      },
      // parkStatus: {
      //   type: "string",
      //   enum: carStatus,
      //   default: CarStatus.atCounter
      // },
      parkId: {
        type: "number"
      },
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        status : {type:"boolean"},
        msg : {type:"string"}
      }
    }
  }
}

export const updateCarParkSchema = {
  summary: "Update park the car",
  description: "Update park the car",
  body: {
    type: "object",
    required: ["plateNumber", "size","parkId"],
    properties: {
      plateNumber: {
        type: "string"
      },
      size: {
        type: "string",
        enum: carSize
      },
      // parkStatus: {
      //   type: "string",
      //   enum: carStatus,
      //   default: CarStatus.backToCounter
      // },
      parkId: {
        type: "number"
      },
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        status : {type:"boolean"},
        msg : {type:"string"}
      }
    }
  }
}
