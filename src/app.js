const Koa = require('koa');

const router = require('./routes');

const app = new Koa();

app.use(async (ctx, next) => {
  const url = ctx.request.url;
  if (url.startsWith('/c')) {
    ctx.request.url = url.substring(2);
    ctx.response.headers['Access-Control-Allow-Origin'] = 'https://arbitrary.com';
  }

  await next();
})

app.use(router.routes());

app.listen(process.env.PORT || 3000);