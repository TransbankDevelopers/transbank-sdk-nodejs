[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/transbankdevelopers/transbank-sdk-nodejs)](https://github.com/TransbankDevelopers/transbank-sdk-nodejs/releases/latest)
[![GitHub](https://img.shields.io/github/license/transbankdevelopers/transbank-sdk-nodejs)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/transbankdevelopers/transbank-sdk-nodejs)](https://github.com/TransbankDevelopers/transbank-sdk-nodejs/graphs/contributors)
[![Build Status](https://travis-ci.org/TransbankDevelopers/transbank-sdk-nodejs.svg?branch=master)](https://travis-ci.org/TransbankDevelopers/transbank-sdk-nodejs)
# Transbank SDK Node.js

Este es el SDK oficial de Transbank para Node.js 

## Requisitos:

- Node.js 8+

# Instalación

### Instalar con `npm`

Puedes instalar SDK en tu proyecto usando NPM
```bash
npm install transbank-sdk 
```

### Instalar con `yarn`
ó también instalarlo usando [Yarn](https://yarnpkg.com/)
```bash
yarn add transbank-sdk 
```

## Documentación 

Puedes encontrar toda la documentación de cómo usar este SDK en el sitio [www.transbankdevelopers.cl](https://www.transbankdevelopers.cl).

La documentación relevante para usar este SDK es:

- Documentación general sobre los productos y sus diferencias:
  [Webpay](https://www.transbankdevelopers.cl/producto/webpay).
- Documentación sobre [ambientes, deberes del comercio, puesta en producción,
  etc](https://www.transbankdevelopers.cl/documentacion/como_empezar#ambientes).
- Primeros pasos con [Webpay](https://www.transbankdevelopers.cl/documentacion/webpay).
- Referencia detallada sobre [Webpay](https://www.transbankdevelopers.cl/referencia/webpay)

## Información para contribuir y desarrollar este SDK

### Requerimientos
- Node.js +8
- Plugin de editorconfig para tu editor favorito.

### Estándares

- Para los commits respetamos las siguientes normas: https://chris.beams.io/posts/git-commit/
- Usamos ingles, para los mensajes de commit.
- Se pueden usar tokens como WIP, en el subject de un commit, separando el token con `:`, por ejemplo:
`WIP: This is a useful commit message`
- Para los nombres de ramas también usamos inglés.
- Se asume, que una rama de feature no mezclada, es un feature no terminado.
- El nombre de las ramas va en minúsculas.
- Las palabras se separan con `-`.
- Las ramas comienzan con alguno de los short lead tokens definidos, por ejemplo: `feat/tokens-configuration`

#### Short lead tokens
##### Commits
- WIP = Trabajo en progreso.
##### Ramas
- feat = Nuevos features
- chore = Tareas, que no son visibles al usuario.
- bug = Resolución de bugs.

### Todas las mezclas a master se hacen mediante Pull Request.

### Test
Para ejecutar los test localmente debes ejecutar los siguientes comandos en una terminal.

```bash
npm install # si es que no se han instaldo todavía
npm run test
```

### Deploy de una nueva versión.
Para generar una nueva versión, se debe crear un PR (con un título "Prepare release X.Y.Z" con los valores que correspondan para `X`, `Y` y `Z`). Se debe seguir el estándar semver para determinar si se incrementa el valor de `X` (si hay cambios no retrocompatibles), `Y` (para mejoras retrocompatibles) o `Z` (si sólo hubo correcciones a bugs).

En ese PR deben incluirse los siguientes cambios:

1. Modificar el archivo `CHANGELOG.md` para incluir una nueva entrada (al comienzo) para `X.Y.Z` que explique en español los cambios **de cara al usuario del SDK**.
2. Modificar el archivo `package.json` para que la propiedad `"version"` apunte a la nueva versión `X.Y.Z`

Luego de obtener aprobación del pull request, debe mezclarse a master e inmediatamente generar un release en GitHub con el tag `X.Y.Z`. En la descripción del release debes poner lo mismo que agregaste al changelog.

Con eso Travis CI generará automáticamente una nueva versión de la librería y la publicará en npm.

### Vulnerabilidades de seguridad
Si descubres una falla de seguridad dentro de este proyecto, por favor, notifícanos por correo electrónico a transbankdevelopers@continuum.cl. Tomaremos el caso con la mayor celeridad. 
