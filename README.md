# 💁‍♂️ Typescript - Koa - GraphQL example project

Quick bare minimum setup for new GraphQL API projects with a bare minimum README file. It's so minimalistic that eating bread with butter seems excessive afterwards 🍞.

### What it includes

- **Typescript + TSLint** setup with pretty default config. Turned off few of the most annoying linting rules.
- Simple **[Koa](https://koajs.com/)** setup with 2 example resources: posts and comments
- Generates schemas automatically from defined models and resolvers (this is quite nifty)
- First few unit tests **([Jest](https://jestjs.io/))** in place that make requests to the Koa app and assert the responses
- **not much more than that** ✨. Not a big fan of huge boilerplate projects.

#### Other small things

- Lets you import stuff with absolute paths i.e. `import model from 'src/features/comments/model'`

## Get started:

```
npm install
npm start
npm run migrate
```

GraphQL queries can be tested by opening `http://localhost:4000/graphql`. Example queries can be found from index.test.ts.

Cheers and happy coding ✌️

## Directory structure

Follows a **model-controller-service** pattern meaning the directory/file structure inside the `features` directory is:

- <feature / resource name e.g. posts>

  - **model.ts** defines all models this feature needs. Models have nasty looking annotations, so [type-graphql](https://github.com/19majkel94/type-graphql) can generate a graphql schema for you. Trust me, maintaining both your TS types and a graphql schema is no fun.

  - **service.ts** - Responsible for _all_ logic related to this feature. It for example handles database calls and connects to 3rd party APIs. These are the only modules that need to know about integrations to other systems. All the input for functions it exposes are assumed to already be validated, so the aspect of "user inputted data" can be left for resolvers. type-graphql has more annotations that you can use for defining restrictions for fields in your models.

  - **resolvers.ts** - Could also be called "controller". Handles how GraphQL queries coming from the user are mapped to service layer calls. This is the last layer that "knows" about GraphQL before the data flows into the services.
