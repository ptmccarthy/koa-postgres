import 'reflect-metadata';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as passport from 'koa-passport';
import * as session from 'koa-session';

import './auth/auth';
import db from './db/db';
import logger from './logger';
import routes from './routes/routes';

const PORT = 3000;

const koa = new Koa();
const router = new Router();

// koa-bodyparser
koa.use(bodyParser());

// koa-session
koa.keys = ['hurf durf'];
koa.use(session({}, koa));

// koa-passport
koa.use(passport.initialize());
koa.use(passport.session());

koa.use(routes.routes());
koa.listen(PORT);
logger.info(`Koa listening on port ${PORT}`);

db.connect()
  .then(() => logger.info('Postgres connected'))
  .catch((error) => logger.error('Failed to connect to postgres', error));
