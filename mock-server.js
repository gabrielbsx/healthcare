import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
import bodyParser from 'body-parser';

server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const { username, password } = req.body;
  const users = router.db.get('users').value();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ id: user.id, username: user.username });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

server.use((req, res, next) => {
  if (req.headers.authorization === 'Bearer admin') {
    next();
  } else if (req.headers.authorization === 'Bearer user') {
    if (req.method === 'GET') {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});