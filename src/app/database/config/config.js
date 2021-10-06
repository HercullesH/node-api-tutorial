const { config } = require('dotenv');

config();

const connection = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: 'postgres',
		logging: false,
		define: {
			timestamps: true
		},
		timezone: "-03:00"
	}
}

module.exports = connection;

