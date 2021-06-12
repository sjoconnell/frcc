# Rendering Parts Client

## Instructions

Start the client

```bash
  npm run start
```

It will listen on port: 3000

```bash
  GET http://localhost:3000/
```

To run test suite

```bash
  npm run test
```

** please ensure the server is running to get parts data. You can find instructions for the server in the root README **

## Features

- The client is created using [Create React App](https://create-react-app.dev/) as it is one of the easiest ways to get a React app started.
- It is styled using the CSS-in-JS library [Emotion](https://emotion.sh/docs/introduction).
  - It allows scoped CSS so we never have naming collisions
  - It allows me to keep my CSS in the same file to avoid context switching
  - makes it easy to remove when the component is no longer needed
- There is no state management library. Being a relatively small app React itself is more than capable of handling state
