import BigInt from 'big-integer';

import {
  randomInteger,
  randomPrime,
  buildGenerator
} from './math';

export class KeyPair {

  constructor(opts) {

    // Quick public key read
    if ('string' === typeof opts) {
      opts = {pub: opts};
    }

    // Normalize options
    opts = Object.assign({
      bits: 128,
      pub: false,
      sec: false,
    }, opts);
    this.bits = opts.bits;

    // Build from pre-generated secret key
    if (opts.sec) {
      const chars = this.bits / 4;
      this.n = BigInt(opts.sec.substr(0,chars), 16);
      this.g = buildGenerator(this.n);
      this.s = BigInt(opts.sec.substr(chars), 16);
      this.p = this.g.modPow(this.s, this.n);
    }

    // Build from public key
    if (opts.pub && (!opts.sec)) {
      const chars = this.bits / 4;
      this.n = BigInt(opts.pub.substr(0,chars), 16);
      this.g = buildGenerator(this.n);
      this.p = BigInt(opts.pub.substr(chars), 16);
    }

    // Build generator
    if (!this.n) {
      this.n = false;
      this.g = false;
      while(false === this.g) {
        this.n = randomPrime(this.bits);
        this.g = buildGenerator(this.n);
      }
    }

    // Generate secret
    if (!this.p) {
      this.s = false;
      while((false === this.s) || this.s.gt(this.n)) {
        this.s = randomInteger(this.bits - 16);
      }
      this.p = this.g.modPow(this.s, this.n);
    }

  }

  get pubkey() {
    let tokenLength = this.bits / 4;
    let prefix      = '0'.repeat(tokenLength);
    let modulo      = (prefix + this.n.toString(16)).substr(-tokenLength);
    let pub         = (prefix + this.p.toString(16)).substr(-tokenLength);
    return modulo + pub;
  }

  keyExchange(pub) {
    if (pub instanceof KeyPair) {
      pub = pub.pubkey;
    }

    const chars = this.bits / 4;
    let prefix = '0'.repeat(chars);
    if (pub.length === chars) {
      pub = (prefix + this.n.toString(16)).substr(-chars) + pub;
    }

    const n = BigInt(pub.substr(0,chars), 16);
    const g = buildGenerator(n);
    const p = BigInt(pub.substr(chars), 16);

    const S = p.modPow(this.s, n);
    let tx  = (prefix + g.modPow(this.s, n).toString(16)).substr(-chars);

    return {key: tx, secret: S};
  }

}
