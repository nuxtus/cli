Changelog

# [1.4.0](https://github.com/nuxtus/cli/compare/v1.3.0...v1.4.0) (2022-08-30)


### Bug Fixes

* :bug: Catch error on generateStaticToken error ([6632ae5](https://github.com/nuxtus/cli/commit/6632ae5815366af83e0252afd7cdb6a169c4e27d))


### Features

* :sparkles: if token already exists in .env, overwrite it ([0f20489](https://github.com/nuxtus/cli/commit/0f204895dfa9b26e3b6fc731145e76da190ac85a))

# [1.3.0](https://github.com/nuxtus/cli/compare/v1.2.0...v1.3.0) (2022-08-29)


### Bug Fixes

* :bug: save a randomly generated token for Directus use ([7a23a62](https://github.com/nuxtus/cli/commit/7a23a62928a544cf2242f0952f9906ad185ab026))


### Features

* :sparkles: Add some helpful debug messages for token creation ([3b502d6](https://github.com/nuxtus/cli/commit/3b502d66ea76350706e518b28fa71e33a74924c5))

# [1.2.0](https://github.com/nuxtus/cli/compare/v1.1.2...v1.2.0) (2022-08-27)


### Features

* :sparkles: generate static token for admin user to use as auth ([91ccdea](https://github.com/nuxtus/cli/commit/91ccdeaec537587cc8219e5bccf56c60eeb4191d))

## [1.1.2](https://github.com/nuxtus/cli/compare/v1.1.1...v1.1.2) (2022-08-11)


### Bug Fixes

* :bug: Gracefully fail without showing js error. ([60783e0](https://github.com/nuxtus/cli/commit/60783e001194693dc303d94b1ce2c0af6f967780))

## [1.1.1](https://github.com/nuxtus/cli/compare/v1.1.0...v1.1.1) (2022-07-28)


### Bug Fixes

* :bug: import generator as module ([dc6c454](https://github.com/nuxtus/cli/commit/dc6c454614d48265acd8b28a70b395e25d5a0d14))

# [1.1.0](https://github.com/nuxtus/cli/compare/v1.0.7...v1.1.0) (2022-07-21)


### Features

* :sparkles: sync types from Directus collection ([c6dc82a](https://github.com/nuxtus/cli/commit/c6dc82a161c39bbdc99c40fe8185695cfca43075))

## [1.0.7](https://github.com/nuxtus/cli/compare/v1.0.6...v1.0.7) (2022-07-11)


### Bug Fixes

* :bug: singleton template creation now works ([2176747](https://github.com/nuxtus/cli/commit/2176747d72ea7615a83f3141c5557f278de65683))
* :bug: use @nuxtus/generator 1.1.2 ([929aa43](https://github.com/nuxtus/cli/commit/929aa432179dee9f2d970227fb0adc7d0407d7bd))
* :construction_worker: deployment now includes build ([9f01768](https://github.com/nuxtus/cli/commit/9f01768e6926da4b671f15f572cd3ba682abedbd))


# 1.0.6

- Update @directus/sdk to 9.13.0

# 1.0.5

- Add dynamic version number to CLI
- Use @nuxtus/generator instead of hard coded createPage

# 1.0.4

- Export create command for automagically creating pages from collections
- Chalk no longer required for create page generator
- Replace require with import in generator.ts

# 1.0.3

- Rebuild
- Fix bin location

# 1.0.2

- Fix singleton template

# 1.0.1

- Fix location of bin


# 1.0.0

- Initial release