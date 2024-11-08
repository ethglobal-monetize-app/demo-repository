// Écoute les messages provenant du content script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchRepos') {
        const username = message.username;

        // Effectuer la requête à l'API GitHub pour récupérer les dépôts de l'utilisateur
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(data => {
                sendResponse({ success: true, repos: data });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des dépôts:', error);
                sendResponse({ success: false, error: error.message });
            });

        // Indiquer que la réponse sera envoyée de manière asynchrone
        return true;
    }
});