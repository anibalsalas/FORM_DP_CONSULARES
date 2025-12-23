import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TokensService {
  
  private varToken = environment.varToken;
  private varRefToken = environment.varRefToken;

  setTokens(access_token: string, refresh_token: string): void {
    localStorage.setItem(this.varToken, access_token);
    localStorage.setItem(this.varRefToken, refresh_token);
  }

  removeTokens(){
    localStorage.removeItem(this.varToken);
    localStorage.removeItem(this.varRefToken);
  }
}