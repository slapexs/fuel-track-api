import { PrismaClient } from "@prisma/client";
import { ICreateTrip } from "../types/trip";
import dayjs from "dayjs";

const prisma = new PrismaClient();

const createTrip = async ({
  name,
  description,
  startDate,
  endDate,
}: ICreateTrip) => {
  try {
    const trip = await prisma.trip.create({
      data: {
        name,
        description,
        startDate: dayjs(startDate).toISOString(),
        endDate: dayjs(endDate).toISOString(),
      },
    });
    return trip;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};

export { createTrip };
