

export  async function getGitHubUsername(accessToken:string) {
    const response = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const { login } = await response.json();
    return login;
}

export async function getRepo(username:string,accessToken:string){
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
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });
          
    const result = await response.json();
    return result;
          
}