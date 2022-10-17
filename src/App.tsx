import {AppRouters} from 'routers';
import type {Component} from 'solid-js';

const App: Component = () => {
  return (
    <main>
      <header>Header</header>
      <AppRouters />
    </main>
  );
};

export default App;
