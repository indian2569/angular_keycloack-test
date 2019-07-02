import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  public keycloakAuth: any;

  constructor() { }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        'url': 'http://13.94.142.121/auth/',
        'ssl-required': 'none',
        'resource': 'telematics-web',
        'public-client': true,
        'use-resource-role-mappings': true,
        'confidential-port': 0,
        'realm': 'eurowag',
		'clientId': 'telematics-web'
		/**
		 * 
		'url': 'http://sso.karumien.com/auth/',
        'ssl-required': 'none',
        'resource': 'telematics-web',
        'public-client': true,
        'use-resource-role-mappings': true,
        'confidential-port': 0,
        'realm': 'eurowag',
		'clientId': 'telematics-web'
		 */
      };
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          resolve();
        })
        .error(() => {
          reject();
        });
      });
  }

  getToken(): string {
    return this.keycloakAuth.token;
  }
}
