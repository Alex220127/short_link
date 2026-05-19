import EnumHttpCodes from '../enum/EnumHttpCodes.js'

export default class ForbiddenException extends Error {
  constructor ({ message }) {
    super(message)
    this.statusCode = EnumHttpCodes.FORBIDDEN
  }
}
