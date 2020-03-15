import express from 'express';
import { render } from './middlewares/render';

const port = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/dist', express.static('dist', {
  fallthrough: false
}));

app.get('/', (req, res, next) => {
  next();
});

app.use(render);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}!\n`);
});
