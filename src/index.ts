import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { note } from './note';

const app = new Elysia()
  .use(swagger())
  .use(note)
  .get('/', () => 'Hello Elysia')
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
