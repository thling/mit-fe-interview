const Koa = require('koa');
const cors = require('@koa/cors');

const router = require('./routes');

const app = new Koa();

app.use(cors({ origin: '*' }));
app.use(router.routes());

app.listen(process.env.PORT || 3001);