document.getElementById('fetchRepos').addEventListener('click', function() {
    const username = document.getElementById('username').value || 'ton-nom-utilisateur';
  
    chrome.runtime.sendMessage({ type: 'GET_REPOS', username }, function(response) {
      if (response.success) {
        const repos = response.repos;
        const repoList = document.getElementById('repos');
        repoList.innerHTML = '';
  
        repos.forEach(repo => {
          const li = document.createElement('li');
          li.textContent = repo.name;
          repoList.appendChild(li);
        });
      } else {
        console.error('Erreur :', response.message);
      }
    });
  });