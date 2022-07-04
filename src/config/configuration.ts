export default () => ({
  clientSecret: process.env.CLIENT_SECRET || '',
  clientId: process.env.CLIENT_ID || '',
  redirectUri: process.env.REDIRECT_UR || 'http://localhost:3000/dashboard',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || '',
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || '',
  MONGO_USER: process.env.MONGO_USER || '',
});
