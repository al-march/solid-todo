import {Route, Routes} from '@solidjs/router';
import {HomePage} from 'pages/home';

export const AppRouters = () => {
  return (
    <Routes>
      <Route path="/" component={HomePage} />
      <Route path="/*all" element={<div>Page not found :(</div>} />
    </Routes>
  );
};
