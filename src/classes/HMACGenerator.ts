import * as crypto from 'crypto';

export class HMACGenerator {
  private key: string;

  constructor() {
    this.key = this.generateKey();
  }

  private generateKey(): string {
    // Generate a secure random key (256 bits)
    return crypto.randomBytes(32).toString('hex');
  }

  public getKey(): string {
    return this.key;
  }

  public generateHMAC(message: string): string {
    return crypto.createHmac('sha256', this.key).update(message).digest('hex');
  }
}
