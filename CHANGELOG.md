# Changelog

Todos los cambios notables a este proyecto serán docuemntados en este archivo.

El formato está basado en [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
y este proyecto adhiere a [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [5.0.0] - 2024-03-01

### Changed

- Downgrade del API de la versión 1.3 a la versión 1.2
- Se actualizó Node.js a la versión 18
- Se agregó timeout configurable a todas las peticiones en la clase Options.
- Se actualizó la librería 'axios' versión '1.6.4' a versión '1.6.5'
- Se actualizó la librería 'jest' versión '27.4.4' a versión '29.7.0'
- Se actualizó la librería 'ts-jest' versión '27.1.1' a versión '29.1.2'
- Se actualizó la librería 'typedoc' versión '0.22.12' a versión '0.25.7'
- Se actualizó la librería 'typescript' versión '4.1.4' a versión '5.3.3'
- Se actualizó la librería '@types/jest' versión '27.0.0' a versión '29.5.11'

## [4.0.0] - 2022-08-29

### Changed

- Se migra el API desde la versión 1.2 a la versión 1.3
- Se mejora el tratamiento de errores, retornando el mensaje 'Unexpected error' en caso de que Transbank no retorne alguno

### Added

- Se agrega los métodos 'increaseAmount', 'increaseAuthorizationDate', 'reversePreAuthorizedAmount', 'deferredCaptureHistory' a las versiones diferidas de WebpayPlus, WebpayPlus Mall, Oneclick Mall, Transaccion Completa y Transaccion Completa Mall
- Se agrega soporte a Patpass Comercio

## [3.0.2] - 2022-04-04

### Changed

- Se actualizó la librería 'minimist' versión '1.2.5' a versión '1.2.6'

## [3.0.1] - 2022-02-23

### Changed

- Se actualizó la librería 'typedoc' versión '0.20.24' a versión '0.22.12'
- Se actualizó la dependencia 'follow-redirects' versión '1.14.7' a versión '1.14.8'

## [3.0.0] - 2021-12-14

### Changed

- Se migra el API desde la versión 1.0 a la versión 1.2
- Ahora el método de retorno al crear la transacción en WebPayPlus debe tener soporte GET (cuando es exitosa) y POST (cuando se retorna sin concluir el ingreso de la tarjeta)
- Ahora el método de retorno al inscribirse en Oneclick Mall debe tener soporte GET (cuando es exitosa) y POST (cuando se retorna sin concluir la inscripción)
- Se actualiza 'axios' hacia la versión '0.21.4'
- Se refactoriza y migra todos los productos desde clases estáticas a clases instanciables
- Se unifica 'Transaction' y 'DeferredTransaction' en WebpayPlus
- Se unifica 'MallTransaction' y 'MallDeferredTransaction' en WebpayPlus y Oneclick Mall
- Se reordenan los parámetros del método capture de WebpayPlus Mall a 'capture(token: string, buyOrder: string, authorizationCode: string, captureAmount: number)'
- Se reordenan los parámetros del método capture de Oneclick Mall a 'capture(childCommerceCode: string, childBuyOrder: string, authorizationCode: string, captureAmount: number)'
- Se reordenan los parámetros del método create de Transacción Completa Mall a 'create(buyOrder: string, sessionId: string, cardNumber: string, cardExpirationDate: string, details: Array, cvv: number | undefined)'

### Added

- Se agrega soporte a Webpay Modal
- Se agregan validaciones de obligatoriedad y tamaño de los parámetros a los métodos de WebpayPlus, Oneclick Mall, Webpay Modal, Transacción Completa
- Se agrega una clase de constantes con los códigos de comercio de integración: 'IntegrationCommerceCodes'
- Se agrega una clase de constantes con las claves de comercio de integración: 'IntegrationApiKeys'

## [2.1.3] - 2021-02-17

### Added

- Se agrega typedoc
- Se agregan métodos de configuración faltantes a Webpay Plus

### Fixed

- Se arregla nombre de parámetro en método de captura diferida en Transaccion Completa

## [2.1.2] - 2021-02-09

### Fixed

- Se arregla despliege en npm

## [2.1.1] - 2021-02-09

### Fixed

- Se arregla el método delete de MallInscription en Oneclick Mall

## [2.1.0] - 2021-02-08

### Added

- Se agrega soporte para Oneclick
- Se agrega soporte para Transaccion Completa

## Fixed

- Se cambia tipo de clases de Transacción dentro del modulo de cada producto para que Intellisense funcione

## [2.0.0] - 2021-01-27

### Removed

- Se quita soporte para SOAP

### Added

- Se agregar soporte para WebpayPlus en su versión REST

## [1.0.3] - 2020-12-23

### Changed

- Se agregan notas de obsolencia a clases SOAP que serán eliminadas en versión 2.0.0
- Se actualizan dependencias

## [1.0.2] - 2020-02-27

### Fixed

- Se arregla configuración de Travis

## [1.0.1] - 2020-02-27

### Added

- Se crea versión inicial del plugin, con soporte para Webpay Plus, Webpay Plus Captura diferida, Webpay OneClick, Webpay Plus Mall.
