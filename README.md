# jsdock

your favorite way to build & publish JSDoc API docs.

a zero conf CLI to give you well styled docs and a publish to gh-pages. stop thinking about it. just write JSDoc and let jsdock do the rest.

## install

`npm install --save-dev jsdock`

## example

- you write a library with JSDoc
- you run `jsdock build` and `jsdoc publish`

```json5
// package.json
{
  "scripts": {
    "docs:clean": jsdock clean,
    "docs:build": jsdock build, // builds to docs/ dir in project root
    "docs:publish": jsdoc publish // publish to <user>.github.io/<project>
  }
}
```

## api

see the [api docs](https://cdaringe.github.io/jsdock).
