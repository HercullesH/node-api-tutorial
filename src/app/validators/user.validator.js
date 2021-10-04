import { body, param } from 'express-validator';
import ErrorMessage from '../utils/errorMessage';

class UserValidator {
	create() {
		return [
			body('name', ErrorMessage.validatorMessage('Nome')).exists().bail().isString(),
			body('userName', ErrorMessage.validatorMessage('userName')).exists().bail().isString(),
			body('password', ErrorMessage.validatorMessage('Senha')).exists().bail().isString()
		];
	}

	update() {
		return [
			body('name', ErrorMessage.validatorMessage('Nome')).exists().bail().isString(),
			body('userName', ErrorMessage.validatorMessage('userName')).exists().bail().isString()
		];
	}

	updatePassword() {
		return [
			body('oldPassword', ErrorMessage.validatorMessage('Senha Atual')).exists().bail().isString(),
			body('password', ErrorMessage.validatorMessage('Senha')).exists().bail().isString()
		];
	}

	getById() {
		return [
			param('id', ErrorMessage.validatorMessage('Id')).exists().bail().isInt()
		];
	}

	destroy() {
		return [
			param('id', ErrorMessage.validatorMessage('ID')).exists().bail().isInt()
		];
	}
}

export default UserValidator;
