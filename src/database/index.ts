import { DataSource } from 'typeorm'

import config from '../config/index.js'

const database = config.database
const entities = database.entities as string
const migrationsDir = database.migrationsDir as string

const AppDataSource = new DataSource({
  type: 'postgres',
  host: database.host,
  port: Number(database.port),
  username: database.user,
  password: database.password,
  database: database.name,
  entities: [entities],
  migrations: [migrationsDir],
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })

// import pkg from 'pg'
// import config from '../config/index.js'

// const { Pool } = pkg
// const connection = new Pool({
//   connectionString: config.database.urlDatabase,
// })

// export default connection
