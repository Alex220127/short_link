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

    const requiredPermissions = request.routeOptions.config.permissions
    const hasPermission = validatePermissions(requiredPermissions, token.permissions)

    if (!hasPermission) {
      return reply.code(EnumHttpCodes.FORBIDDEN).send()
    }

    request.auth = {
      credentials: decoded
    }
  } catch (error) {
    return reply.code(EnumHttpCodes.FORBIDDEN).send()
  }
}

const validatePermissions = (requiredPermissions, permissions) => {
  if (permissions.includes('*')) {
    return true
  }

  const userPermissions = new Set(permissions)

  for (const permission of requiredPermissions) {
    const hasExactPermission = userPermissions.has(permission)

    if (hasExactPermission) {
      continue
    }

    const [ action ] = permission.split(':')
    const hasAdminPermission = userPermissions.has(`${action}:*`)

    if (!hasAdminPermission) {
      return false
    }
  }

  return true
}
