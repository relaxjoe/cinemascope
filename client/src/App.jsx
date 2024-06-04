import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// 
import NavBar from './components/Navbar';
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
          <NavBar />
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
  