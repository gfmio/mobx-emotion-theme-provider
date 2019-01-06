/**
 * `mobx-emotion-theme-provider` package
 */

// tslint:disable:no-namespace
// tslint:disable:no-shadowed-variable

import { ThemeProvider } from "emotion-theming";
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

  export namespace Custom {
    /**
     * The props of the `MobxThemeProvider.Custom` function component
     *
     * @param `ThemeKey` Type of the name of the MobX store
     * @param `store` Name of the Mobx store
     */
    export interface Props<ThemeKey extends string = "theme"> {
      store?: ThemeKey;
    }
  }
}

/**
 * Deep copies a value including computed properties
 *
 * @param src The copied value
 */
const deepCopy = <T extends any>(src: T): T => {
  // If src is not an object, it's a function or primitive and can be returned immediately
  if (typeof src !== "object") {
    return src;
  }

  // If src is null, return it as-is
  if (src === null) {
    return src;
  }

  // If src is an array, return a new array with elementes deep copied
  if (Array.isArray(src)) {
    return src.map((value: any) => deepCopy(value));
  }

  // If it's a "regular" object, iterate through all keys and deep copy the values
  const o: any = {};
  for (const key of Object.keys(src)) {
    o[key] = deepCopy(src[key]);
  }
  return o;
};

/**
 * Creates a `MobxThemeProvider` that reads the emotion theme from the
 * mobx store with the provided name and injects it into emotion.
 *
 * @param `store` The name of the mobx store to use as the emotion theme
 */
const fromStore = <Theme extends object, ThemeKey extends string = "theme">(
  store: ThemeKey = "theme" as ThemeKey,
): React.FunctionComponent<MobxThemeProvider.Props<Theme, ThemeKey>> &
  IWrappedComponent<MobxThemeProvider.Props<Theme, ThemeKey>> => {
  // Create the function component
  const mobxThemeProvider: React.FunctionComponent<
    MobxThemeProvider.Props<Theme, ThemeKey> & { children?: React.ReactNode }
  > = (props) =>
    React.createElement(ThemeProvider, {
      children: props.children,
      theme: deepCopy<object>(props[store]! as object),
    });

  // Set the display name
  mobxThemeProvider.displayName = `MobxThemeProvider("${store}")`;

  // Return the injected, observer component
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
  React.createElement(fromStore<Theme, ThemeKey>(store));

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
