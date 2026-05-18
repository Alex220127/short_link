import mongoose from 'mongoose'

const { MONGO_CONNECT_STRING } = process.env

export default class Database {
  constructor () {
    isConnecting = null
  }

  connect = async () => {
    if (mongoose.connection.readyState === 1) {
      return mongoose
    }

    if (!isConnecting) {
      this.isConnecting = mongoose.connect(MONGO_CONNECT_STRING, {
        maxPoolSize: 10,
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000
      })
    }

    try {
      await this.isConnecting
    } catch (err) {
      this.isConnecting = null
      throw err
    }

    return mongoose
  }
}
