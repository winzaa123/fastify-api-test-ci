import {
  CarSize,CarStatus
} from './enum'
import {
  ParkStatus
} from '../parking/enum'

const carSize = ["",...Object.keys(CarSize).map(k => CarSize[k])]
,  carStatus = ["",...Object.keys(CarStatus).map(k => CarStatus[k])]
,  parkStatus = ["",...Object.keys(ParkStatus).map(k => ParkStatus[k])]
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
    carSize: {
    type: "string",
    enum: carSize,
    default: CarSize.small
  },
  carStatus: {
    type: "string",
    enum: carStatus,
    default: CarStatus.park
  },

  checkInAt: {
    type: "string",
    format: "date-time"
  },
  updatedAt: {
    type: "string",
    format: "date-time"
  }
}

export const listCarSchema = {
  summary: "list car parks",
  description: "API Search Car in Parking lot",
  body: {
    type: "object",
    // required: [],
    properties: {
      plateNumber: { type: "string"  , nullable: true, default: null},
      carSize: { type: ["string","null"] , enum:carSize, nullable: true, default: "" },
      parkStatus: { type: ["string","null"], enum:parkStatus, nullable: true, default: "" },
      carStatus: { type: ["null","string"], enum:carStatus, nullable: true, default: "" },
      page: { type: "number" ,nullable: true,   default: 1 },

    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        total: { type: "number" },
        items: {
          type: "array",
          items: {type: "object" , properties:carSchema},
        },
      },
    },
  },
};

export const requestCarParkSchema = {
  summary: "Request park the car",
  description: "Request park the car",
  body: {
    type: "object",
    required: ["plateNumber", "size"],
    properties: {
      plateNumber: {
        type: "string"
      },
      size: {
        type: "string",
        enum: carSize,
        default:CarSize.small
      },
      // parkStatus: {
      //   type: "string",
      //   enum: carStatus,
      //   default: CarStatus.atCounter
      // },
      // parkId: {
      //   type: "number"
      // },
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

export const checkoutCarParkSchema = {
  summary: "Update park the car",
  description: "Update park the car",
  body: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "number"
      },
      // parkStatus: {
      //   type: "string",
      //   enum: carStatus,
      //   default: CarStatus.backToCounter
      // },
      // parkId: {
      //   type: "number"
      // },
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
