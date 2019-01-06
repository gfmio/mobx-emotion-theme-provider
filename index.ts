/**
 * `mobx-emotion-theme-provider` package
 */

// tslint:disable:no-namespace

/* @jsx jsx */

import { jsx, ThemeContext } from "@emotion/core";
import { inject, IWrappedComponent, observer } from "mobx-react";
import React from "react";

namespace MobxThemeProvider {
  /**
   * The props of a `MobxThemeProvider`
   *
   * @param `ThemeKey` Type of the name of the MobX store
   * @param `Theme` Theme type
   */
  export type Props<Theme extends object, ThemeKey extends string = "theme"> = {
    [key in ThemeKey]?: Theme
  };

  /**
   * The state of a `ConcreteMobxThemeProvider`
   */
  export interface State<Theme> {
    theme?: Theme;
  }

  // tslint:disable-next-line:no-shadowed-variable
  export namespace Custom {
    /**
     * The props of the `MobxThemeProvider.Custom` function component
     *
     * @param `ThemeKey` Type of the name of the MobX store
     * @param `store` Name of the Mobx store
     */
    // tslint:disable-next-line:no-shadowed-variable
    export interface Props<ThemeKey extends string = "theme"> {
      store?: ThemeKey;
    }
  }
}

/**
 * Creates a `MobxThemeProvider` that reads the emotion theme from the
 * mobx store with the provided name and injects it into emotion.
 *
 * @param `store` The name of the mobx store to use as the emotion theme
 */
const fromStore = <Theme extends object, ThemeKey extends string = "theme">(
  store: ThemeKey = "theme" as ThemeKey,
): React.ComponentClass<
  MobxThemeProvider.Props<Theme, ThemeKey>,
  MobxThemeProvider.State<Theme>
> &
  IWrappedComponent<MobxThemeProvider.Props<Theme, ThemeKey>> => {
  const mobxThemeProvider: React.ComponentClass<
    MobxThemeProvider.Props<Theme, ThemeKey>,
    MobxThemeProvider.State<Theme>
  > = class extends React.Component<
    MobxThemeProvider.Props<Theme, ThemeKey>,
    MobxThemeProvider.State<Theme>
  > {
    constructor(props: MobxThemeProvider.Props<Theme, ThemeKey>) {
      super(props);
      this.state = { theme: this.props[store] as Theme | undefined };
    }

    public render() {
      // The re-rendering only occurs if the object identity of the theme changes
      const themeObj = { ...(this.state.theme || {})! };

      return jsx(ThemeContext.Provider, {
        children: this.props.children,
        value: themeObj,
      });
    }
  };

  (mobxThemeProvider as React.ComponentClass).displayName = `MobxThemeProvider("${store}")`;

  return inject(store)(observer(mobxThemeProvider));
};

/**
 * A `FunctionComponent `that creates a `MobxThemeProvider` that read the
 * emotion theme from the mobx store with the provided name and injects it
 * into emotion.
 */
const Custom: React.FunctionComponent<MobxThemeProvider.Custom.Props> = <
  Theme extends object = any,
  ThemeKey extends string = "theme"
>({
  store,
}: MobxThemeProvider.Custom.Props<ThemeKey>) =>
  jsx(fromStore<Theme, ThemeKey>(store));

/**
 * The default `MobxThemeProvider` that reads the emotion theme from
 * the MobX store `theme`
 */
const MobxThemeProvider: React.ComponentClass<
  MobxThemeProvider.Props<any, "theme">,
  MobxThemeProvider.State<any>
> &
  IWrappedComponent<MobxThemeProvider.Props<any, "theme">> & {
    Custom: typeof Custom;
    fromStore: typeof fromStore;
  } = fromStore<any>() as any;

MobxThemeProvider.fromStore = fromStore;
MobxThemeProvider.Custom = Custom;

export default MobxThemeProvider;
