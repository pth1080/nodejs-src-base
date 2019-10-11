import mongoose from 'mongoose'
import config from '../../config'
export default async () => {
  const {
    host,
    port,
    database,
    username,
    password
  } = config.db
  const auth = username && password ? `${username}:${password}@` : ''
  let link = `mongodb://${auth}${host}:${port}/${database}`
  console.log(link)
  await mongoose.connect(
    link, {
      useNewUrlParser: true
    }
  )
}
