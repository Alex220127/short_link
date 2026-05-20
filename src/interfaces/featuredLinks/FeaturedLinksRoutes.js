import Schema from './FeaturedLinksSchema.js'
import FeaturedLinksController from './FeaturedLinksController.js'
import validateContract from '../middlewares/validateContract.js'
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js'

export default [
  {
    url: '/featured-links',
    method: 'POST',
    handler: FeaturedLinksController.createFeaturedLink,
    config: {
      scope: [ 'admin' ],
      permissions: [
        'featured_links:create'
      ]
    },
    preHandler: async (request, reply, done) => {
      await authenticationMiddleware({ request, reply, done })
      await validateContract({ request, reply, done, contract: Schema.createFeaturedLink })
    }
  }
]
