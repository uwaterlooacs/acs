declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_SECRET: string;
      AWS_CLIENT_ID: string;
      AWS_CLIENT_SECRET: string;
      NODE_ENV: 'development' | 'test' | 'production';
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
