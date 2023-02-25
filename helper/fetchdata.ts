export  async function getGitHubUsername(accessToken:string) {
  
  const query= `
                query {
                  viewer {
                    login
                  }
                }
              `
                const response = await fetch('https://api.github.com/graphql', {
                  method: 'POST',
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ query }),
              });

              const result = await response.json();
              return result.data.viewer.login;
    
}

export async function getRepo(username:string,accessToken:string){
    const query = `
              query {
                user(login: "${username}") {
                  repositories(first: 6) {
                    nodes {
                      name
                      description
                      url
                    }
                  }
                }
              }
            `;
          
            const response = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });
          
    const result = await response.json();
    return result;
          
}

export async function repoInfo(username:string,accessToken:string,repo :string){
  const query = `
                  query {
                    repository(owner: "${username}", name: "${repo}") {
                      name
                      description
                      createdAt
                      updatedAt
                      pushedAt
                      isPrivate
                      url
                      primaryLanguage {
                        name
                      }
                      stargazers {
                        totalCount
                      }
                      watchers {totalCount
                      }
                      forks {
                        totalCount
                      }
                      licenseInfo {
                        name
                        nickname
                      }
                      owner {
                        login
                      }
                    }
                  }
                          `;
        
          const response = await fetch('https://api.github.com/graphql', {
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ query }),
          });
        
  const result = await response.json();
  
  return result;
        
}

export async function createRepo(accessToken:string,name: string,description: string,visibility: string) {
  const query = `
    mutation {
      createRepository(
        input: {
          name: "${name}",
          visibility: ${visibility.toUpperCase()},
          description: "${description}"
        }
      ) {
        repository {
          id
          name
          visibility
          description
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data;
}

export async function deleteRepo(username:string,repo:string,token:string){
  const response= await fetch(`https://api.github.com/repos/${username}/${repo}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
  })
  
  if (response.ok) {
    return { success: true };
  } else {
    const errorData = await response.json();
    throw new Error(`Failed to delete repository: ${errorData.message}`);
  }

  
}