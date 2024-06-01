import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MoviePage from './pages/MoviePage';
import AppNavbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

// intialize apollo client
const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
});

const App = () => {
    return (
        <ApolloProvider client={client}>
        <div className="flex-column justify-flex-start min-100-vh">
          <AppNavbar />
          <div className="container">
            <Outlet />
          </div>
        
        </div>
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
  