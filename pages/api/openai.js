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
					content: `Here is the daily average heart rate of a user, tell me only what you think about it: ${data.averageHeartRate}`,
				},
			],
			model: "gpt-3.5-turbo",
		});

		res.status(200).json(completion.choices[0]);
	} catch (error) {
		res.status(500).json({ error: `An error occurred: ${error}` });
	}
};
