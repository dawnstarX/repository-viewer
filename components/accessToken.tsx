// @ts-nocheck
import { request, gql } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState,useEffect } from 'react';





export default  function Component() {
    const { data: session } = useSession();
    const givenToken = session.accessToken
    
    const [username, setUsername] = useState('dawnstarX');
    const [repo, setRepo] = useState({});
    

    useEffect(() => {
        async function getRepo() {
            const query = `
              query {
                user(login: "${username}") {
                  repositories(first: 6) {
                    nodes {
                      name
                      description
                    }
                  }
                }
              }
            `;
          
            const response = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${givenToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });
          
            const result = await response.json();
          
            if (result.errors) {
                throw new Error(result.errors[0].message);
            }
          
            setRepo(result);
        }
    
        
  
        getRepo()
      //getRepo();
  }, []);
        
    return (<div>
        {console.log(repo)}</div>)
}

