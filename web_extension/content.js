
document.addEventListener('DOMContentLoaded', function() {
    const currentURL = window.location.href;
    const userMatch = currentURL.match(/^https:\/\/github\.com\/([^\/]+)$/);

    if (userMatch) {
        const username = userMatch[1];

        // Créer le bouton
        const button = document.createElement('button');
        button.textContent = `Afficher les dépôts de ${username}`;
        button.style.padding = '10px';
        button.style.backgroundColor = '#2ea44f';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.marginTop = '10px';

        // Ajouter une action au clic du bouton
        button.addEventListener('click', function() {
            // Envoyer un message au background script pour récupérer les dépôts
            browser.runtime.sendMessage({ action: 'fetchRepos', username: username })
                .then(response => {
                    if (response.success) {
                        // Créer la popup avec la liste des dépôts
                        const popup = document.createElement('div');
                        popup.style.position = 'fixed';
                        popup.style.top = '20px';
                        popup.style.right = '20px';
                        popup.style.width = '300px';
                        popup.style.height = '400px';
                        popup.style.backgroundColor = '#f9f9f9';
                        popup.style.border = '1px solid #ccc';
                        popup.style.padding = '10px';
                        popup.style.overflowY = 'scroll';
                        popup.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)';

                        // Ajouter un bouton pour fermer la popup
                        const closeButton = document.createElement('button');
                        closeButton.textContent = 'Fermer';
                        closeButton.style.marginBottom = '10px';
                        closeButton.addEventListener('click', () => {
                            document.body.removeChild(popup);
                        });
                        popup.appendChild(closeButton);

                        // Ajouter la liste des dépôts
                        const repoList = document.createElement('ul');
                        response.repos.forEach(repo => {
                            const listItem = document.createElement('li');
                            listItem.textContent = repo.name;
                            repoList.appendChild(listItem);
                        });
                        popup.appendChild(repoList);

                        // Ajouter la popup au body
                        document.body.appendChild(popup);
                    } else {
                        console.error('Erreur:', response.error);
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi du message:', error);
                });
        });

        // Ajouter le bouton à l'interface
        const header = document.querySelector('header');
        if (header) {
            header.appendChild(button);
        }
    }
});