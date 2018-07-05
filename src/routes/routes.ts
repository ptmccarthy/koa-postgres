import * as Router from 'koa-router';
import * as bcrypt from 'bcryptjs';
import * as passport from 'koa-passport';
import { getRepository } from 'typeorm';

import logger from '../logger';

import { Car } from '../entity/car';
import { User } from '../entity/user';

const routes = new Router();
const car = new Car();

routes
  .use('*', async (ctx, next) => {
    logger.info(`${ctx.method} ${ctx.request.url} ${JSON.stringify(ctx.request.body)}`);
    return next();
  })

  .use('/api/*', async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
      logger.info('is not auth');
      ctx.redirect('/');
    }

    return next();
  })

  .get('/', async (ctx) => {
    ctx.body = 'you must login';
  })

  .post('/login', async (ctx, next) =>
    passport.authenticate('local', {
      successRedirect: '/api/users',
      failureRedirect: '/'
    })(ctx, next)
  )

  .get('/logout', async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      ctx.session = null;
    }

    ctx.redirect('/');
  })

  .get('/register', async (ctx) => {
    ctx.body = 'register';
  })

  .post('/register', async (ctx, next) => {
    const { username, password, firstName, lastName } = ctx.request.body;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const userRepo = getRepository(User);
    let userEntity = new User();

    userEntity.username = username;
    userEntity.password = hash;
    userEntity.firstName = firstName;
    userEntity.lastName = lastName;

    userEntity = await userRepo.save(userEntity);

    return passport.authenticate('local', {
      successRedirect: '/api/users',
      failureRedirect: '/'
    })(ctx, next);
  })

  .get('/api/users', async (ctx) => {
    ctx.body = await User.find();
  })

  .get('/api/cars', async (ctx) => {
    ctx.body = await Car.find();
  })

  .post('/api/car/create', async (ctx) => {
    const { ...params } = ctx.request.body;

    let newCar = new Car();

    newCar = Object.assign(newCar, params);

    try {
      await newCar.save();
      ctx.status = 200;
    } catch (e) {
      ctx.body = e;
    }
  });

export default routes;
