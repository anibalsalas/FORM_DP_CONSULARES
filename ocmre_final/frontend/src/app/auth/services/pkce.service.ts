import { Injectable } from '@angular/core';

// npm install crypto-js
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PkceService {
  private readonly varPkce = environment.varPkce;
  private readonly oauthStateKey = 'oauth_state';
  private readonly pkceVerifierKey = 'pkce_code_verifier';

  constructor() {}

  async generateCodeVerifierAndChallenge() {
    const codeVerifier = this.generateRandomString(64);
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    sessionStorage.setItem(
      `${this.pkceVerifierKey}_${this.varPkce}`,
      codeVerifier
    );

    return { codeVerifier, codeChallenge };
  }

  private generateRandomString(length: number): string {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }

    return result;
  }

  /** Genera el challenge (SHA-256 -> Base64 URL Safe) */
  private async generateCodeChallenge(verifier: string): Promise<string> {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(verifier);

    const subtle = crypto?.subtle;

    if (subtle && typeof subtle.digest === 'function') {
      const digest = await subtle.digest('SHA-256', data);
      return this.base64UrlEncode(new Uint8Array(digest));
    }

    const hash = CryptoJS.SHA256(verifier);
    const base64 = CryptoJS.enc.Base64.stringify(hash);

    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private base64UrlEncode(bytes: Uint8Array): string {
    const base64 = btoa(String.fromCharCode(...bytes));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  public getState(): string {
    const state =
      crypto.randomUUID?.() || Math.random().toString(36).substring(2);

    sessionStorage.setItem(`${this.oauthStateKey}_${this.varPkce}`, state);
    return state;
  }

  public getOauthState(): string | null {
    return sessionStorage.getItem(`${this.oauthStateKey}_${this.varPkce}`);
  }

  public getCodeVerifier(): string | null {
    return sessionStorage.getItem(`${this.pkceVerifierKey}_${this.varPkce}`);
  }

  public clearPkceCodes(): void {
    sessionStorage.removeItem(`${this.pkceVerifierKey}_${this.varPkce}`);
    sessionStorage.removeItem(`${this.oauthStateKey}_${this.varPkce}`);
  }
}
