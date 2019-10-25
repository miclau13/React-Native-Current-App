declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH0_DOMAIN: string;
      AUTH0_CLIENT_ID: string;
      AUTHO_SCOPE: string;
      AUTH0_AUDIENCE: string;
      AZURE_ACCOUNT_NAME: string;
    }
  }
}