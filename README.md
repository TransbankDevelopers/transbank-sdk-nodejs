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

### Detectar vulnerabilidades con `npm`

```bash
# Este comando te permite ver las vulnerabilidades
npm audit

# Este comando te permite reparar las vulnerabilidades
npm audit fix
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

## Información para contribuir

### **Estándares generales**

- Para los commits, seguimos las normas detalladas en [este enlace](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) 👀
- Usamos inglés para los nombres de ramas y mensajes de commit 💬
- Todas las fusiones a la rama principal se realizan a través de solicitudes de Pull Request(PR) ⬇️
- Puedes emplear tokens como "WIP" en el encabezado de un commit, separados por dos puntos (:), por ejemplo: "WIP: este es un mensaje de commit útil ✅"
- Las ramas de nuevas funcionalidades que no han sido fusionada, se asume que no está finalizada⚠️
- Los nombres de las ramas deben estar en minúsculas y las palabras deben separarse con guiones (-) 🔤
- Los nombres de las ramas deben comenzar con uno de los tokens abreviados definidos. Por ejemplo: feat/tokens-configurations 🌿

### **Short lead tokens**

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

#### Flujo de trabajo

1. Crea tu rama desde develop.
2. Haz un push de los commits y publica la nueva rama.
3. Abre un Pull Request apuntando tus cambios a develop.
4. Espera a la revisión de los demás integrantes del equipo.
5. Mezcla los cambios sólo cuando esté aprobado por mínimo 2 revisores.

### Esquema de flujo

![gitflow](https://wac-cdn.atlassian.com/dam/jcr:cc0b526e-adb7-4d45-874e-9bcea9898b4a/04%20Hotfix%20branches.svg?cdnVersion=1324)

### **Reglas** 📖

1. Todo PR debe incluir test.
2. Todo PR debe cumplir con un mínimo de 80% de coverage para ser aprobado
3. El PR debe tener 2 o más aprobaciones para poder mezclarse.
4. Si un commit revierte un commit anterior deberá comenzar con "revert:" seguido del mensaje del commit anterior.

### **Pull Request**

- Usar un lenguaje imperativo y en tiempo presente: "change" no "changed" ni "changes".
- El título del los PR y mensajes de commit no pueden comenzar con una letra mayúscula.
- No se debe usar punto final en los títulos o descripción de los commits.
- El título del PR debe comenzar con el short lead token definido para la rama, seguido de : y una breve descripción del cambio.
- La descripción del PR debe detallar los cambios.
- La descripción del PR debe incluir evidencias de que los test se ejecutan de forma correcta.
- Se pueden usar gif o videos para complementar la descripción o evidenciar el funcionamiento del PR.

## Generar una nueva versión

Para generar una nueva versión, se debe crear un PR (con un título "release: prepare release X.Y.Z" con los valores que correspondan para `X`, `Y` y `Z`). Se debe seguir el estándar [SemVer](https://semver.org/lang/es/) para determinar si se incrementa el valor de `X` (si hay cambios no retrocompatibles), `Y` (para mejoras retrocompatibles) o `Z` (si sólo hubo correcciones a bugs).

En ese PR deben incluirse los siguientes cambios:

1. Modificar el archivo `CHANGELOG.md` para incluir una nueva entrada (al comienzo) para `X.Y.Z` que explique en español los cambios.
2. Modificar el archivo `package.json` y modificar la versión.

Luego de obtener aprobación del PR, debe mezclarse a master e inmediatamente generar un release en GitHub con el tag `vX.Y.Z`. En la descripción del release debes poner lo mismo que agregaste al changelog.

Posterior a la liberación debes mezclar la rama release en develop, finalmente realizar un rebase de la rama develop utilizando como base la rama main.
