# angular-package

<a href='https://angular-package.dev' target='_blank'>
  <img align="right"  width="92" height="92" src="https://avatars.githubusercontent.com/u/31412194?s=400&u=c9929aa36826318ccac8f7b84516e1ce3af7e21c&v=4" />
</a>

The angular-package supports the development process of [angular](https://angular.io)-based applications in varied ways through the thoughtful, reusable, easy-to-use small pieces of code called packages.

## Indexeddb

Wrapper to IndexedDB client-side storage.

[![Gitter][gitter-badge]][gitter-chat]
[![Discord][discord-badge]][discord-channel]
[![Twitter][twitter-badge]][twitter-follow]

<!-- npm badge -->
[![npm version][indexeddb-npm-badge-svg]][indexeddb-npm-badge]

<!-- GitHub badges -->
[![GitHub issues][indexeddb-badge-issues]][indexeddb-issues]
[![GitHub forks][indexeddb-badge-forks]][indexeddb-forks]
[![GitHub stars][indexeddb-badge-stars]][indexeddb-stars]
[![GitHub license][indexeddb-badge-license]][indexeddb-license]

<!-- Sponsors -->
[![GitHub Sponsors][github-badge-sponsor]][github-sponsor-link]
[![Patreon Sponsors][patreon-badge]][patreon-link]

<br>

Package is **free** to use. If you enjoy it, please consider donating via [fiat](https://docs.angular-package.dev/v/sass/donate/fiat), [Revolut platform](https://checkout.revolut.com/pay/048b10a3-0e10-42c8-a917-e3e9cb4c8e29) or [cryptocurrency](https://spectrecss.angular-package.dev/donate/thb-cryptocurrency) the [@angular-package](https://github.com/sponsors/angular-package) for further development. ♥  

> Feel **free** to submit a pull request. Help is always appreciated.

<br>

## Table of contents

* [Demonstration](#demonstration)
* [Skeleton](#skeleton)
* [Code scaffolding](#code-scaffolding)
* [Example usage](#example-usage)
* [Documentation](#documentation)
  * [IDBConnection](#idbconnection) Class to open connection and create object store.
  * [IDBData](#idbdata) Class with opened connection (IDBConnection), to handle transaction and store.
  * [IDBQuery](#idbquery) Query store with JSON, by method-store or store-method.
  * [IDBStore](#idbstore) Store methods with database connection (IDBData).
  * [IDBConfig](#idbconfig) IDB configuration used in Angular IDBModule.
  * [IDBModule](#idbmodule) Angular Module with indexeddb service.
  * [IDBService](#idbservice) Angular Service with IndexedDB class.
  * [IndexedDB](#indexeddb) Store and query for IndexedDB client-side storage.
* [Changelog](#changelog)
* [Git](#git)
  * [Commit](#commit)
  * [Versioning](#versioning)
* [License](#license)

<br>

## Demonstration

Demonstration available [here](https://github.com/angular-package/indexeddb/tree/main/demo) as Angular 14 starter application.

<br>

## Skeleton

This package was generated by the [skeleton workspace][skeleton] with [Angular CLI](https://github.com/angular/angular-cli) version `14.2.0`.

Copy this package to the `packages/indexeddb` folder of the [skeleton workspace][skeleton] then run the commands below.

<br>

## Code scaffolding

Run `ng generate component component-name --project indexeddb` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project indexeddb`.
> Note: Don't forget to add `--project indexeddb` or else it will be added to the default project in your `angular.json` file.

### Build

Run `ng build indexeddb` to build the project. The build artifacts will be stored in the `dist/` directory.

### Publishing

After building your library with `ng build indexeddb`, go to the dist folder `cd dist/indexeddb` and run `npm publish`.

## Running unit tests

Run `ng test indexeddb` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<br>

## Example usage

Prepare configuration.

```typescript
// config.ts
import { IndexedDB } from "@angular-package/indexeddb";

// Config.
export const IDB_CONFIG = IndexedDB.config({
  name: 'databasename',
  storeNames: ['storename1', 'storename2'],
  store: IndexedDB.store({
    'storename1': {
      keyPath: 'id',
      autoIncrement: false,
      index: [
        { name: "name", keyPath: "name", options: { unique: false } },
      ]
    },
    'storename2': {
      keyPath: "id",
      autoIncrement: true,
      index: [
        { name: "name", keyPath: "name", options: { unique: false } },
        { name: "position", keyPath: "position", options: { unique: false } },
        { name: "weight", keyPath: "weight", options: { unique: false } },
        { name: "symbol", keyPath: "symbol", options: { unique: false } },
      ],
    },
  }),
  version: 1
});
```

Use configuration and initialize database.

```typescript
// example.ts
import { IndexedDB } from "@angular-package/indexeddb";
import { IDB_CONFIG } from './config';

// Initialize.
const indexeddb = new IndexedDB<
  // Create store interface.
  {
    storename1: {
      id: number,
      name: string
    },
    storename2: {
      id: number,
      name: string,
      position: number,
      weight: number,
      symbol: string
    }
  }
>(
  IDB_CONFIG.name,
  IDB_CONFIG.storeNames,
  IDB_CONFIG.store,
  IDB_CONFIG.version
);

// Add by method
indexeddb.query.method({
  'add': {
    'storename2': {
      value: {
        'id': 1,
        'name': 'name',
        'position': 1,
        'symbol': 'N',
        'weight': 100
      },
      'onsuccess': (result) => console.log(result),
      'onerror': (ev) => console.log(`error`, ev),
    }
  }
})

// Get
indexeddb.query.method({
  'get': {
    'storename2': {
      'query': 1,
      'onsuccess': (result => console.log(result)),
      'onerror': () => console.log(`error`)
    },
  }
});

// Add by store
indexeddb.query.store({
  'storename1': {
    'add': {
      'value': {
        'id': 2,
        'name': 'item'
      },
      'onsuccess': (result) => console.log(result) 
    }
  }
})

// Get
indexeddb.query.store({
  'storename1': {
    'get': {
      'query': 2,
      'onsuccess': result => console.log(result)
    }
  }
})
```

<br>

## Documentation

The documentation is in construction and it's available at [https://angular-package.gitbook.io/indexedb](https://angular-package.gitbook.io/indexedb)

### IDBConnection

Class to open connection and create object store.

```typescript
export class IDBConnection<
  Name extends string = string,
  StoreNames extends string | number | symbol = string,
  Version extends number = number
> { ... }
```

[GitHub](https://github.com/angular-package/indexeddb/blob/main/src/lib/idb-connection.class.ts)

### IDBData

Class with opened connection (IDBConnection), to handle transaction and store.

```typescript
export class IDBData<
  Name extends string = string,
  StoreNames extends string | number | symbol = string,
  Version extends number = number,
> { ... }
```

[GitHub](https://github.com/angular-package/indexeddb/blob/main/src/lib/idb-data.class.ts)

### IDBQuery

Query store with JSON, by method-store or store-method.

```typescript
export class IDBQuery<
  StoreSchema extends object,
  Name extends string = string,
  StoreNames extends keyof StoreSchema = keyof StoreSchema,
  Version extends number = number
> { ... }
```

[GitHub](https://github.com/angular-package/indexeddb/blob/main/src/lib/idb-query.class.ts)

### IDBStore

Store methods with database connection (IDBData).

```typescript
export class IDBStore<
  StoreSchema extends object,
  Name extends string = string,
  StoreNames extends keyof StoreSchema = keyof StoreSchema,
  Version extends number = number,
> implements IDBStoreInterface<StoreSchema, StoreNames> {
  ...
}
```

[GitHub](https://github.com/angular-package/indexeddb/blob/main/src/lib/idb-store.class.ts)

### IDBConfig

IDB configuration used in Angular IDBModule.

```typescript
export class IDBConfig<
  Name extends string = string,
  StoreNames extends string | number | symbol = string,
  Version extends number = number
> {
  name?: Name;
  storeNames?: StoreNames | StoreNames[];
  store?: IDBStoreParameters<StoreNames>;
  version?: Version;
};
```

[GitHub](https://github.com/angular-package/indexeddb/blob/main/src/lib/idb.config.ts)

### IDBModule

Angular Module with indexeddb service.

```typescript
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class IDBModule {
  static forRoot(@Optional() @Inject(IDBConfig) config?: IDBConfig): ModuleWithProviders<IDBModule> {
    return {
      ngModule: IDBModule,
      providers: [
        IDBService,
        {provide: IDBConfig, useValue: config, multi: false}
      ]
    }
  }
  static forChild(@Optional() @Inject(IDBConfig) config: IDBConfig): ModuleWithProviders<IDBModule> {
    return {
      ngModule: IDBModule,
      providers: [
        IDBService,
        {provide: IDBConfig, useValue: config, multi: false}
      ]
    };
  }
}
```

[GitHub](https://github.com/angular-package/indexeddb/blob/main/src/lib/idb.module.ts)

### IDBService

Angular Service with IndexedDB class.

```typescript
@Injectable({
  providedIn: "root",
})
export class IDBService<
  StoreSchema extends object,
  Name extends string = string,
  StoreNames extends keyof StoreSchema = keyof StoreSchema,
  Version extends number = number
> {
  ...
}
```

[GitHub](https://github.com/angular-package/indexeddb/blob/main/src/lib/idb.service.ts)

### IndexedDB

Store and query for IndexedDB client-side storage.

```typescript
export class IndexedDB<
  StoreSchema extends object,
  Name extends string = string,
  StoreNames extends keyof StoreSchema = keyof StoreSchema,
  Version extends number = number
> { ... }
```

[GitHub](https://github.com/angular-package/indexeddb/blob/main/src/lib/indexeddb.ts)

<br>

## Changelog

To read it, click on the [CHANGELOG.md][indexeddb-github-changelog] link.

<br>

## GIT

### Commit

* [AngularJS Git Commit Message Conventions][git-commit-angular]
* [Karma Git Commit Msg][git-commit-karma]
* [Conventional Commits][git-commit-conventional]

### Versioning

[Semantic Versioning 2.0.0][git-semver]

**Given a version number MAJOR.MINOR.PATCH, increment the:**

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

<br>

## License

MIT © angular-package ([license][indexeddb-license])

<!-- Funding -->
[github-badge-sponsor]: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/angular-package
[github-sponsor-link]: https://github.com/sponsors/angular-package
[patreon-badge]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dangularpackage%26type%3Dpatrons&style=flat
[patreon-link]: https://www.patreon.com/join/angularpackage/checkout?fan_landing=true&rid=0

[angulario]: https://angular.io
[skeleton]: https://github.com/angular-package/skeleton

<!-- Update status -->
[experimental]: https://img.shields.io/badge/-Experimental-orange
[fix]: https://img.shields.io/badge/-Fix-red
[new]: https://img.shields.io/badge/-eNw-green
[update]: https://img.shields.io/badge/-Update-red
[documentation]: https://img.shields.io/badge/-Documentation-informational
[demonstration]: https://img.shields.io/badge/-Demonstration-green

<!-- Discord -->
[discord-badge]: https://img.shields.io/discord/925168966098386944?style=social&logo=discord&label=Discord
[discord-channel]: https://discord.com/invite/rUCR2CW75G

<!-- Gitter -->
[gitter-badge]: https://img.shields.io/gitter/room/angular-package/ap-sass?style=social&logo=gitter
[gitter-chat]: https://app.gitter.im/#/room/#ap-sass:gitter.im

<!-- Twitter -->
[twitter-badge]: https://img.shields.io/twitter/follow/angularpackage?label=%40angularpackage&style=social
[twitter-follow]: https://twitter.com/angularpackage

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/

<!-- This package: sass  -->
  <!-- GitHub: badges -->
  [indexeddb-badge-issues]: https://img.shields.io/github/issues/angular-package/indexeddb
  [indexeddb-badge-forks]: https://img.shields.io/github/forks/angular-package/indexeddb
  [indexeddb-badge-stars]: https://img.shields.io/github/stars/angular-package/indexeddb
  [indexeddb-badge-license]: https://img.shields.io/github/license/angular-package/indexeddb
  <!-- GitHub: badges links -->
  [indexeddb-issues]: https://github.com/angular-package/indexeddb/issues
  [indexeddb-forks]: https://github.com/angular-package/indexeddb/network
  [indexeddb-license]: https://github.com/angular-package/indexeddb/blob/master/LICENSE
  [indexeddb-stars]: https://github.com/angular-package/indexeddb/stargazers
<!-- This package -->
  [indexeddb-github-changelog]: https://github.com/angular-package/indexeddb/blob/main/CHANGELOG.md

<!-- Package: indexeddb -->
  <!-- npm -->
  [indexeddb-npm-badge-svg]: https://badge.fury.io/js/@angular-package%2Findexeddb.svg
  [indexeddb-npm-badge-png]: https://badge.fury.io/js/@angular-package%2Findexeddb.png
  [indexeddb-npm-badge]: https://badge.fury.io/js/@angular-package%2Findexeddb
  [indexeddb-npm-readme]: https://www.npmjs.com/package/@angular-package/indexeddb#readme

  <!-- GitHub -->
  [indexeddb-github-readme]: https://github.com/angular-package/indexeddb#readme
