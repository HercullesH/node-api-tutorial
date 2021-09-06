import BaseController from './base.controller';
import UserService from '../services/user.service';
import _ from 'lodash';

class UserController extends BaseController {
	constructor() {
		super();

		this.userService = new UserService();
		this.getById = this.getById.bind(this);
		this.listAll = this.listAll.bind(this);
		this.create = this.create.bind(this);
		this.update = this.update.bind(this);
		this.destroy = this.destroy.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
	}

	async listAll(req, res, next) {
		try {
			const response = await this.userService.listAll();

			res.json(response);
		} catch (error) {
			return next(error);
		}
	}

	async getById(req, res, next) {
		try {
			const response = await this.userService.getById(req.params.id);

			res.json(response);
		} catch (error) {
			return next(error);
		}
	}

	async create(req, res, next) {
		try {
			this.verifyRequest(req);

			const data = _.pick(req.body, ['name', 'userName', 'password']);
			const response = await this.userService.create(data);

			res.json(response);
		} catch (error) {
			return next(error);
		}
	}

	async update(req, res, next) {
		try {
			this.verifyRequest(req);

			const data = _.pick(req.body, ['name', 'userName']);
			const response = await this.userService.update(data, req.params.id);

			res.json(response);
		} catch (error) {
			return next(error);
		}
	}

	async updatePassword(req, res, next) {
		try {
			this.verifyRequest(req);

			const data = _.pick(req.body, ['oldPassword', 'password']);
			const response = await this.userService.updatePassword(data, req.params.id);

			res.json(response);
		} catch (error) {
			return next(error);
		}
	}

	async destroy(req, res, next) {
		try {
			this.verifyRequest(req);

			const response = await this.userService.destroy(req.params.id);

			res.json(response);
		} catch (error) {
			return next(error);
		}
	}
}

export default UserController;
