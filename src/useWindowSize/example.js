import React from 'react';
import { render } from 'react-dom';
import useWindowWidth from './index.ts';

function App() {
  let windowWidth = useWindowWidth();
  return <div>{JSON.stringify(windowWidth)}</div>;
}

render(<App />, window.root);
