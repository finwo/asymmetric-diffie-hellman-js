import tape from 'tape';

import {KeyPair} from './index';

tape('Verify exports', t => {
  t.plan(1);
  t.equal(typeof KeyPair, 'function', 'KeyPair is an exported function');
});
