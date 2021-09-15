# Visioncraft test assignment
## Preview

Preview the example live on [Vercel](https://visioncraft.vercel.app/):
## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSylchi%2Fvisioncraft-test-assignment&env=SECRET_COOKIE_PASSWORD,MONGO_URI)

## How to use

Clone the repository and run

```bash
npm install
# or
yarn
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Testing

You will need to have the environment variables MONGO_URI and SECRET_COOKIE_PASSWORD set in the .env.development.local file. These enviroment variables are required for github workflow testing too. Then you can run the following commands

- Jest

```bash
npm run test
# or
yarn test
```

- E2E

```bash
npm run e2e
# or
yarn e2e
```

### Todo
- Clear test database after test runs