import { validationResult } from 'express-validator';
import createError from 'http-errors';

class BaseController {
	verifyRequest(req) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw createError(422, { errors: errors.array() });
		}
	}
}

export default BaseController;
