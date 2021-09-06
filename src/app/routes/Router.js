import UserRouter from './user.route';

class Router {
	constructor() {
		this.userRouter =  new UserRouter();
	}

	setup(app) {
		app.use('/api/users', this.userRouter.setup());
	}
}

export default Router;
