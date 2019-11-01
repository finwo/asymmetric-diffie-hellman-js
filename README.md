# asymmetric diffie hellman

Asymmetric key echange

This package was designed as a placeholder for a future quantum-resistant key
exchange algorithm once that is proven-secure.

## Installation

```sh
npm install 
```

## Usage

First we'll need to import the package

```js
import {KeyPair} from 'asymmetric-diffie-hellman';
```

### Generating a keypair

Let's generate a key pair for the sender (alice) and the receiver (bob)

```js
const Alice = new KeyPair();
const Bob   = new KeyPair();
```

### Getting the public key to share

```js
const AlicePublic = Alice.pubkey;
const BobPublic   = Bob.pubkey;
```

### Generating encryption key seed for transmitting

When transmitting a message from Alice to Bob, Alice will need to include the
new key generated in a non-encrypted manner. Using this new key, Bob can
generate the same secret as Alice had when encrypting the message.

```js
const AliceTx = Alice.keyExchange(BobPublic);

// Include AliceTx.key in the non-encrypted part of your message
// Use AliceTx.secret to generate the encryption key for your symmetric encryption algorithm
```

### Generating encryption key seed for receiving

```js
const BobRx = Bob.keyExchange(AliceTx.key);

// Use BobRx.secret to generate the encryption key for your symmetric encryption algorith
```
