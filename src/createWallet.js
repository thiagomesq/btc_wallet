//importando as dependências
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const { validate, getAddressInfo } = require('bitcoin-address-validation');

//definir a rede
//bitcoin - rede principal - mainnet
//testnet - rede de teste - tesnet
const network = bitcoin.networks.testnet

//derivação de carteiras HD
const path = `m/49'/1'/0'/0` 

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da cartiera HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira criada com sucesso!");
console.log("Endereço:",btcAddress);
console.log("Valido: ", validate(btcAddress, 'testnet'));
console.log("Informações: ", getAddressInfo(btcAddress));
console.log("Chave privada: ",account.toWIF());
console.log("Seed: ",mnemonic);