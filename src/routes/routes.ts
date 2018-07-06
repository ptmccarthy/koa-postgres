import * as Router from 'koa-router';
import * as bcrypt from 'bcryptjs';
import * as Joi from 'joi';
import * as passport from 'koa-passport';
import { getRepository } from 'typeorm';

import logger from '../logger';
import { User } from '../entity/user';

const routes = new Router();

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
    const body = ctx.request.body;
    const schema = Joi.object().keys({
      username: Joi.string(),
      password: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string()
    });

    const result = Joi.validate(body, schema);
    if (result.error) {
      logger.error(JSON.stringify(result.error));
      ctx.throw(400, result.error.message);
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(body.password, salt);
    let userEntity = new User();
    Object.assign(userEntity, body, { password: hash });

    userEntity = await getRepository(User).save(userEntity);

    return passport.authenticate('local', {
      successRedirect: '/api/users',
      failureRedirect: '/'
    })(ctx, next);
  })

  .get('/api/users', async (ctx) => {
    ctx.body = await User.find();
  });

export default routes;
