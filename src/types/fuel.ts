import { GasStatusEnum } from "../enums/gasStation";

export interface IAddFuelLog {
	tripId: number;
	date: Date | string;
	liters: number;
	pricePerLiter: number;
	totalCost: number;
	station: GasStatusEnum;
	notes?: string;
}

