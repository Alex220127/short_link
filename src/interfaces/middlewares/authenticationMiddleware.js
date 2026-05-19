import EnumHttpCodes from '../../domain/enum/EnumHttpCodes.js'
import container from '../../infra/container.js'

export default async ({ request, reply, done }) => {
  const auth = request.headers.authorization

  try {
    const bearer = auth.split('Bearer ')[1]
    const decoded = container.tokenService.verifyToken({ token: bearer })
    const token = await container.tokenRepository.get({ query: { _id: decoded.token_id } })

    if (!token) {
      return reply.code(EnumHttpCodes.FORBIDDEN).send()
    }

    request.auth = {
      credentials: decoded
    }

    done()
  } catch (error) {
    return reply.code(EnumHttpCodes.FORBIDDEN).send()
  }
}
