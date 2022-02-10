const { connectToDatabase } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
	// switch the methods
	switch (req.method) {
		case "GET": {
			try {
				// connect to the database
				let { db } = await connectToDatabase();

				const page = req.query.page;
				// fetch the posts
				let students = page
					? page == 1
						? await db
								.collection("students")
								.find({})
								.limit(5)
								.sort({ published: -1 })
								.toArray()
						: await db
								.collection("students")
								.find({})
								.skip((page - 1) * 5)
								.limit(5)
								.sort({ published: -1 })
								.toArray()
					: await db
							.collection("students")
							.find({})
							.sort({ published: -1 })
							.toArray();
				let total_records = await db
					.collection("students")
					.find({})
					.sort({ published: -1 })
					.toArray();
				// return the posts
				return res.json({
					students: JSON.parse(
						JSON.stringify(students)
					),
					total_records: JSON.parse(
						JSON.stringify(total_records)
					).length,
					success: true,
				});
			} catch (error) {
				// return the error
				return res.json({
					message: new Error(error).message,
					success: false,
				});
			}
		}
		case "POST": {
			try {
				// connect to the database
				let { db } = await connectToDatabase();

				// add the post
				await db.collection("students").insertOne(req.body);
				// return a message
				return res.json({
					message: "Student added successfully",
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

		case "PUT": {
			try {
				// connect to the database
				let { db } = await connectToDatabase();

				// update the published status of the post
				await db.collection("students").updateOne(
					{
						_id: new ObjectId(req.body.id),
					},
					{ $set: { ...req.body.data } }
				);

				// return a message
				return res.json({
					message: "student updated successfully",
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

		case "DELETE": {
			try {
				// Connecting to the database
				let { db } = await connectToDatabase();

				// Deleting the post
				await db.collection("students").deleteOne({
					_id: new ObjectId(req.query.id),
				});

				// returning a message
				return res.json({
					message: "student deleted successfully",
					success: true,
				});
			} catch (error) {
				// returning an error
				return res.json({
					message: new Error(error).message,
					success: false,
				});
			}
		}
	}
}
