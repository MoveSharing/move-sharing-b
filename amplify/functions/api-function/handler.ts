import type {APIGatewayProxyHandler} from "aws-lambda";
import {getAmplifyDataClientConfig} from "@aws-amplify/backend/function/runtime";
import {Amplify} from "aws-amplify";
import {env} from "$amplify/env/api-function";

const {resourceConfig, libraryOptions} = await getAmplifyDataClientConfig(
    env
);

Amplify.configure(resourceConfig, libraryOptions);
import {logger} from "../../../lib/logger";
import {generateClient} from "aws-amplify/data";
import {Repos} from "@/lib/repos/repos";
import {Schema} from "@/amplify/data/resource";

const client = generateClient<Schema>();
new Repos(client);


export const handler: APIGatewayProxyHandler = async (event) => {
 //   logger.info("Event: ", event);
    const resource = event.resource
    switch (resource) {
        case "/vehicle/start":
            /**
             * 1- get user
             * 2- check if same vehilce
             * 3- check if vehicle is already in use
             * 4- send start command to vehicle
             */
            try {
                const {userId, vehicleId} = JSON.parse(event.body!);
                logger.info("start trip for user: ", userId);
                const user = await (new Repos(undefined)).user.get(userId);
                const response = {
                    statusCode: 200,
                    body: JSON.stringify({message: "Hello from myFunction!", user}),
                }
                logger.info("User: ", response);
                return response;
            } catch (error) {
                logger.error(error);
                console.log(error);
                return {
                    statusCode: 400,
                    body: JSON.stringify({message: "Error from myFunction!", error: JSON.stringify(error)}),
                }
            }
        case "/vehicle/stop":
            return {
                statusCode: 404,
                // Modify the CORS settings below to match your specific requirements
                headers: {
                    "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                    "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
                },
                body: JSON.stringify("Hello from myFunction!"),
            };

        default:
            return {
                statusCode: 404,
                // Modify the CORS settings below to match your specific requirements
                headers: {
                    "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                    "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
                },
                body: JSON.stringify("Hello from myFunction!"),
            };
    }


    /**
     * 1- get user
     * 2- check if same vehilce
     * 3- check if vehicle is already in use
     * 4- send stop command to vehicle
     * 5- end trip
     */


    /**
     *  1- send command to vehicle (start -> mqtt server)
     *  2- vehicle recives command and sends response
     *  3- function listens to mqtt server and gets response
     *  4- update vehicle status
     *  5- start trip
     *
     */


};