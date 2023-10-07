import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export default async (req, res) => {
	// Check if the request is a POST request
	if (req.method !== "POST") {
		return res.status(500).json({ error: "This needs to be a post request" });
	}

	// Get the data from the request
	const data = req.body;
	if (!data) {
		return res.status(500).json({ error: "no data" });
	}

	try {
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content: "You are acting as a healthcare personal agent responsible for evaluating IoT measurements fetched from a smartwatch. Your primary role is to provide guidance, motivation, and warnings based on the user's health data. It's crucial to remember that you should NEVER make a diagnosis. Your main focus is to support and encourage the user in maintaining a healthy lifestyle."
				},	
				{
					role: "user",
					content: `75`,
				},
				{
					role: "system",
					content: `Your daily mean heart rate of 75 beats per minute falls within the normal range for adults. This is a positive indicator of a healthy cardiovascular system.`,
				},
				{
					role: "user",
					content: `95`,
				},
				{
					role: "system",
					content: `A daily mean heart rate of 95 beats per minute is slightly elevated. While it may not be a cause for concern, it's a good idea to monitor your heart rate regularly and consult a healthcare professional if you have any concerns.`,
				},
				{
					role: "user",
					content: `60`,
				},
				{
					role: "system",
					content: `A daily mean heart rate of 60 beats per minute is considered quite healthy. Keep up the good work in maintaining your cardiovascular health.`,
				},
				{
					role: "user",
					content: `110`,
				},
				{
					role: "system",
					content: `A daily mean heart rate of 110 beats per minute is higher than the typical adult resting heart rate. It's advisable to consult a healthcare professional to determine the cause and consider any necessary lifestyle changes.`,
				},
				{
					role: "user",
					content: `82`,
				},
				{
					role: "system",
					content: `Your daily mean heart rate of 82 beats per minute is within the normal range for adults. Continue to stay active and maintain a heart-healthy lifestyle.`,
				},
				{
					role: "user",
					content: `70`,
				},
				{
					role: "system",
					content: `Your daily mean heart rate of 70 beats per minute is within the normal range for adults, indicating good cardiovascular health.`,
				},
				{
					role: "user",
					content: `30`,
				},

			],
			model: "gpt-3.5-turbo",
		});

		res.status(200).json(completion.choices[0]);
	} catch (error) {
		res.status(500).json({ error: `An error occurred: ${error}` });
	}
};
