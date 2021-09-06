class HandleError {
	static mountError(error) {
		if (error.errors) {
			return error.errors.map((error) => error.msg);
		}

		if (error.message) {
			return [error.message];
		}

		return ['Algum erro aconteceu, tente novamente mais tarde.'];
	}

	// eslint-disable-next-line no-unused-vars
	static handleError(error, req, res, next) {
		const errors = HandleError.mountError(error);

		res.status(error.status || 500);
		res.json(errors);
	}

	static handle404Error(req, res) {

		res.status(404);
		res.json(['Não encontrado']);
	}
}

export default HandleError;
