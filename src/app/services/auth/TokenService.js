import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

export default class TokenService {
  signToken = ({ token }) => {
    // console.log({ JWT_SECRET })
    return jwt.sign(token, JWT_SECRET, { expiresIn: '1h' })
  }
}
