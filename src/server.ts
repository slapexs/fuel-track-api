import express, { Request, Response } from "express";
import "dotenv/config";
import { createTrip } from "./services/trip";
import { addFuelLog } from "./services/fuel";

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.json({
		message: "Hello world",
		currentTime: new Date().toUTCString(),
	});
});

app.post("/trip", async (req: Request, res: Response) => {
	const { name, description, startDate, endDate } = req.body;
	try {
		const trip = await createTrip({ name, description, startDate, endDate });
		res.status(201).json({ ...trip });
	} catch (error) {
		res.status(500).json({ message: (error as Error).message });
	}
});

app.post("/fuel", async (req: Request, res: Response) => {
	try {
		const fuelLog = await addFuelLog(req.body);
		res.status(201).json({ ...fuelLog });
	} catch (error) {
		res.status(500).json({ message: (error as Error).message });
	}
});

app.listen(port, () => console.log(`Server is running in ${port}`));

