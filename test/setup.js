import { sequelize } from '../src/app/database/models/index';

const truncate = (tableName) => {
	return `TRUNCATE TABLE ${tableName} RESTART IDENTITY`;
};

before(async () => {
	await sequelize.query(truncate('users'));
});
