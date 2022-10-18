import {AppRouters} from 'routers';
import type {Component} from 'solid-js';
import {Footer} from 'template';

const App: Component = () => {
  return (
    <main class="relative h-screen flex flex-col">
      <div class="navbar bg-base-200"></div>
      <div class="flex-1 h-full overflow-y-scroll">
        <AppRouters />
      </div>
      <Footer />
    </main>
  );
};

export default App;
