require('dotenv').config()
import "reflect-metadata"

import * as TypeORM from "typeorm";

import { CarPark } from "./modules/carpark/entity"
import { Parking } from "./modules/parking/entity"



function getArgs () {
    const args = {}
    process.argv
        .slice(2, process.argv.length)
        .forEach( arg => {
        // long arg
        if (arg.slice(0,2) === '--') {
            const longArg = arg.split('=');
            const longArgFlag = longArg[0].slice(2,longArg[0].length);
            const longArgValue = longArg.length > 1 ? longArg[1] : true;
            args[longArgFlag] = longArgValue;
        }
        // flags
        else if (arg[0] === '-') {
            const flags = arg.slice(1,arg.length).split('');
            flags.forEach(flag => {
            args[flag] = true;
            });
        }
    });
    return args;
}
const args = getArgs();
async function main(){
    console.log(args);
    let synchronize = false,
    dropSchema = false
    if(args['type'] == 'sync'){
        synchronize =true
    }
    if(args['type'] == 'droptable'){
      dropSchema =true
    }
    const connectionOptions = await TypeORM.getConnectionOptions()
    Object.assign(connectionOptions, {
        synchronize,   // if value == false  and create new db it will don't create
        logger: "advanced-console",
        logging: "all",
        dropSchema,
        charset: "utf8mb4_unicode_ci",
      entities: [ Parking,CarPark]
    })
    try {
    await TypeORM.createConnection(connectionOptions)
    } catch (error) {
      console.log(error)
      console.log("make sure you have set .env variables - see .env.sample")
    }
      switch(args['type']){
        case 'init':  

        break;


      }
      console.log('Okk')
      process.exit()
}
main()