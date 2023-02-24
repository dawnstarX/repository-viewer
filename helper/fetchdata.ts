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