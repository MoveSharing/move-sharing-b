import type {PostConfirmationTriggerHandler} from "aws-lambda";
import {type Schema} from "../../data/resource";
import {Amplify} from "aws-amplify";
import {generateClient} from "aws-amplify/data";
import {getAmplifyDataClientConfig} from '@aws-amplify/backend/function/runtime';
import {env} from "$amplify/env/post-confirmation";
import {logger} from "../../../lib/logger";

const {resourceConfig, libraryOptions} = await getAmplifyDataClientConfig(
    env
);

// @ts-ignore
Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

export const handler: PostConfirmationTriggerHandler = async (event) => {
    try {
        await client.models.User.create({
            email: event.request.userAttributes.email,
            profileOwner: `${event.request.userAttributes.sub}::${event.userName}`,
        });
        logger.info("user created");
        return event;

    } catch (e) {
        logger.error("error creating user", {error: e});
        logger.error("event", event);
    }
    return  true;

};