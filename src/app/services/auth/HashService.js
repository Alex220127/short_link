import bcrypt from 'bcrypt'

const SALT = 10

export default class HashService {
  createHash = ({ content }) => {
    return bcrypt.hashSync(content, SALT)
  }

  compareHash = ({ hash, content }) => {
    return bcrypt.compareSync(content, hash)
  }
}
