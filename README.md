# MentorInTech Front End Interview Coding Exercise

In this coding exercise, you will be completing 4 tasks (3 + 1 option), most of them will be working with the file at `src/MentorAction.tsx`:

1. Display the mentor with id 2
2. Make form that creates a mentor and send it to server
3. Make a form that updates mentor data and send it to server
4. [Optional] Automatically refresh the mentor list after task 2 or task 3 finished sending request

Don't worry too much about CSS styles, but do keep in mind coding styles and organisation.

You will work with an already-scaffolded React app, which can be downloaded from here: https://drive.google.com/open?id=1hhu3kcOUmhISqqhMo7m1De0ONU7RrKcK

# Data Type

You will mostly work with type `Mentor`:

```typescript
interface Mentor {
  firstName: string,
  lastName: string,
  age: number,
  job: string
}
```

# API Endpoint

The endpoint to the server API is already given in the file as `endpoint` variable:

```javascript
const endpoint = 'https://mit-fe-interview.herokuapp.com/mentors';
```

The endpoint supports `GET`, `POST`, `PUT`, and `PATCH` request methods:

- `GET /mentors` - returns a list of mentors
- `GET /mentors/[id]` - returns a mentor matching `id`
- `POST /mentors` - creates mentor; requires body to be of type `Mentor` (see above)
- `PUT /mentors/[id]` - updates mentor with ID `id`; body should contain one or more of the fields in type `Mentor`
- `PATCH /mentors/[id]` - patches mentor with ID `id`; body should contain one or more of the fields in type `Mentor`

# Sending Request

The React app comes with [Axios](https://github.com/axios/axios#example) for sending requests, but feel free to `npm install` whichever library you are most comfortable with (such as jQuery). You can also choose to use the new `fetch` API if you wish.

If you choose to use Axios, all of its response will be a Promise resolving to an object containing a `data` property. This `data` property the JSON body from the server.
