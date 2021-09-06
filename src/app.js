import express from 'express';
import cors from 'cors';
import HandleError from './app/middlewares/handle-error';
import Router from './app/routes/Router';

class App {
	constructor() {
		this.router = new Router();
		this.app = express();
	}

	setup() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors({ origin: '*' }));
		this.router.setup(this.app);
		this.app.use(HandleError.handleError);
		this.app.use(HandleError.handle404Error);

		// eslint-disable-next-line no-console
		this.app.listen(3000, () => { console.log('running'); });
	}
}

export default App;
