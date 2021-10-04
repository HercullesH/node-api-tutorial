const { config } = require('dotenv');
config();

const connection = {
	development: {
		username: 'nodeadmin@nodesqlkeyrus',
		password: '@Postgres',
		database: 'node_api',
		host: 'nodesqlkeyrus.postgres.database.azure.com',
		dialect: 'postgres',
		logging: false,
		define: {
			timestamps: true
		},
		timezone: "-03:00"
	}
}

module.exports = connection;

