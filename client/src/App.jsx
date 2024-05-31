import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import HomePage from './pages/HomePage';
import LoginForm from './componets/LoginForm';
import SignupForm from './componets/SignupForm';
import MoviePage from './pages/MoviePage';
import AppNavbar from './componets/Navbar';

// intialize apollo client
const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            {/* <AppNavbar /> */}
            <Router>
                <div>
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        {/* <Route path="/login" component={LoginForm} />
                        <Route path="/signup" component={SignupForm} />
                        <Route path="/movie/:id" component={MoviePage} /> */}
                    </Routes>
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
  