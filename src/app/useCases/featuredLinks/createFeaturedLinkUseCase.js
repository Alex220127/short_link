import EnumMessage from '../../../domain/enum/EnumMessage.js'
import BusinessException from '../../../domain/exceptions/BusinessException.js'

export default class CreateFeaturedLinkUseCase {
  constructor ({ dateService, featuredLinksRepository }) {
    this.dateService = dateService
    this.featuredLinksRepository = featuredLinksRepository
  }

  execute = async ({ body, auth }) => {
    body.created_by = {
      user_id: auth.user_id,
      name: auth.name
    }
    body.ends_at = this.dateService.getUtcDate({ date: body.ends_at })

    const featuredLink = await this.featuredLinksRepository.create({ entity: body })

    if (!featuredLink) {
      throw new BusinessException({ message: EnumMessage.ERROR_CREATE_FEATURED_LINK })
    }

    return { data: featuredLink }
  }
}
