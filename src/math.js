import BigInt from 'big-integer';

export function randomInteger(bits) {
  bits = Math.ceil(bits / 8) * 8;
  const num = Array(bits / 4)
    .fill(0)
    .map(n => Math.floor(Math.random()*16))
    .map(n => n.toString(16))
    .join('');

  return new BigInt(num, 16);
}

export function randomPrime(bits, minbits) {
  minbits = minbits || (bits - 16);
  minbits = Math.ceil(minbits / 8) * 8;

  const minval = BigInt(2).pow(minbits);
  let   prime  = randomInteger(bits);
  while(!prime.isPrime()) {
    prime = randomInteger(bits);
  }

  return prime;
}

export function primeFactors(n, complexity) {
  const testlimit = BigInt(2).pow(complexity || 24);
  n = BigInt(n);

  let factors = [];
  let i = BigInt(3);

  while (n.mod(2).isZero()) {
    factors.push(BigInt(2));
    n = n.over(2);
  }

  if (n.isPrime()) {
    factors.push(n);
    return factors;
  }

  for (i=i; i.times(i).lt(n); i = i.plus(2)) {
    if (i.gt(testlimit)) return false;
    let had = false;
    while(n.mod(i).isZero()) {
      factors.push(i);
      n = n.over(i);
      had = true;
    }
    if (had && n.isPrime()) {
      factors.push(n);
      return factors;
    }
  }

  return factors;
}

export function buildGenerator(prime, complexity) {
  let r       = BigInt(2);
  let phi     = prime.minus(1);
  let factors = primeFactors(phi, complexity);
  if (false === factors) return false;
  while(r.lesserOrEquals(prime)) {
    let found = false;
    for(const factor of factors) {
      if (!r.modPow(phi.over(factor), prime).compare(1)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return r;
    }
    r = r.plus(1);
  }
  return false;
}
