import App from '../src/app.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import ErrorMessage from '../src/app/utils/errorMessage';
const app = new App();
const url = '/api/users';

app.setup();
chai.use(chaiHttp);

describe('Create user', () => {
	it('Creating User', (done) => {
		chai.request(app.app)
			.post(url)
			.send({
				name: 'herculles hendrius',
				userName: 'hercullesblz',
				password: '101010'
			})
			.end((err, res) => {
				chai.expect(res.body.name).to.equal('herculles hendrius');
				chai.expect(res.body.userName).to.equal('hercullesblz');
				chai.expect(res).to.have.status(200);
				done();
			});
	});

	it('Creating Second User', (done) => {
		chai.request(app.app)
			.post(url)
			.send({
				name: 'test 2',
				userName: 'test2',
				password: '123456'
			})
			.end((err, res) => {
				chai.expect(res.body.name).to.equal('test 2');
				chai.expect(res.body.userName).to.equal('test2');
				chai.expect(res).to.have.status(200);
				done();
			});
	});

	it('get User Created', (done) => {
		chai.request(app.app)
			.get(`${url}/1`)
			.send({})
			.end((err, res) => {
				chai.expect(res.body.name).to.equal('herculles hendrius');
				chai.expect(res.body.userName).to.equal('hercullesblz');
				chai.expect(res).to.have.status(200);
				done();
			});
	});

	describe('Create user without fields', () => {
		it('Without userName', (done) => {
			chai.request(app.app)
				.post(url)
				.send({
					name: 'Joao Batista',
					password: '10101010'
				})
				.end((err, res) => {
					chai.expect(res.body[0]).to.equal(ErrorMessage.validatorMessage('userName'));
					chai.expect(res).to.have.status(422);
					done();
				});
		});

		it('Without name', (done) => {
			chai.request(app.app)
				.post(url)
				.send({
					userName: 'batis.10',
					password: '10101010'
				})
				.end((err, res) => {
					chai.expect(res.body[0]).to.equal(ErrorMessage.validatorMessage('Nome'));
					chai.expect(res).to.have.status(422);
					done();
				});
		});

		it('Without password', (done) => {
			chai.request(app.app)
				.post(url)
				.send({
					name: 'Joao Teste',
					userName: 'batis.10'
				})
				.end((err, res) => {
					chai.expect(res.body[0]).to.equal(ErrorMessage.validatorMessage('Senha'));
					chai.expect(res).to.have.status(422);
					done();
				});
		});
	});
});

describe('Update user', () => {
	it('Updating User', (done) => {
		chai.request(app.app)
			.put(`${url}/1`)
			.send({
				name: 'teste world 1',
				userName: 'helloTest'
			})
			.end((err, res) => {
				chai.expect(res.body[0]).to.equal(1);
				chai.expect(res).to.have.status(200);
				done();
			});
	});

	it('get User Updated', (done) => {
		chai.request(app.app)
			.get(`${url}/1`)
			.send({})
			.end((err, res) => {
				chai.expect(res.body.name).to.equal('teste world 1');
				chai.expect(res.body.userName).to.equal('helloTest');
				chai.expect(res).to.have.status(200);
				done();
			});
	});

	describe('Update user without fields', () => {
		it('Without userName', (done) => {
			chai.request(app.app)
				.put(`${url}/1`)
				.send({ name: 'Joao Batista' })
				.end((err, res) => {
					chai.expect(res.body[0]).to.equal(ErrorMessage.validatorMessage('userName'));
					chai.expect(res).to.have.status(422);
					done();
				});
		});

		it('Without name', (done) => {
			chai.request(app.app)
				.put(`${url}/1`)
				.send({ userName: 'batis.10' })
				.end((err, res) => {
					chai.expect(res.body[0]).to.equal(ErrorMessage.validatorMessage('Nome'));
					chai.expect(res).to.have.status(422);
					done();
				});
		});
	});
});

describe('Update user password', () => {
	it('invalid password', (done) => {
		chai.request(app.app)
			.put(`${url}/update-password/1`)
			.send({
				oldPassword: '31231231',
				password: '23010310'
			})
			.end((err, res) => {
				chai.expect(res.body[0]).to.equal(ErrorMessage.notExists('Senha inválida'));
				chai.expect(res).to.have.status(500);
				done();
			});
	});

	it('Updating Password 2', (done) => {
		chai.request(app.app)
			.put(`${url}/update-password/1`)
			.send({
				oldPassword: '101010',
				password: 'test1231'
			})
			.end((err, res) => {
				chai.expect(res.body[0]).to.equal(1);
				chai.expect(res).to.have.status(200);
				done();
			});
	});

	it('Updating Password', (done) => {
		chai.request(app.app)
			.put(`${url}/update-password/1`)
			.send({
				oldPassword: 'test1231',
				password: '101010'
			})
			.end((err, res) => {
				chai.expect(res.body[0]).to.equal(1);
				chai.expect(res).to.have.status(200);
				done();
			});
	});

	describe('Update user password without fields', () => {
		it('Without old password', (done) => {
			chai.request(app.app)
				.put(`${url}/update-password/1`)
				.send({ password: '12335' })
				.end((err, res) => {
					chai.expect(res.body[0]).to.equal(ErrorMessage.validatorMessage('Senha Atual'));
					chai.expect(res).to.have.status(422);
					done();
				});
		});

		it('Without password', (done) => {
			chai.request(app.app)
				.put(`${url}/update-password/1`)
				.send({ oldPassword: '12335' })
				.end((err, res) => {
					chai.expect(res.body[0]).to.equal(ErrorMessage.validatorMessage('Senha'));
					chai.expect(res).to.have.status(422);
					done();
				});
		});
	});
});

describe('get users', () => {
	it('get by id', (done) => {
		chai.request(app.app)
			.get(`${url}/2`)
			.end((err, res) => {
				chai.expect(res.body.name).to.equal('test 2');
				chai.expect(res.body.userName).to.equal('test2');
				chai.expect(res).to.have.status(200);
				done();
			});
	});

	it('get all', (done) => {
		chai.request(app.app)
			.get(url)
			.end((err, res) => {
				chai.expect(res.body.length).to.equal(2);
				chai.expect(res).to.have.status(200);
				done();
			});
	});
});
