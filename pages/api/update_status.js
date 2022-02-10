const { connectToDatabase } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
	// switch the methods
	switch (req.method) {
		case "PUT": {
			let update_data = req.body.data.map((item) => {
				return {
					updateOne: {
						filter: {
							_id: new ObjectId(item.id),
						},
						update: {
							$set: {
								status: item.status,
							},
						},
					},
				};
			});
			try {
				// connect to the database
				let { db } = await connectToDatabase();

				// update the published status of the post
				await db
					.collection("students")
					.bulkWrite(update_data);

				return res.json({
					message: "students updated successfully",
					success: true,
				});
			} catch (error) {
				// return an error
				return res.json({
					message: new Error(error).message,
					success: false,
				});
			}
		}
	}
}
