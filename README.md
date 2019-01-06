# mobx-emotion-theme-provider

`mobx-emotion-theme-provider` provides a component that observes a MobX store and injects the contents as a theme into emotion. You can use it to make the theme dynamic and make all UI elements re-render, whenever the observable theme components update.

## Usage

When you launch your React app, first insert a MobX `Provider`, then the `MobXThemeProvider`.

```tsx
import { configure } from "mobx";
import { Provider } from "mobx-react";
import MobxThemeProvider from "mobx-emotion-theme-provider";
import React from "react";
import ReactDOM from "react-dom";

// Your root application component
import App from "./App";

// Initialise MobX, if necessary for your app
configure({ enforceActions: "always" });

// Your theme vars go here. Could also be an instance of a class.
const theme = {};

ReactDOM.render(
  <Provider theme={theme}>
    <MobxThemeProvider>
      <App />
    </MobxThemeProvider>
  </Provider>,
  document.getElementById("app"),
);
```

The theme will be available to all components created with `styled` from `@emotion/styled`, components augmented by `withTheme` from `emotion-theming` and on the `css` prop of all elements if you use the `jsx` factory function from `@emotion/core`.

If the MobX store of your theme is not called `theme`, use the `MobxThemeProvider.Custom` component or the `MobxThemeProvider.withStore` factory function.

```tsx
import MobxThemeProvider from "mobx-emotion-theme-provider";

const theme = {};

ReactDOM.render(
  <Provider customField={theme}>
    <MobxThemeProvider.Custom store="customField">
      <App />
    </MobxThemeProvider.Custom>
  </Provider>,
  document.getElementById("app"),
);

// or

import MobxThemeProvider from "mobx-emotion-theme-provider";

const anotherTheme = {};

const MyThemeProvier = MobxThemeProvider.fromStore("anotherField");

ReactDOM.render(
  <Provider anotherField={anotherTheme}>
    <MyThemeProvier>
      <App />
    </MyThemeProvier>
  </Provider>,
  document.getElementById("app"),
);
```

If you want to inject a nested theme somewhere in your app, you can use the default `ThemeProvider` from `emotion-theming` or, if you want to inject some other MobX store, you can also use another `MobxThemeProvider`.

See the [emotion docs](https://emotion.sh) more more details on how to use `emotion` and the [MobX docs](https://mobx.js.org) on how to use `MobX`.

## Install

```sh
# With yarn
yarn install mobx-emotion-theme-provider

# With NPM
npm install mobx-emotion-theme-provider
```

## License: MIT

MIT License

Copyright 2019 Frédérique Mittelstaedt

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
