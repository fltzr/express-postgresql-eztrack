// import bcrypt from 'bcrypt';
// import request from 'supertest';
// import { getConnection, Repository } from 'typeorm';
// import { App } from '@/app';
// import { CreateUserDto } from '@/features/auth/auth.dto';
// import { UserEntity } from '@/features/auth/auth.entity';
// import { AuthRoute } from '@/features/auth/auth.routes';

// // beforeAll(async () => {
// //   await createConnection(dbConnection);
// // });

// afterAll(async () => {
//   await getConnection().close();
// });

// describe('Testing Auth', () => {
//   describe('[POST] /signup', () => {
//     it('response should have the Create userData', async () => {
//       const userData: CreateUserDto = {
//         email: 'test@email.com',
//         password: 'q1w2e3r4!',
//         username: '',
//         firstname: '',
//         lastname: '',
//         phone: '',
//         birthdate: '',
//         gender: '',
//         address1: '',
//         address2: '',
//         city: '',
//         state: '',
//         zipcode: 0,
//         country: '',
//       };

//       const authRoute = new AuthRoute();
//       const userRepository = new Repository<UserEntity>();

//       userRepository.findOne = jest.fn().mockReturnValue(null);
//       userRepository.save = jest.fn().mockReturnValue({
//         id: 1,
//         email: userData.email,
//         password: await bcrypt.hash(userData.password, 10),
//       });

//       const app = new App([authRoute]);
//       return request(app.getServer()).post(`${authRoute.path}signup`).send(userData).expect(201);
//     });
//   });

//   describe('[POST] /login', () => {
//     it('response should have the Set-Cookie header with the Authorization token', async () => {
//       const userData: CreateUserDto = {
//         email: 'test@email.com',
//         password: 'q1w2e3r4!',
//       };

//       const authRoute = new AuthRoute();
//       const userRepository = new Repository<UserEntity>();

//       userRepository.findOne = jest.fn().mockReturnValue({
//         id: 1,
//         email: userData.email,
//         password: await bcrypt.hash(userData.password, 10),
//       });

//       const app = new App([authRoute]);
//       return request(app.getServer())
//         .post(`${authRoute.path}login`)
//         .send(userData)
//         .expect('Set-Cookie', /^Authorization=.+/);
//     });
//   });

//   // describe('[POST] /logout', () => {
//   //   it('logout Set-Cookie Authorization=; Max-age=0', async () => {
//   //     const authRoute = new AuthRoute();
//   //     const app = new App([authRoute]);

//   //     return request(app.getServer())
//   //       .post(`${authRoute.path}logout`)
//   //       .expect('Set-Cookie', /^Authorization=\;/);
//   //   });
//   // });
// });
