/**
 * `mobx-emotion-theme-provider` package
 */

import React from "react";
import { jsx, ThemeContext } from "@emotion/core";
import { inject, observer, IWrappedComponent } from "mobx-react";

/**
 * The props of a `MobxThemeProvider`
 *
 * @param `ThemeKey` Type of the name of the MobX store
 * @param `Theme` Theme type
 */
export type MobxThemeProviderProps<
  Theme extends object,
  ThemeKey extends string = "theme"
> = { [key in ThemeKey]?: Theme };

/**
 * The props of the `CustomMobxThemeProvider` function component
 *
 * @param `ThemeKey` Type of the name of the MobX store
 * @param `store` Name of the Mobx store
 */
export interface CustomMobxThemeProviderProps<
  ThemeKey extends string = "theme"
> {
  store?: ThemeKey;
}

/**
 * The state of a `ConcreteMobxThemeProvider`
 */
export interface MobxThemeProviderState<Theme> {
  theme?: Theme;
}

/**
 * Creates a `MobxThemeProvider` that reads the emotion theme from the
 * mobx store with the provided name and injects it into emotion.
 *
 * @param `store` The name of the mobx store to use as the emotion theme
 */
export const createMobxThemeProvider = <
  Theme extends object,
  ThemeKey extends string = "theme"
>(
  store: ThemeKey = "theme" as ThemeKey,
): React.ComponentClass<
  MobxThemeProviderProps<Theme, ThemeKey>,
  MobxThemeProviderState<Theme>
> &
  IWrappedComponent<MobxThemeProviderProps<Theme, ThemeKey>> => {
  const mobxThemeProvider: React.ComponentClass<
    MobxThemeProviderProps<Theme, ThemeKey>,
    MobxThemeProviderState<Theme>
  > = class extends React.Component<
    MobxThemeProviderProps<Theme, ThemeKey>,
    MobxThemeProviderState<Theme>
  > {
    constructor(props: MobxThemeProviderProps<Theme, ThemeKey>) {
      super(props);
      this.state = { theme: this.props[store] as Theme | undefined };
    }

    public render() {
      return jsx(ThemeContext.Provider, {
        value: this.state.theme || {},
        children: this.props.children,
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
export const CustomMobxThemeProvider = <
  Theme extends object = any,
  ThemeKey extends string = "theme"
>({
  store,
}: CustomMobxThemeProviderProps<ThemeKey>) =>
  jsx(createMobxThemeProvider<Theme, ThemeKey>(store));

/**
 * The default `MobxThemeProvider` that reads the emotion theme from
 * the MobX store `theme`
 */
export const MobxThemeProvider = createMobxThemeProvider<any>();

export default MobxThemeProvider;
