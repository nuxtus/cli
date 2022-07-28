# Nuxtus CLI

Automatically create [Nuxt]([https](https://nuxtjs.org/)) pages from [Directus](https://directus.io/) collections.

https://user-images.githubusercontent.com/324026/175452950-46bd51a6-3fd9-441d-80fd-c6bbfaa01929.mp4

Command line interface for the Nuxtus Boilerplate (but can be used by any Nuxt client that has a Directus backend). Would be installed by default as part of [Nuxtus](https://github.com/nuxtus/nuxtus).

## Features

  - Create page stubs for any Directus Collection
  - Create type definitions for all Directus Collections

## Usage

```bash
$ nuxtus [command] [options]
```

> For help `nuxtus help`

For example, to create pages for collections already in Directus:

```bash
$ nuxtus create
```

## Manual install

```bash
$ npm install -g @nuxtus/cli
```

In your Nuxt project create (or edit) your .env file to contain:

```
# Nuxt directus required values
DIRECTUS_URL=http://localhost:8055
NUXT_PUBLIC_DIRECTUS_EMAIL=admin@test.com
NUXT_PUBLIC_DIRECTUS_PASSWORD=password
```

## Development

To watch for changes during development:

```bash
$ npm start <command>
```

### Package

To build the JS:

```bash
$ npm run build
```

To package:

```bash
$ npm run package
```

### Testing

Using [Vitest](https://vitest.dev/). 

```bash
$ npm run test
```