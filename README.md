# FolkSoul

FolkSoul is a music band website, where you can view information about the band and its members. Only authenticated admins can modify this information.

You can visit the application from [here](https://folksoul.otar.redberryinternship.ge/).

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Resources](#resources)

#

### Prerequisites

- <img src="./readme/assets/node.svg" height="17" style="position: relative; top: 2px"/> _Node JS @12.X and up_

* <img src="./readme/assets/npm.png" height="16" style="position: relative; top: 4px"> _npm @6 and up_

#

### Tech Stack

- <img src="readme/assets/react.png" height="18" style="position: relative; top: 4px" /> [React @18.2.0](https://reactjs.org) - Front-end framework
- <img src="readme/assets/typescript.png" height="20" style="position: relative; top: 4px" /> [Typescript @4.7.4](https://www.typescriptlang.org/) - Superset of Javascript
- <img src="readme/assets/tailwind.png"  height="20" style="position: relative; top: 4px" /> [TailwindCss @3.1.8](https://tailwindcss.com/) - CSS framework
- <img src="readme/assets/router.webp" height="11" /> [React Router @6.3.0](https://reactrouter.com/) - Client side router
- <img src="readme/assets/react-form.png" height="21" style="position: relative; top: 4px" /> [React Hook Form @7.34.1](https://react-hook-form.com/) - Form validation library
- <img src="readme/assets/axios.png" height="21" style="position: relative; top: 4px" /> [Axios @0.27.2](https://axios-http.com/) - Promise based http client

#

### Getting Started

**To run this application locally you need to follow the steps below:**

1\. First of all you need to clone repository from github:

```sh
git clone https://github.com/RedberryInternship/folksoul-front-otomamatsashvili.git
```

2\. Next step requires installing all the dependencies:

```sh
npm install
```

or

```sh
yarn install
```

3\. Then copy env example file. You can change environment variables inside .env with your preferences:

```sh
cp .env.example .env
```

4\. After that you can run Folksoul from your terminal:

```sh
npm start
```

or

```
yarn run start
```

5\. You can also build project for production if you need to:

```sh
npm run build
```

#

### Testing

This application is test driven. To write e2e and integration tests `@cypress` is used. You can find all of the tests into following path: `/cypress/e2e/*.cy.ts`

You can run cypress tests using following commands:

1\. Copy cypress configuration file and if you need feel free to change it:

```sh
cp cypress.config.ts.example cypress.config.ts
```

2\. Open cypress:

```sh
npx cypress open
```

#

### Project Structure

**Every file is not included**

```bash
├─── public  # entry folder
│   ├─── index.html     # main html file
├─── readme  # readme assets
├─── src  # project source codes
│   ├─── assets      # project images
│   ├─── components  # reusable components for whole app
│   ├─── pages  # application pages
│   ├───├─── page-folder  # pattern for each application page
│   ├───├───├─── page-component-file.tsx  # page component file
│   ├───├───├─── index.ts                 # exports page
│   ├───├───├─── page-components-folder   # [OPTIONAL] stores page specific components
│   ├───├─── index.ts  # exports all pages
│   ├─── services  # backend request files
│   ├─── types     # type files
│   ├─── App.tsx   # main component with routing
│   ├─── app.css   # main css file
│   ├─── index.tsx # root TS file
├─── .env                # environment variables
├─── .eslintrc.json      # eslint config file
├─── .prettierrc.js      # prettier config file
├─── package.json        # dependency manager configurations
├─── README.md           # github readme file
├─── tailwind.config.js  # tailwind config file
├─── tsconfig.json       # typescript configuration
```

#

### Deployment

**Application is deployed on digitalocean server with `ngnix`. You can view it [here](https://folksoul.otar.redberryinternship.ge/)**

If you want to deploy this application on your own:

1\. You need to copy env example file on server. You should update env variables with your needs:

```sh
cp .env.example .env
```

2\. And then just build:

```sh
npm run build
```

#

### Resources

- [Application Design [Figma]](https://www.figma.com/file/ferG8kznuy5s0hMhMZa2Hi/FolkSoul---Bootcamp?node-id=93%3A1167)
- [Back End API Specification](https://folksoul-api.otar.redberryinternship.ge/api-docs/)
- [Git Commits Structure](https://redberry.gitbook.io/resources/git-is-semantikuri-komitebi)
