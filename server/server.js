const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { start } = require('repl');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// connect to the database
db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization || '';
  if (token) {o
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      console.error('JWT verification failed', err);
    }
  }
  next();
};

app.use(authenticate);

// creating apollo erver
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = req.user || null;
    return { user };
  }
});

// apply apollo middleware
server.applyMiddleware({ app });

// serve client static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
});

startApolloServer();