import { Elysia, t } from 'elysia';

const app = new Elysia()
  .group('/api', (apiPath) =>
    apiPath
      .get('/id/:id', ({ params: { id } }) => id)
      .post('/mirror', ({ body }) => body, {
        body: t.Object({
          id: t.Number(),
          name: t.String(),
        }),
      })
      .get('*', ({ headers, path, query }) => {
        console.log('hello glob', headers, path, query);
      })
  )
  // .get('/', () => {
  //   console.log('hello');
  //   return 'Hello Elysia';
  // })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
