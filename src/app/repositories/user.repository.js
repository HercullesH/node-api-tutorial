import { User } from '../database/models/index';

class UserRepository {
	create(user) {
		return User.create(user);
	}

	update(user, filter) {
		return User.update(user, { where: filter });
	}

	findByPk(id) {
		return User.findByPk(id);
	}

	listAll() {
		return User.findAll();
	}

	destroy(id) {
		return User.destroy({ where: { id: id } });
	}
}

export default UserRepository;
