export default class Repository {
  constructor ({ model }) {
    this.model = model
  }

  create = async ({ entity }) => {
    const result = await this.model.create(entity)

    return this.#toObject({ entity: result })
  }

  get = async ({ query, projection, options = { lean: true } }) => {
    const result = await this.model.findOne(query, projection, options)

    return result && this.#toObject({ entity: result })
  }

  update = async ({ query, update }) => {
    return this.model.updateOne(query, update)
  }

  #toObject = ({ entity }) => {
    try {
      return entity.toObject()
    } catch (error) {
      return entity
    }
  }
}
