import type {Schema} from "@/amplify/data/resource";
// vehicle
export type Vehicle = Schema["Vehicle"]["type"];
export type VehicleUpdateInput = Schema["Vehicle"]["updateType"];
export type VehicleCreateInput = Schema["Vehicle"]["createType"];
export type VehicleEngineStatus = Schema["EngineStatus"]["type"];

// user
export type User = Schema["User"]["type"];
export type UserCreateInput = Schema["User"]["createType"];
export type UserUpdateInput = Schema["User"]["updateType"];

// trip
export type Trip = Schema["Trip"]["type"];
export type TripCreateInput = Schema["Trip"]["createType"];
export type TripUpdateInput = Schema["Trip"]["updateType"];

