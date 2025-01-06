import {dbClient} from "@/lib/repos/db-client";
import {logger} from "@/lib/logger";
import {UserCreateInput, UserUpdateInput} from "@/lib/models";
import {V6Client} from "@aws-amplify/api-graphql";
import {Schema} from "@/amplify/data/resource";

export const userRepo = (dbClient: V6Client<Schema>) => {
    const client = dbClient.models.User;

    return {
        get: async (id: string) => {
            try {
                const result = await client.get({
                    id,
                });
                if (result.errors) {
                    throw new Error(
                        `Error retriving user: ${JSON.stringify(result.errors)}`
                    );
                }
                return result.data!;
            } catch (error) {
                logger.info(`Error retriving user: ${id}`, {error});
                logger.error(`Error retriving user: ${id}`, {error});
                throw error;
            }
        },
        create: async (createInput: UserCreateInput) => {
            const result = await client.create(createInput);
            if (result.errors) {
                throw new Error(JSON.stringify(result.errors));
            }
            return result.data!;
        },
        update: async (updateInput: UserUpdateInput) => {
            const result = await client.update(updateInput);
            if (result.errors) {
                throw new Error(JSON.stringify(result.errors));
            }
            if (!result.data) {
                throw new Error("Failed to update trip");
            }
            return result.data;
        },
    }

};
