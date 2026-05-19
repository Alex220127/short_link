import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

export default class TokenService {
  signToken = ({ token }) => {
    return jwt.sign(token, JWT_SECRET, { expiresIn: '1h' })
  }

  verifyToken = ({ token }) => {
    return jwt.verify(token, JWT_SECRET)
  }
}
