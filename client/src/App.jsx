import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MoviePage from './pages/MoviePage';

// intialize apollo client
const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/movie/:id" component={MoviePage} />
                    </Switch>
                </div>
            </Router>
        </ApolloProvider>
    );
};

export default App;


// function App() {
//     const [count, setCount] = useState(0)
  
//     return (
//       <>
//   <Navbar />
//   <Banner />
//   <About />
//   <Video />
//   <Card />
//   <Contact />
  
//       </>
//     )
//   }
  
//   export default App
  