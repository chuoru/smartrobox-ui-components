# @chuoru/smartrobox-ui-components

Vue 3 component library with the SmartRobox look: the brand green `#78BE41`, the Argon Dashboard grays and shadows, and the modal and alert patterns from the SMARTROBOX_BASIC client.

The layout, build and component APIs follow `hats-qibitech-ui-components`. Components are built on [Reka UI](https://reka-ui.com/).

The package requires Vue 3.5. The SMARTROBOX_BASIC client still runs Vue 2.6 with bootstrap-vue, so it cannot import this package until it moves to Vue 3.

## Repository layout

- `components/` is the published package. Source lives in `components/src`, and `vite build` writes `dist/index.es.js`, `dist/style.css` and type declarations.
- `playground/` is a private Vite app with one sample page per component, plus Storybook stories. It imports the library source through the `@smartrobox/ui` alias, so edits show up without a rebuild.

## Install

The package is published to GitHub Packages and is private to the repository's collaborators. Point the scope at the GitHub registry in the consuming project's `.npmrc`, and authenticate with a token that has the `read:packages` scope:

```ini
@chuoru:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
npm install @chuoru/smartrobox-ui-components
```

## Usage

```ts
import { Button, Card, AlertDialog, directives } from '@chuoru/smartrobox-ui-components';
import '@chuoru/smartrobox-ui-components/style.css';

app.use(directives);
```

## Theming

Every color, radius, size and shadow is a CSS custom property declared once in `components/src/style.css` with the `--sr-` prefix. Override a property on `:root` to retheme, for example `--sr-btn-primary-bg`. Add the `dark` class to an ancestor to switch to the dark palette.

`npm run check-tokens -w components` fails when a component references a `--sr-` property that `style.css` does not define. `build` runs it first.

## Development

```bash
npm install
npm run build            # check tokens, type-check, build components/dist
npm run dev              # playground on http://localhost:8085
npm run storybook        # Storybook on http://localhost:6006
npm run test-storybook   # Storybook interaction tests
npm pack -w components   # tarball for local installs
```

## Releasing

1. Bump `version` in `components/package.json` and commit.
2. Tag the commit `v<version>` and push the tag, e.g. `git tag v0.1.0 && git push origin v0.1.0`.

The `Publish package` workflow builds the package and publishes it to GitHub Packages. It fails if the tag does not match `components/package.json`. It can also be started by hand from the Actions tab, which publishes the version in `package.json` on the selected ref.
