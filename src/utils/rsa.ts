import { JSEncrypt } from 'jsencrypt';

class RSA {
  private crypt: JSEncrypt;

  constructor() {
    this.crypt = new JSEncrypt();
  }

  setPrivateKey(privateKey: string) {
    this.crypt.setPrivateKey(privateKey);
  }

  setPublicKey(publicKey: string) {
    this.crypt.setPublicKey(publicKey);
  }

  encrypt(data: string): string | false {
    return this.crypt.encrypt(data);
  }

  decrypt(data: string): string | false {
    return this.crypt.decrypt(data);
  }

  static encrypt(data: string, publicKey: string): string | false {
    const rsa = new RSA();
    rsa.setPublicKey(publicKey);
    return rsa.encrypt(data);
  }

  static decrypt(data: string, privateKey: string): string | false {
    const rsa = new RSA();
    rsa.setPrivateKey(privateKey);
    return rsa.decrypt(data);
  }

  static veritySignature(data: string, signature: string, publicKey: string): boolean {
    const rsa = new JSEncrypt();
    rsa.setPublicKey(publicKey);
    return rsa.verify(data, signature, () => 'md5');
  }
}

export default RSA;
