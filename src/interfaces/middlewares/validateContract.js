export default ({ request, reply, done, contract }) => {
  const validationKeys = Object.keys(contract.describe().keys)
  const toValidate = {}

  for (const key of validationKeys) {
    toValidate[key] = request[key]
  }

  const { error, value } = contract.validate(toValidate)

  if (error) {
    return reply.code(400).send(error.details)
  }

  for (const key of validationKeys) {
    request[key] = value[key]
  }

  done()
}
