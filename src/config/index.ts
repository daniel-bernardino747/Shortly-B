import * as dotenv from 'dotenv'

dotenv.config()

export default {
  databaseURL: process.env.DATABASE_URL,
  port: process.env.PORT,
  hash: process.env.HASH,
  keyJWT: process.env.KEY_JWT,
  timeExpires: process.env.TIME_EXPIRES_IN,
}
