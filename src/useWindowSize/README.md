# `@xiaoliangpan/useWindowSize`

> React hook for subscribing to window size

> **Note:** This is using the new [React Hooks API Proposal](https://reactjs.org/docs/hooks-intro.html)
> which is subject to change until React 16.8 final.
>
> You'll need to install `react`, `react-dom`, etc at `^16.8.0`

## Install

```sh
yarn add @xiaoliangpan/useWindowSize
```

## Usage

```js
import useWindowSize from '@xiaoliangpan/useWindowSize';

function MyComponent() {
  let windowSize = useWindowSize();
  // {
  //   innerWidth: window.innerWidth,
  //   innerHeight: window.innerHeight,
  //   outerWidth: window.outerWidth,
  //   outerHeight: window.outerHeight,
  // }

  // ...
}
```
