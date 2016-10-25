import { argv } from 'process';
import { add, subtract } from './math/vector';

const vector1 = [1, 15];
const vector2 = [2, 3];

argv.forEach((value, index) => {
  console.log(`${index}: ${value}`);
});

console.log(add(vector1, vector2));
console.log(subtract(vector1, vector2));

if (module.hot) {
  module.hot.accept();
}
