import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';




// 
import NavBar from './components/apple';
import { Outlet } from 'react-router-dom';


import { AuthProvider } from './utils/AuthContext';


// intialize apollo client
const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
});

const App = () => {
    return (
      
        <ApolloProvider client={client}>
          <AuthProvider>
        <div className="flex-column justify-flex-start min-100-vh">
          <NavBar />
          <div className="container">
            <Outlet />
          </div>
        
        </div>

          </AuthProvider>
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
  