# README

## one liner

Implement addresscheck UI where users can validate their address(es).

## main tasks

1. list features
2. create todo
3. before task: seems ok. not clear on what ui and input should be.
4. solve todos
5. after task: would have planned more

## main features

- check

## thoughs on coding

1. folder(s) from features
2. folders: components, contexts, features, lib, services, types
3. app provider for context in App

## stack

- vite / react / typescript
- context api / reducer
- pnpm
- shadcn/ui + tailwindcss

## requirements

- correctness: focus on basic functionality
- documenation: commenting above functions etc. + readme
- testing: eslint, console and logging. would have: workflow in github when pulling from stage to main -- changes, wcag
- readability: descriptive names for components, variables and functions
- application architecture: feature based setup, even though this is a small project

## questions

- vite: up and running fast
- pnpm: fast
- ci/cd: code in feature branch, pr into stage (deploy to stage.example.com), pr into main (deploy to example.com)
- translation/localization: not experience with this, but would have combined language switcher, placed strings in json files for each language.
- tracking/analytics: not implemented in my solution. for simple public app -> event tagging with tracking script. for larger solutions behind login -> some back-end integration perhaps.
- testing: would have set up vitest and test the api, have not done this

## todo

- [x] install vite + tailwindcss + shadcn/ui
- [x] build ui - use ai (cursor) to style with tailwind
- [x] store secret in env (.env.template in 1Password for local dev)
- [x] Implement addresscheck UI where users can validate their address(es). search + street number
- [x] auto fill cities field
- [x] users should be able to fill in one or more addresses and validate these towards the API.
- [x] github repo and workflow (branches: main, stage, feature branches)
- [x] test api in bruno/postman
- [x] save validated addresses / clear log
- [x] refactor code to clean up file structure
- [x] use context api for state management, many states in this project

## notes

- use `NO` for country code for simplicity in this demo in the api url
- in github i have created a few issues -- and closed them, to reflect that work for a real project should be documented and working with in branches. features would get issue numbers. but for this project i will only create a few issues, then continue the rest of the work in a local dev branch merged into stage, the PR'd into main on github

## future todos

- [ ] responsive layout (would have been in mind from the beginning if it were a "real" project)
- [ ] update the commenting in the code from only "what" the code does to also include "why"
- [ ] improve or change components to wcag compliant ones (shadcnui solves much of this already)
- [ ] fix uppercase letters etc in addresses
- [ ] show loading states with spinners, consider useNavigation in React Router
- [ ] create reusable components for fields in the form -- DRY
- [ ] make scalable solution for street number with more numbers than 100
- [ ] as of now I have simply hidden duplicate `streetNo` items -- find a better solution for items where `duplicateNumberAndEntrance` is `true`. so no floors and households will be missing from search/select
- [ ] include zip number in result to better user experience
- [ ] more testing in a github workflow
- [ ] test api connection with vitest

## time spent

- approx. 30 minutes for initial planning before starting coding
- approx. 6 hours for the rest

## requirements

- node v.20.12 for vite

## installation

- `pnpm i`
- add reference to secrets in `env.template` and run `pnpm run env` or create `.env.local` with variables `VITE_DI_API_KEY`, `VITE_DI_API_URL` and `VITE_DI_REFERER` -- see examples in file
- `pnpm run dev`, then visit http://localhost:5173
