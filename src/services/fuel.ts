import { PrismaClient } from "@prisma/client";
import { IAddFuelLog } from "../types/fuel";
import dayjs from "dayjs";

const prisma = new PrismaClient();

const addFuelLog = async (payload: IAddFuelLog) => {
	const { tripId, date, liters, pricePerLiter, totalCost, station, notes } = payload;
	try {
		const fuelLog = await prisma.fuelLog.create({
			data: {
				tripId,
				date: dayjs(date).toISOString(),
				liters,
				pricePerLiter,
				totalCost,
				station,
				notes,
			},
		});
		return fuelLog;
	} catch (error) {
		console.log(error);
		throw new Error((error as Error).message);
	}
};

const getTripFuel = async (tripId: number) => {
	try {
		const fuelLog = await prisma.fuelLog.findMany({ where: { tripId } });
		return fuelLog;
	} catch (error) {
		console.log(error);
		throw new Error((error as Error).message);
	}
};

export { addFuelLog, getTripFuel };

