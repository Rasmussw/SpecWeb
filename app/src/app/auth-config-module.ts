import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'http://localhost:8081/realms/SpringBootKeycloak',
        redirectUrl: window.location.origin + '/callback',
        postLogoutRedirectUri: window.location.origin,
        clientId: (window as any).frontendProperties?.clientId,
        scope: 'openid address roles profile microprofile-jwt offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Warn,
        ignoreNonceAfterRefresh: true,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
