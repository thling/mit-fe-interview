const koaBody = require('koa-body');
const Router = require('koa-router');

const mentors = require('./data/mentors');

const router = new Router();

const schema = { firstName: 'string', lastName: 'string', age: 'number', job: 'string' };

router.get('/mentors/:id?', koaBody(), (ctx) => {
  const id = +ctx.params.id;
  const ret = id ? mentors.find(mentor => mentor.id === id) : mentors;
  ctx.response.status = ret ? 200 : 404;
  if (ret) {
    ctx.response.body = ret;
  }
});

router.post('/mentors', koaBody(), (ctx) => {
  const body = ctx.request.body;
  const id = mentors[mentors.length - 1].id + 1;
  const errors = validateRequest(body);

  ctx.response.type = 'application/json';
  if (errors.length > 0) {
    ctx.response.status = 400;
    ctx.response.body = errors;
  } else {
    const { firstName, lastName, job, age } = body;
    const newMentor = { id, firstName, lastName, age, job };
    mentors.push(newMentor);

    ctx.response.status = 201;
    ctx.response.body = newMentor;
  }
});

router.put('/mentors/:id', koaBody(), (ctx) => {
  const id = +ctx.params.id;
  const body = ctx.request.body;
  const mentor = mentors.find(mentor => mentor.id === id);
  const errors = validateRequest(body, true);

  if (errors.length > 0) {
    ctx.response.status = 400;
    ctx.response.body = errors;
  } else if (!mentor) {
    ctx.response.status = 404;
  } else {
    const { firstName, lastName, job, age } = body;
    mentor.firstName = firstName;
    mentor.lastName = lastName;
    mentor.job = job;
    mentor.age = age;

    ctx.response.status = 204;
  }
});

router.patch('/mentors/:id', koaBody(), (ctx) => {
  const id = +ctx.params.id;
  const body = ctx.request.body;
  const mentor = mentors.find(mentor => mentor.id === id);
  const errors = validateRequest(body, true);

  if (errors.length > 0) {
    ctx.response.status = 400;
    ctx.response.body = errors;
  } else if (!mentor) {
    ctx.response.status = 404;
  } else {
    Object.keys(schema)
        .filter(key => !!body[key])
        .forEach(key => {
          const obj = { [key]: body[key] };
          Object.assign(mentor, obj)
        });
        
    ctx.response.status = 204;
  }
});

function validateRequest(body, typeOnly = false) {
  const errors = [];
  Object.keys(schema).forEach(key => {
    if (!body[key] && !typeOnly) {
      errors.push({
        field: key,
        message: `'${key}' is required`
      });
    } else if (body[key] && typeof body[key] !== schema[key]) {
      errors.push({
        field: key,
        message: `'${key}' must be of type ${schema[key]}; ${typeof body[key]} found.`
      });
    }
  });

  return errors;
}

module.exports = router;