Changelog

# [2.1.0](https://github.com/nuxtus/cli/compare/v2.0.0...v2.1.0) (2024-02-21)


### Bug Fixes

* **deps:** update dependency @directus/sdk to v15 ([7f5954b](https://github.com/nuxtus/cli/commit/7f5954b6fa5c41636292e0cc110e407ef228c921))
* **deps:** update dependency @directus/sdk to v15.0.1 ([d6cff29](https://github.com/nuxtus/cli/commit/d6cff29247790eee4c54f9b2fbbe6a60a1b2dc1f))
* **deps:** update dependency chalk to v5.3.0 ([adcd693](https://github.com/nuxtus/cli/commit/adcd693fafd4bd6ac5b6a29b9c6693c1f0405866))
* **deps:** update dependency commander to v12 ([4b3c98f](https://github.com/nuxtus/cli/commit/4b3c98f2cceb2794809f5b4f1cc4ac0e84d8e827))
* **deps:** update dependency dotenv to v16.4.4 ([8515d39](https://github.com/nuxtus/cli/commit/8515d3912f9a37a46ffdfbdc1fa8bcfb7b2591fd))
* **deps:** update dependency dotenv to v16.4.5 ([02ac021](https://github.com/nuxtus/cli/commit/02ac021ece01c97fb487709da1ffb7c1a8cfcac7))
* **deps:** update dependency figlet to v1.7.0 ([42636d2](https://github.com/nuxtus/cli/commit/42636d27a1901daba723f559ecc5cf7170b16a0c))
* **deps:** update dependency inquirer to v9.2.14 ([3ab924c](https://github.com/nuxtus/cli/commit/3ab924c3f029f4505835359c40200cbb06f29165))
* **deps:** update dependency inquirer to v9.2.15 ([fc9e4d4](https://github.com/nuxtus/cli/commit/fc9e4d4a78348df1c1af88b29260f4a40a0db4bf))
* **deps:** update dependency nunjucks to v3.2.4 ([59a8981](https://github.com/nuxtus/cli/commit/59a898105418b67d35c446372146e64bcbc7ec7c))

# [2.0.0](https://github.com/nuxtus/cli/compare/v1.5.0...v2.0.0) (2022-11-18)


### Features

* :sparkles: Update config to use public nuxtus config items ([676a0d5](https://github.com/nuxtus/cli/commit/676a0d59b58ed39b324e8b529b4b160b212ad972))


### BREAKING CHANGES

* Update to nuxt-module 2.x version configuration credentials

# [1.5.0](https://github.com/nuxtus/cli/compare/v1.4.1...v1.5.0) (2022-09-13)


### Bug Fixes

* **deps:** update dependency chalk to v5 ([33710f7](https://github.com/nuxtus/cli/commit/33710f735b310794d4e6b33034848ceeeb48cc65))

## [1.4.1](https://github.com/nuxtus/cli/compare/v1.4.0...v1.4.1) (2022-09-12)


### Bug Fixes

* **deps:** update dependency inquirer to v9 ([4e52568](https://github.com/nuxtus/cli/commit/4e525687015d43d32b2eb1fd78e0a17b9af27d4d))

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
