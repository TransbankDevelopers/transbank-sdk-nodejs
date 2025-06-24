[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/transbankdevelopers/transbank-sdk-nodejs)](https://github.com/TransbankDevelopers/transbank-sdk-nodejs/releases/latest)
[![GitHub](https://img.shields.io/github/license/transbankdevelopers/transbank-sdk-nodejs)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/transbankdevelopers/transbank-sdk-nodejs)](https://github.com/TransbankDevelopers/transbank-sdk-nodejs/graphs/contributors)

# Transbank SDK Node.js

Este es el SDK oficial de Transbank para Node.js

### Requisitos:

- Node.js 8+

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

### Detectar vulnerabilidades con `npm`

```bash
# Este comando te permite ver las vulnerabilidades
npm audit

# Este comando te permite reparar las vulnerabilidades
npm audit fix
```

### Compilar
```bash
npm run build
```

### Ejecutar test
```bash
npm run test

# Tests con coverage
npm run test:coverage
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

## Información para contribuir a este proyecto

### Forma de trabajo

- Para los mensajes de commits, nos basamos en las [Git Commit Guidelines de Angular](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits).
- Usamos inglés para los nombres de ramas y mensajes de commit.
- Los mensajes de commit no deben llevar punto final.
- Los mensajes de commit deben usar un lenguaje imperativo y estar en tiempo presente, por ejemplo, usar "change" en lugar de "changed" o "changes".
- Los nombres de las ramas deben estar en minúsculas y las palabras deben separarse con guiones (-).
- Todas las fusiones a la rama principal se deben realizar mediante solicitudes de Pull Request(PR). ⬇️
- Se debe emplear tokens como "WIP" en el encabezado de un commit, separados por dos puntos (:), por ejemplo, "WIP: this is a useful commit message".
- Una rama con nuevas funcionalidades que no tenga un PR, se considera que está en desarrollo.
- Los nombres de las ramas deben comenzar con uno de los tokens definidos. Por ejemplo: "feat/tokens-configurations".

### Short lead tokens permitidos

`WIP` = En progreso.

`feat` = Nuevos features.

`fix` = Corrección de un bug.

`docs` = Cambios solo de documentación.

`style` = Cambios que no afectan el significado del código. (espaciado, formateo de código, comillas faltantes, etc)

`refactor` = Un cambio en el código que no arregla un bug ni agrega una funcionalidad.

`perf` = Cambio que mejora el rendimiento.

`test` = Agregar test faltantes o los corrige.

`chore` = Cambios en el build o herramientas auxiliares y librerías.

`revert` = Revierte un commit.

`release` = Para liberar una nueva versión.

### Creación de un Pull Request

- El PR debe estar enfocado en un cambio en concreto, por ejemplo, agregar una nueva funcionalidad o solucionar un error, pero un solo PR no puede agregar una nueva funcionalidad y arreglar un error.
- El título del los PR y mensajes de commit no debe comenzar con una letra mayúscula.
- No se debe usar punto final en los títulos.
- El título del PR debe comenzar con el short lead token definido para la rama, seguido de ":"" y una breve descripción del cambio.
- La descripción del PR debe detallar los cambios que se están incorporando.
- La descripción del PR debe incluir evidencias de que los test se ejecutan de forma correcta o incluir evidencias de que los cambios funcionan y no afectan la funcionalidad previa del proyecto.
- Se pueden agregar capturas, gif o videos para complementar la descripción o demostrar el funcionamiento del PR.

#### Flujo de trabajo

1. Crea tu rama desde develop.
2. Haz un push de los commits y publica la nueva rama.
3. Abre un Pull Request apuntando tus cambios a develop.
4. Espera a la revisión de los demás integrantes del equipo.
5. Para poder mezclar los cambios se debe contar con 2 aprobaciones de los revisores y no tener alertas por parte de las herramientas de inspección.

### Esquema de flujo con git

![gitflow](https://wac-cdn.atlassian.com/dam/jcr:cc0b526e-adb7-4d45-874e-9bcea9898b4a/04%20Hotfix%20branches.svg?cdnVersion=1324)

## Generar una nueva versión

Para generar una nueva versión, se debe crear un PR (con un título "release: prepare release X.Y.Z" con los valores que correspondan para `X`, `Y` y `Z`). Se debe seguir el estándar [SemVer](https://semver.org/lang/es/) para determinar si se incrementa el valor de `X` (si hay cambios no retrocompatibles), `Y` (para mejoras retrocompatibles) o `Z` (si sólo hubo correcciones a bugs).

En ese PR deben incluirse los siguientes cambios:

1. Modificar el archivo `CHANGELOG.md` para incluir una nueva entrada (al comienzo) para `X.Y.Z` que explique en español los cambios.
2. Modificar el archivo `package.json` y modificar la versión.

Luego de obtener aprobación del PR, debe mezclarse a master e inmediatamente generar un release en GitHub con el tag `vX.Y.Z`. En la descripción del release debes poner lo mismo que agregaste al changelog.

Posterior a la liberación debes mezclar la rama release en develop, finalmente realizar un rebase de la rama develop utilizando como base la rama main.
