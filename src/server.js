import 'dotenv/config'
import Fastify from 'fastify'

const { PORT } = process.env

const fastify = Fastify()

fastify.listen({ port: PORT }, () => console.log(`Server running at http://localhost:${PORT}`))