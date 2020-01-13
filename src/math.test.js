import BigInt from 'big-integer';
import tape   from 'tape';

import {
  randomInteger,
  randomPrime,
  primeFactors
} from './math';

let bits  = 256;

tape('Verify math exports', t => {
  t.plan(3);
  t.equal(typeof randomInteger, 'function', 'randomInteger is an exported function');
  t.equal(typeof randomPrime  , 'function', 'randomPrime is an exported function');
  t.equal(typeof primeFactors , 'function', 'primeFactors is an exported function');
});

tape('Verify randomInteger', t => {
  t.plan(1);

  let tests = 1e5;
  let rint  = BigInt(0);
  let limit = BigInt(2).pow(bits);
  while(tests--) {
    rint = BigInt.max(rint, randomInteger(bits));
  }

  t.equal(rint.lt(limit), true, 'Maximum generated integer is below the limit');
});

// tape('Verify randomPrime', t => {
//   t.plan(1);
// });
