import 'dotenv/config'
import dns from 'node:dns'
import Fastify from 'fastify'
import container from './infra/container.js'
import UserRoutes from './interfaces/users/UserRoutes.js'
import FeaturedLinksRoutes from './interfaces/featuredLinks/FeaturedLinksRoutes.js'

dns.setServers([ '8.8.8.8', '1.1.1.1' ])

const { PORT } = process.env

const allRoutes = [ ...UserRoutes, ...FeaturedLinksRoutes ]

const fastify = Fastify()

for (const route of allRoutes) {
  fastify.route(route)
}

await container.database.connect()

fastify.listen({ port: PORT }, () => console.log(`Server running at http://localhost:${PORT}`))
