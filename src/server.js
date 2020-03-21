import express from 'express';
import compression from 'compression';
import { render } from './middlewares/render';
import { handleError } from './middlewares/handleError';
import {
  search,
} from './controllers';
import { HttpError } from './utils/Error';

const port = process.env.PORT || 8080;
const app = express();
app.use(compression());

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/dist', express.static('dist', {
  fallthrough: false
}));

app.get('/', render);
app.get('/search', search);

app.use((req, res) => {
  throw new HttpError(404, 'Page not found')
});

app.use(handleError);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}!\n`);
});
