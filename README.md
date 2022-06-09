# Nuxtus CLI

Command line interface for the Nuxtus Boilerplate (but can be used by any Nuxt client that has a Directus backend). Would be installed by default as part of [Nuxtus](https://github.com/nuxtus/nuxtus).

## Features

  - Create page stubs for any Directus Collection

## Usage

```bash
$ nuxtus [command] [options]
```

> For help `nuxtus help`

## Manual install

```bash
$ npm install -g @nuxtus/client
```

In your Nuxt project create (or edit) your .env file to contain:

```
# Nuxt directus required values
DIRECTUS_URL=http://localhost:8055
# NUXT_PUBLIC_DIRECTUS_TOKEN=UNSECURE_ACCESS_TOKEN
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