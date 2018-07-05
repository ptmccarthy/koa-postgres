import { createConnection } from 'typeorm';

const db = {

  connect: async () => createConnection(),

};

export default db;
