import UserRepository from '../repositories/user.repository';
import ErrorMessage from '../utils/errorMessage';
import { hash, compare } from 'bcrypt';
import { config } from 'dotenv';

config();

class UserService {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async create(user) {
		user.password = await hash(user.password, ~~process.env.SALT);

		return await this.userRepository.create(user);
	}

	async update(changes, filter) {
		const user = await this.userRepository.findByPk(filter);

		if (!user) {
			throw Error(ErrorMessage.notExists('Usuário'));
		}

		return await this.userRepository.update(changes, { id: filter });
	}

	async updatePassword(changes, filter) {
		const user = await this.userRepository.findByPk(filter);

		if (!user) {
			throw Error(ErrorMessage.notExists('Usuário'));
		}

		const comparePassword = await compare(changes.oldPassword, user.password);

		if (!comparePassword) {
			throw Error(ErrorMessage.notExists('Senha inválida'));
		}

		changes.password = await hash(changes.password, ~~process.env.SALT);

		return await this.userRepository.update({ password: changes.password }, { id: filter });
	}

	async destroy(filter) {
		const user = await this.userRepository.findByPk(filter);

		if (!user) {
			throw Error(ErrorMessage.notExists('Usuário'));
		}

		return await this.userRepository.destroy(filter);
	}

	async listAll() {
		return await this.userRepository.listAll();
	}

	async getById(id) {
		const user =  await this.userRepository.findByPk(id);

		return {
			name: user.name,
			userName: user.userName
		};
	}
}

export default UserService;
