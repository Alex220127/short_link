import EnumHttpCodes from '../enum/EnumHttpCodes.js'

export default class NotFoundException extends Error {
  constructor ({ message }) {
    super(message)
    this.statusCode = EnumHttpCodes.NOT_FOUND
  }
}
