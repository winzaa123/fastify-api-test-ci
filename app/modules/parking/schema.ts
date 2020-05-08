import{
  ParkStatus
    } from './enum'
const parkStatus =  Object.keys(ParkStatus).map(k => ParkStatus[k])
export const parkSchema = {
  id: { type: "number"  },
  code: { type: "string" },
  status: { type: "string",  enum: parkStatus },
  priority : { type: "number"  },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" }
}

export const listParkSchema = {
  summary: "parks",
  description: "Parking lot",
  response: {
    200: {
      type: "object",
      properties: {
        total: {type:"number"},
        items:{
          type: "array",
          items: parkSchema
        }
      }
    }
  }
}

export const createParkSchema = {
  summary: "Create Park",
  description: "Create Park",
  body: {
    type: "object",
    required: ["code","priority"],
    properties: {
      code: { type: "string"  },
      priority: {type: "number", },
      status: { type: "string",  enum: parkStatus , default: ParkStatus.ready },

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
export const updateParkSchema = {
  summary: "Update Park",
  description: "Update Park",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "number"  }
    }
  },
  body: {
    type: "object",
    required: ["code","priority"],
    properties: {
      code: { type: "string"  },
      priority: {type: "number", },
      status: { type: "string",  enum: parkStatus },

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
