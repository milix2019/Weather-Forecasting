# Weather-Forecasting

This project is with Redux, typeScript, Storybook, and unit testing.

# Application principal

"_folder structure_": UpperCamelCase to name the files except for SCSS. Folder sturcture sample as follow:

```
.
├── build
├── public
├── storybook
│ └── main.tsx
├── src
│ ├── components
│ │ ├── Button
│ │ │ │ ├── button.scss
│ │ │ │ ├── Button.stories.tsx
│ │ │ │ └── Button.test.tsx
│ │ │ │ └── Button.tsx
│ └── containers
├── webpack
└── README.md
```

"_CSS_": Bem name convention is being used for classes and css, [read more about bem](http://getbem.com/introduction/)

"_function names_": lowerCamelCase naming convention is being used in the .tsx files. Here are some examples:

```
moveToWall()
cleanRow()
findLongestStreak()
```

## How to run application

please follow the bellow steps in order to run the project

```
npm install
npm start

```

## to run unit test

please follow the bellow steps in order to run the test project
note: test:watch will put it on watch mode

```
npm run test
npm run test:watch

```

## to run the storybook

please follow the bellow steps in order to run the project

```
npm run storybook

```

## to run eslint

please follow the bellow steps in order to run the project

```
npm run lint

```

## to build

please follow the bellow steps in order to run the project

```
npm run build

```
