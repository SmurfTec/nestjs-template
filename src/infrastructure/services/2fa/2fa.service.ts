import { Injectable } from '@nestjs/common';
import * as OTPAuth from 'otpauth';
import { toDataURL } from 'qrcode';
import CryptoJS from 'crypto-js';
import { randomBytes } from 'crypto';

@Injectable()
export class TwoFactorAuthService {
  private readonly encryptionKey: string;

  constructor() {
    // In production, get this from environment variables
    this.encryptionKey = process.env.ENCRYPTION_KEY || 'default-encryption-key-change-in-production';
  }

  /**
   * Generate a new TOTP secret (base32 encoded)
   */
  generateSecret(email: string): string {
    const buffer = randomBytes(20);
    // Convert to base32 - proper encoding for TOTP
    return this.toBase32(buffer);
  }

  /**
   * Convert buffer to base32 string (RFC 3548)
   */
  private toBase32(buffer: Buffer): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let result = '';
    let bits = 0;
    let value = 0;
    
    for (const byte of buffer) {
      value = (value << 8) | byte;
      bits += 8;
      
      while (bits >= 5) {
        result += alphabet[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }
    
    if (bits > 0) {
      result += alphabet[(value << (5 - bits)) & 31];
    }
    
    // Pad to multiple of 8
    const paddingLength = (8 - (result.length % 8)) % 8;
    result = result.padEnd(result.length + paddingLength, '=');
    
    // Return first 32 chars without padding
    return result.substring(0, 32);
  }

  /**
   * Generate TOTP token from secret
   */
  generateToken(secret: string): string {
    const totp = new OTPAuth.TOTP({
      secret: OTPAuth.Secret.fromBase32(secret),
    });
    return totp.generate();
  }

  /**
   * Verify TOTP token
   */
  verifyToken(token: string, secret: string): boolean {
    try {
      const totp = new OTPAuth.TOTP({
        secret: OTPAuth.Secret.fromBase32(secret),
        period: 30, // 30 seconds per token
      });
      return totp.validate({ token }) !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate QR code for pairing
   */
  async generateQRCode(secret: string, email: string): Promise<string> {
    const totp = new OTPAuth.TOTP({
      issuer: 'Seller Analytics',
      label: email,
      secret: OTPAuth.Secret.fromBase32(secret),
    });

    const qrCodeUrl = await toDataURL(totp.toString());
    return qrCodeUrl;
  }

  /**
   * Encrypt secret using AES encryption
   */
  encryptSecret(secret: string): string {
    try {
      if (!secret) throw new Error("Secret is empty");
      return CryptoJS.AES.encrypt(secret, this.encryptionKey).toString();
    } catch (err) {
      throw new Error("Failed to encrypt 2FA secret");
    }
  }

  /**
   * Decrypt secret safely with error handling
   */
  decryptSecret(encryptedSecret: string): string {
    try {
      if (!encryptedSecret) {
        throw new Error("No encrypted secret stored");
      }

      const bytes = CryptoJS.AES.decrypt(encryptedSecret, this.encryptionKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        throw new Error("Invalid encrypted secret or wrong encryption key");
      }

      return decrypted;
    } catch (err) {
      console.error("Error decrypting TOTP secret:", err.message);
      throw new Error("2FA secret is corrupted or cannot be decrypted");
    }
  }

  /**
   * Generate recovery codes
   */
  generateRecoveryCodes(count: number = 8): string[] {
    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
      codes.push(
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      );
    }
    return codes;
  }

  /**
   * Hash recovery code for storage
   */
  hashRecoveryCode(code: string): string {
    return CryptoJS.SHA256(code).toString();
  }

  /**
   * Verify recovery code
   */
  verifyRecoveryCode(code: string, hashedCode: string): boolean {
    const hashed = this.hashRecoveryCode(code);
    return hashed === hashedCode;
  }
}

