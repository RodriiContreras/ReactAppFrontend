
import {ApolloClient,createHttpLink,InMemoryCache} from '@apollo/client';
import fetch from 'node-fetch';
import {setContext} from 'apollo-link-context'

const httpLink = createHttpLink({
     uri:'https://react-avanzado.herokuapp.com/',
    fetch
});

const authToken= setContext((_,{headers})=>{
    const token= localStorage.getItem('token')
    return {
        headers:{
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});
 const client  = new ApolloClient({
    connectToDevTools:true,
    cache: new InMemoryCache(),
    link: authToken.concat(httpLink)
 });
 export default client;