# Angular Enterprise Workshop — Nx

The workshop uses Nx, Angular, NgRx and npm. Use Node.js 24 LTS. The workspace was checked with Node 24.22.1 and npm 11.9.0.

## Install and run

```bash
npm ci
npm start
```

The development server uses port 4200 by default. To choose another port:

```bash
npm start -- --port=4300
```

Angular 22.3 and Nx 24 run with Angular CLI 22.2.8 and the 22.2.4 build package. Native Federation needs the 22.2 build line. Newer patches on that line introduce a WebAssembly dependency with conflicting peers. The lockfile records a tree that installs with strict peer checks.

## Workspace

Each application and library has its own `project.json`.

```text
apps/
  shell/
libs/
  domain/
    boarding/
    booking/
    checkin/
  shared/
    core/
    navigation/
    state/
```

`tsconfig.base.json` contains the `@flight-demo/...` source aliases, including the dedicated booking API consumed by boarding. The shell compiles these libraries from source. Individual library packaging is a separate operation from building the application.

```bash
npx nx show projects
npx nx graph
npm run build
npm test
npm run lint
```

`npm test` runs the existing shell, booking and core tests. The other libraries do not currently contain test suites. Run a specific suite with `npx nx test core` or `npm run test:booking`.

## Generate code

Use Nx generators from the workspace root:

```bash
npx nx g @nx/angular:component libs/domain/booking/src/lib/feature-flight/example --style=scss
```

Follow the relevant lab when creating further applications or libraries. The micro-frontend exercise uses `apps/miles`; it is not implemented in the initial workspace.

## External services

The existing demo uses `https://demo.angulararchitects.io/api` for flights and passengers. Montserrat is loaded from Google Fonts (`fonts.googleapis.com` and `fonts.gstatic.com`). These destinations must be reachable for the corresponding live behavior. Local tests use controlled data and do not establish live backend availability.

Keep local secrets in ignored `.env` files. Do not commit credentials.
