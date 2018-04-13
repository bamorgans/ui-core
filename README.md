# UI-Core

UI core is a React based UI component Library with tooling for development and production workflows.

## Features

- Configured to create production or development standalone Library
- Support live editing of library source code and stylesheets
- Includes a set of sample React components for testing test


# Install

```bash
npm install ui-core --save
```

# Available Scripts
In the project directory, you can run:

## `npm run build`

Builds a production version of the library using Webpack.<br>

## `npm run dev`

Builds a development version of the library using Webpack.<br>


## `npm run dev:babel`

Builds the library for development using Babel.<br>

## `npm run watch:babel`

Builds a development version of the library using Babel with watch enabled. <br>
This script should be to enable Live Editing when developing or updating the ui-core components.

## `npm run watch`

Builds a development version of the library using Webpack with watch enabled. <br>
This script should only be used to enable Webpack Live Editing is needed.

## `npm run test`

Runs Jest base unit test located in the ./test directory.<br>


## `npm run lint`

Runs ESLint on project files using a modified version of Airbnb coding guidelines <br>

## `npm run lint {:fix}`

Runs and fixes ESLint issues on the project files using a modified version of Airbnb coding guidelines.<br>


# How to create a production build
```bash
$ git clone git@github.com:bamorgans/ui-core.git
$ cd ui-core
$ npm install
$ npm run build
```

# Library Components
Developing library components will require a Host React app like [bamorgans/ui-playground](https://github.com/bamorgans/ui-playground).

The library UI components can be one of two types:  Element and Custom Controls. An Element is a reusable UI build block which is a React presentation components.  A Custom Control is library components which preforms a specific function and is constructed using one or more of the library Elements <br>

- Library Elements are created in */src/elements* directory.
- Library Custom Controls are defined in the */src/components* directory.  When a custom control requires more than one javascript file, a sub directory should be created to contain them.
- Images and styles used by library components should be stored in the */src/assets/images* and */src/assets/css* directories respectively.
 
## Creating a Library Element

- Create file to in the */src/elements* and implement the React Component code.
- Add export in the */src/ui-core.js* using the following format:

```javascript
export { default as name_of_library_element } from './elements/name_of_library_element';
```

- Configure Live Editing support (see below)
- Setting up a host app for development (see below)

## Creating a Library Custom Control

- Create file or directory in the */src/compnents/* and implement the React Component code.
- Add exports for all React Components used to create the custom control in the */src/ui-core.js* using the following format <br> 
```javascript
export { default as name_of_library_custom_control } from './elements/name_of_library_custom_control';
```
- Configure Live Editing support (see below)
- Setting up a host app for development (see below)



# Configuring Live Editing Support
UI Component can be developed while being viewed in running hot-reload enabled React application. 

Run the following to setup this environment:

```bash
$ git clone git@github.com:bamorgans/ui-core.git
$ cd ui-core
$ npm install
$ npm build:babel
$ npm link
$ npm watch:babel
```
NOTE: Using Babel to build the library offers the fasts Live editing support.

## Debugging the Webpack build

```bash
$ git clone git@github.com:bamorgans/ui-core.git
$ cd ui-core
$ npm install
$ npm run build
$ npm link
$ npm run watch
```

## Setting up a host app for development 
Before setting up the host React application, the ui-core development environment need to be setup using Babel or wepback

```bash
$ git clone git@github.com:bamorgans/ui-playground.git
$ cd ui-playground
$ npm install
$ npm run build
$ npm link ui-core
$ npm run dev
```

Open your browser and visit http://127.0.0.1:8080 


# Usage in host React application


```jsx
ipmort React from 'react';
ipmort ReactDOM from 'react-dom';
import react 
import { Button } from 'ui-core';
ReactDOM.render(<Button />, mountNode);
```

# Sample Standalone UI Library Component
```html
<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" rel="stylesheet">
    <title>React Component Lib Playground</title>
</head>
<body>
<div id='root'>
</div>
<div id='page-content'></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.3.1/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
<script type="text/javascript" src="./ui-core.min.js"></script>
<script type="text/babel">
    class Greeting extends React.Component {
        constructor() {
            super();
            this.siteNavDataProvider = new uiCore.SiteNavDataProvider().fetchMenuData();
        }
        render() {
            return (<div>
                <p>Greetings.  Testing components</p>
                <uiCore.ButtonExtImage imageSrc="https://cdn.drivek.it/configurator-icon/cars/gb/400/FERRARI/488-GTB/6651_COUPE-2-DOORS/ferrari-488-gtb-side-view.png"></uiCore.ButtonExtImage>
                <div id='siteNav' className='sitenav'>
                    <uiCore.SiteNav appState='WIDE' dataPromise={this.siteNavDataProvider} />
                </div>
            </div>);
        }
    }
    ReactDOM.render(<div>
            <Greeting />
            <uiCore.Button></uiCore.Button>
        </div>,
        document.getElementById('page-content')
    );
</script>
</body>
</html>


```
