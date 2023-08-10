import clientPromise from "./mongodb";

// Get all the users who have the professionnalEmail in their array with all the professionnals emails
export async function getPatients(professionnalEmail) {
	try {
		let client = await clientPromise;
		let db = await client.db();
		let patients = await db
			.collection("users")
			.find({ professionnals: professionnalEmail })
			.toArray();
		return patients;

		// Catch any errors
	} catch (e) {
		console.log("ERROR: " + e);
		return;
	}
}
