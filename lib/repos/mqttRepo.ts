import * as mqqtClient from "mqtt";
import { logger } from "@/lib/logger";

import {M2Package} from "@/lib/models/mqtt";
import {vehicleRepo} from "@/lib/repos/vehicle-repo";

const TOPIC_PREFIX = "fgt3/iot.sharingmove.it/";

const TOPIC_SUFFIX = "/set";
export const iotRepo = {
    processM2Package: async (m2Package: M2Package) => {
        if (m2Package.topic.includes("set")) {
            logger.info("Ignoring set package", { m2Package });
            return;
        }
        const imei = iotRepo.extractImei(m2Package.topic);
        const vehicle = await getVehicle(m2Package, imei);
    /*   let vehicleUpdateInput:  UpdateVehicleInput = {
            imei,
        };

        const vehicleHistory: VehicleHistoryCreateInput = {
            imei,
            payload: JSON.stringify(m2Package),
            engineStatus: vehicle.engineStatus,
            location: {
                lat: m2Package.la,
                lon: m2Package.lo,
            },
            battery: m2Package.soc,
            dateTime:
                m2Package.gtc !== "Un"
                    ? new Date(m2Package.gtc).toISOString()
                    : new Date().toISOString(),
            speedStatus: vehicle.speedStatus,
        };
        vehicleUpdateInput.location = vehicleHistory.location;
        vehicleUpdateInput.batteryLevel = m2Package.soc;

        const vehicleEngineInfo = parseScost(m2Package.Scost);
        logger.info("processing package", {
            imei,
            vehicleEngineInfo,
            m2Package,
            vehicle,
        });
        if (vehicleEngineInfo.elock === 1) {
            vehicleHistory.engineStatus = 'STARTED';
            vehicleUpdateInput.engineStatus =EngineStatus.STARTED;
            // Vehicle is on trip
            if (
                vehicle.status === 'ON_TRIP' &&
                vehicle.engineStatus !== 'STARTED'
            ) {
                vehicleUpdateInput.engineStatus = EngineStatus.STARTED;
                if (
                    vehicle.activeTripId !== undefined &&
                    vehicle.activeTripId !== null &&
                    vehicle.activeTripId !== ""
                ) {
                    const t = await tripRepo.get(vehicle.activeTripId);
                    const updateTripInput: TripUpdateInput = {
                        id: t.id,
                        status: 'OPENED',
                        startTripDateTime:
                            t.startTripDateTime === undefined || t.startTripDateTime === null
                                ? new Date().toISOString()
                                : t.startTripDateTime,
                        paymentStatus: 'PENDING',
                    };
                    logger.info("Opening trip", {
                        tripId: t.id,
                        vehicleId: vehicle.imei,
                    });
                    await tripRepo.update(updateTripInput);
                } else {
                    // non c'è orsa aperta
                    await iotRepo.closeVehicle(imei);
                }
            }
            if (
                vehicle.status !== 'ACTIVE' &&
                vehicle.activeTripId === undefined
            ) {
                vehicleUpdateInput.status = VehicleStatus.ACTIVE;
            }
        } else {
            vehicleHistory.engineStatus = 'STOPPED';
            vehicleUpdateInput.engineStatus = EngineStatus.STOPPED;
            if (
                vehicle.status === 'ON_TRIP' &&
                vehicle.engineStatus !== 'STOPPED'
            ) {
                vehicleUpdateInput.engineStatus = EngineStatus.STOPPED;
                if (vehicle.activeTripId) {
                    const t = await tripRepo.get(vehicle.activeTripId);
                    switch (t.status) {
                        case 'OPENED': {
                            const updateTripInput: TripUpdateInput = {
                                id: t.id,
                                status:
                                    t.startTripDateTime === undefined
                                        ? 'CANCELED'
                                        : 'COMPLETED',
                            };
                            await tripRepo.update(updateTripInput);
                            vehicleUpdateInput = {
                                ...vehicleUpdateInput,
                                status: VehicleStatus.ACTIVE,
                                activeTripId: undefined,
                            };
                            break;
                        }
                    }
                }
            }
        }
        try {
            await vehicleRepo.update(vehicleUpdateInput);
            await vehicleHistoryRepo.create(vehicleHistory);
        } catch (error) {
            logger.error("Error creating vehicle history", {
                error,
                vehicleHistory,
                vehicleUpdateInput,
                imei,
                m2Package,
                scost: parseScost(m2Package.Scost),
            });
            throw error;
        }
        */
    },

    // Function to extract IMEI
    extractImei: (topic: string) => {
        const parts = topic.split("/");
        // Assuming the IMEI is always the third segment
        return parts.length > 2 ? parts[2] : "";
    },
    sendCommand: async (imei: string, command: object) => {
        const topic = `${TOPIC_PREFIX}${imei}${TOPIC_SUFFIX}`;
        let client = undefined;
        try {
            client = await mqqtClient.connectAsync("mqtt://38.242.198.37:1883");
            logger.info("Sending command", { topic, command });
            const send = await client.publishAsync(topic, JSON.stringify(command));
            logger.info("Command sent", { send });
        } catch (error) {
            logger.error("Error sending command", error);
        } finally {
            if (client) {
                await client.endAsync();
                logger.info("Client ended");
            }
        }
    },
    sendAlarm: async (imei: string) => {
        await iotRepo.sendCommand(imei, {
            iotalarm: 1,
        });
    },
    openVehicle: async (imei: string) => {
        await iotRepo.sendCommand(imei, {
            elock: 1,
            lights: 1,
        });
    },
    closeVehicle: async (imei: string) => {
        logger.info("Closing vehicle", { imei });
        await iotRepo.sendCommand(imei, {
            elock: 0,
            lights: 0,
        });
    },
}


const getVehicle = async (m2Package: M2Package, imei: string) => {
    let vehicle;
    try {
        vehicle = await vehicleRepo.get(imei);
    } catch {
        logger.info("Vehicle not found, creating new vehicles");
        vehicle = await vehicleRepo
            .create({
                imei,
                engineStatus: "STOPPED",
                plate: imei,
                location: {
                    lat: m2Package.la,
                    lon: m2Package.lo,
                },
            })
            .catch((error) => {
                logger.error("Error creating vehicle", error);
            });
    }

    if (!vehicle) {
        throw new Error("Vehicle not found, and cannot be created");
    }
    return vehicle;
};
