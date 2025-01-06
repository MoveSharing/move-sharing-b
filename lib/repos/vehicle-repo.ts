import { dbClient } from "@/lib/repos/db-client";
import {
  Vehicle,
  VehicleCreateInput,
  VehicleUpdateInput,
} from "@/lib/models";
const client = dbClient.models.Vehicle;

export const vehicleRepo = {
  ...client,
  get: async (imei: string): Promise<Vehicle> => {
    const result = await client.get({ imei });
    if (result.errors) {
      throw new Error(JSON.stringify(result.errors));
    }
    if (!result.data) {
      throw new Error("Failed to get vehicle");
    }
    return result.data;
  },
  create: async (createInput: VehicleCreateInput): Promise<Vehicle> => {
    const result = await client.create(createInput);
    if (result.errors) {
      throw new Error(JSON.stringify(result.errors));
    }
    if (!result.data) {
      throw new Error("Failed to update trip");
    }
    return result.data!;
  },
  update: async (updateInput: VehicleUpdateInput): Promise<Vehicle> => {
    const result = await client.update(updateInput);
    if (result.errors) {
      throw new Error(JSON.stringify(result.errors));
    }
    if (!result.data) {
      throw new Error("Failed to update trip");
    }
    return result.data;
  },

};
