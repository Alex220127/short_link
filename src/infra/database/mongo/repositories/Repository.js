export default class Repository {
  constructor ({ model }) {
    this.model = model
  }

  create = async ({ entity }) => {
    const result = await this.model.create(entity)

    return this.#toObject({ entity: result })
  }

  #toObject = ({ entity }) => {
    return entity.toObject()
  }
}
