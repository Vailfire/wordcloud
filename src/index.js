import { initialize } from './cli';

initialize();

if (module.hot) {
  module.hot.accept();
}
