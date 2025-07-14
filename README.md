# Webpack ToDo List FE

A modern, modular frontend ToDo List application built with React, TypeScript, Webpack, Storybook, and TailwindCSS.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Storybook](#storybook)
- [License](#license)

## Features

- Add, edit, delete, and mark tasks as complete
- Responsive UI with TailwindCSS
- Modular component structure
- API integration via Axios
- Unit and integration tests with Jest
- Storybook for UI documentation

## Tech Stack

- **React** (TypeScript)
- **Webpack** (custom config)
- **TailwindCSS**
- **Storybook**
- **Jest** (with coverage reports)
- **ESLint** & **Prettier**

## Getting Started

### Prerequisites

- Node.js (>= 16)
- npm (>= 8)

### Installation

```sh
npm install
```

### Development

```sh
npm run start
```

### Build

```sh
npm run build
```

## Scripts

- `start`: Runs the development server
- `build`: Builds the production bundle
- `test`: Runs tests
- `storybook`: Starts Storybook
- `lint`: Runs ESLint

## Project Structure

```
src/
  App.tsx
  main.tsx
  index.css
  __tests__/
  API/
  Assets/
  Components/
  Hooks/
  Reducers/
  stories/
  Types/
.storybook/
  main.ts
  preview.ts
public/
  index.html
webpack.common.js
webpack.dev.js
webpack.prod.js
jest.config.ts
tailwind.config.js
```

## Testing

- Tests are located in `src/__tests__/`
- Run all tests:
  ```sh
  npm test
  ```
- Coverage reports are generated in `coverage/`

## Storybook

- UI components are documented in Storybook.
