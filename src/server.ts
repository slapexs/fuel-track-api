import express, { Request, Response } from "express";
import "dotenv/config";
import { createTrip, getTripById, getTripList } from "./services/trip";
import { addFuelLog, getTripFuel } from "./services/fuel";

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.json({
		message: "Hello world",
		currentTime: new Date().toUTCString(),
	});
});

// Create trip
app.post("/trip", async (req: Request, res: Response) => {
	const { name, description, startDate, endDate } = req.body;
	try {
		const trip = await createTrip({ name, description, startDate, endDate });
		res.status(201).json({ ...trip });
	} catch (error) {
		res.status(500).json({ message: (error as Error).message });
	}
});

// Add fuel log
app.post("/fuel", async (req: Request, res: Response) => {
	try {
		const fuelLog = await addFuelLog(req.body);
		res.status(201).json({ ...fuelLog });
	} catch (error) {
		res.status(500).json({ message: (error as Error).message });
	}
});

// Get all trip
app.get("/trip", async (req: Request, res: Response) => {
	try {
		const tripList = await getTripList();
		res.json(tripList);
	} catch (error) {
		res.status(500).json({ message: (error as Error).message });
	}
});

// Get trip by id
app.get("/trip/:id", async (req: Request, res: Response) => {
	const tripId = req.params.id;
	try {
		const trip = await getTripById(+tripId);
		if (trip !== null) {
			res.json(trip);
		} else {
			res.status(404).json({ message: `Trip id ${tripId} not found.` });
		}
	} catch (error) {
		res.status(500).json({ message: (error as Error).message });
	}
});

// Get all fuel log by trip id
app.get("/trip/:id/fuel", async (req: Request, res: Response) => {
	const tripId = req.params.id;
	try {
		const trip = await getTripFuel(+tripId);
		if (trip !== null) {
			res.json(trip);
		} else {
			res.json([]);
		}
	} catch (error) {
		res.status(500).json({ message: (error as Error).message });
	}
});

app.listen(port, () => console.log(`Server is running in ${port}`));

