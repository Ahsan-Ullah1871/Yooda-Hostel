const { connectToDatabase } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
	// switch the methods
	switch (req.method) {
		case "GET": {
			try {
				// connect to the database
				let { db } = await connectToDatabase();
				// fetch the posts
				const page = req.query.page;

				let posts = page
					? page == 1
						? await db
								.collection("served_list")
								.find({})
								.limit(5)
								.sort({ published: -1 })
								.toArray()
						: await db
								.collection("served_list")
								.find({})
								.skip((page - 1) * 5)
								.limit(5)
								.sort({ published: -1 })
								.toArray()
					: await db
							.collection("served_list")
							.find({})
							.sort({ published: -1 })
							.toArray();
				let total_records = await db
					.collection("served_list")
					.find({})
					.sort({ published: -1 })
					.toArray();
				// return the posts
				return res.json({
					list: JSON.parse(JSON.stringify(posts)),
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
				await db
					.collection("served_list")
					.insertOne(req.body);
				// return a message
				return res.json({
					message: "Post added successfully",
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
				await db.collection("served_list").updateOne(
					{
						_id: new ObjectId(req.body.id),
					},
					{ $set: { ...req.body.data } }
				);

				// return a message
				return res.json({
					message: "Post updated successfully",
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
				await db.collection("served_list").deleteOne({
					_id: new ObjectId(req.query.id),
				});

				// returning a message
				return res.json({
					message: "Post deleted successfully",
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
