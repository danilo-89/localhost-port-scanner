## <img src="./readme/icon.png" width="15" height="15" /> Localhost Port Scanner

The 'Localhost Port Scanner' is a network utility tool developed with Electron. It is designed to assist users in scanning a custom range of network ports, checking their status, and optionally terminating processes associated with specific ports.

![app preview](./readme/screenshot-scanning-finished.png)

Features:

-   Custom Port Range Scanning: Users can specify a custom range of ports to scan.
-   Port information: The scanned port information provides details about the status and accessibility of network ports
-   Port Killing: Users can try to terminate network connections on selected ports.
-   Localhost IP Address Retrieval: The app can retrieve and display the IPv4 address of the localhost.

![app preview](./readme/screenshot-scanning-in-progress.png)

## Used Technologies, Libraries, and Resources

-   [Electron Forge](https://www.electronforge.io/): A framework for building Electron applications.
-   [Vite](https://vitejs.dev/): A fast development build tool for JavaScript and TypeScript projects.
-   [React](https://reactjs.org/): A JavaScript library for building user interfaces.
-   [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript.
-   [kill-port](https://www.npmjs.com/package/kill-port): A Node.js library for killing processes associated with a specific port.
-   [zod](https://github.com/colinhacks/zod): A TypeScript-first schema validation library.
-   [@tanstack/react-table](https://tanstack.com/table): A lightweight and extensible data table library for React.
-   [react-hook-form](https://react-hook-form.com/): A library for managing forms in React applications.
-   [clsx](https://www.npmjs.com/package/clsx): A utility for constructing CSS class strings.
-   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom user interfaces.
-   [Hero Icons](https://heroicons.com/): A set of free, MIT-licensed high-quality SVG icons.
-   Some images used in this project are sourced from [publicdomainvectors.org](https://publicdomainvectors.org/), a valuable resource for public domain vector graphics.

## Running Locally

1. Clone project locally
2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start Electron app

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Scripts

-   `npm run start` | `yarn start` | `pnpm start` - starts Electron app in local development environment.
-   `npm run package` | `yarn package` | `pnpm package` - packages Electron app for distribution.
-   `npm run make` | `yarn make` | `pnpm make` - creates distributable packages app.
-   `npm run publish` | `yarn publish` | `pnpm publish` - publishes Electron app.
-   `npm run lint` | `yarn lint` | `pnpm lint` - checks code for style and formatting issues.
-   `npm run tsc` | `yarn tsc` | `pnpm tsc` - compiles TypeScript code but doesn't produce output files.

## Contact

Whether you have inquiries or employment opportunities to discuss, feel free to get in touch.
