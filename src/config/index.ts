import dotenv from 'dotenv'

dotenv.config()

export default {
  databaseURL: process.env.DATABASE_URL,
  database: {
    host: process.env.TYPEORM_HOST,
    user: process.env.TYPEORM_USER,
    password: process.env.TYPEORM_PASS,
    port: process.env.TYPEORM_PORT,
    name: process.env.TYPEORM_DATABASE,
    entities: process.env.TYPEORM_ENTITIES,
    migrations: process.env.TYPEORM_MIGRATIONS,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
}
