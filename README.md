
# Itunes NextJS

<a name='introduction'></a>
Webapp using ITunes REST API with NextJS in order to solve technical test.

* [Introduction](#introduction)
* [Installation](#installation)
* [Commands](#commands)
* [Folder Structure](#folder-structure)
* [Functionalities](#functionalities)


<a name='installation'></a>
## Installation
This project uses [pnpm](https://pnpm.io/es/) to manage the dependencies, its use is recommended for better compatibility.

<br />
<hr/>

<a name='commands'></a>
## Commands
These are the same basic next js commands or standard

* `pnpm install` - install the dependencies 
* `pnpm dev` - run the app in development mode
* `pnpm build` - build the app for production
* `pnpm start` - run the app in production mode
* `pnpm lint` - run eslint

<br />
<hr/>

<a name='folder-structure'></a>
## Folder Structure

```
.
├── next-env.d.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── public
├── src
 |  ├── components
 |  ├── context
 |  ├── hooks
 |  ├── layout
 |  ├── pages
 |  ├── services
 |  ├── theme
 |  └── utils
├── README.md
└── tsconfig.json
```

<br />
<hr/>

<a name='functionalities'></a>
## Functionalities
- Each page contains SSR, for better SEO optimization. 
- All requests are cached on disk for 24 hours.
- Loader by navigation
- More other default optimizations such as tree shacking, in images and accessibility