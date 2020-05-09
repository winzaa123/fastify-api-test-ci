import { ParkStatus } from "./enum";
import { CarSize } from "../carpark/enum";
const parkStatus = Object.keys(ParkStatus).map((k) => ParkStatus[k])
, parkSize = Object.keys(CarSize).map((k) => CarSize[k])

export const parkSchema = {
  id: { type: "number" },
  code: { type: "string" },
  status: { type: "string", enum: parkStatus },
  parkSize: { type: "string", enum: parkSize },
  priority: { type: "number" },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

export const listParkSchema = {
  summary: "list parks",
  description: "API Search Parking lot",
  body: {
    type: "object",
    // required: [],
    properties: {
      code: { type: "string"  , nullable: true, default: null},
      counterPark: { type: "number" },
      parkStatus: { type: ["string","null"], nullable: true, default: null },
      parkSize: { type: ["string","null"], nullable: true, default: null },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        total: { type: "number" },
        items: {
          type: "array",
          items: {type: "object" , properties:parkSchema},
        },
      },
    },
  },
};

export const createParkSchema = {
  summary: "Create Park",
  description: "Create Park",
  body: {
    type: "object",
    required: ["code", "priority"],
    properties: {
      code: { type: "string" },
      priority: { type: "number" },
      status: { type: "string", enum: parkStatus, default: ParkStatus.ready },
      parkSize: { type: "string", enum: parkSize, default: CarSize.small },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "boolean" },
        msg: { type: "string" },
      },
    },
  },
};
export const updateParkSchema = {
  summary: "Update Park",
  description: "Update Park",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "number" },
    },
  },
  body: {
    type: "object",
    required: ["code", "priority"],
    properties: {
      code: { type: "string" },
      priority: { type: "number" },
      status: { type: "string", enum: parkStatus, default: ParkStatus.ready },
      parkSize: { type: "string", enum: parkSize ,default:CarSize.small },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "boolean" },
        msg: { type: "string" },
      },
    },
  },
};


export const availableParkSchema = {
  summary: "Available parks",
  description: "available park all",
  response: {
    200: {
      type: "object",
      properties: {
        total: { type: "number" },
        sTotal: { type: "number" },
        mTotal: { type: "number" },
        lTotal: { type: "number" },

      },
    },
  },
};
export const availableBySizeParkSchema = {
  summary: "Available parks by size",
  description: "available park by size",
  params: {
    type: "object",
    required: ["size"],
    properties: {
      size: { type: "string" , enum: parkSize },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        total: { type: "number" },
        available: { type: "number" },
      },
    },
  },
};