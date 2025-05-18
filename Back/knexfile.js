// knexfile.js
export default {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'location'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
      extension: 'js',
      loadExtensions: ['.js']
    }
  }
};
