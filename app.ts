import express, { Request, Response } from 'express';
import path from 'path';
import UserRouter from './src/routers/user';
import 'dotenv/config';

// create server
const app = express();

// set client directory
let CLIENT_DIR = 'client/build';

if (path.basename(__dirname) === 'build') {
  CLIENT_DIR = path.join('..', CLIENT_DIR);
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, CLIENT_DIR)));

if(process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(require('cors'));
}

app.use(express.json());

app.use(UserRouter);

// The "catchall" handler: for a request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, CLIENT_DIR, 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);

console.log(`Server listening on ${PORT}`);
