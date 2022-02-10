module.exports = {
	reactStrictMode: true,
	env: {
		MONGODB_URI: process.env.MONGODB_URI,
		DB_NAME: process.env.DB_NAME,
		DEV_URL: process.env.DEV_URL,
	},
};
