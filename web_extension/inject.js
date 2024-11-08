// Une fois le DOM chargé, nous pouvons manipuler la page
document.addEventListener('DOMContentLoaded', function() {
    // Créer un bouton personnalisé
    const button = document.createElement('button');
    button.textContent = 'Mon Bouton GitHub';
    button.style.padding = '10px';
    button.style.backgroundColor = '#2ea44f';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.marginTop = '10px';

    // Ajouter une action au clic
    button.addEventListener('click', function() {
        alert('Bouton personnalisé cliqué !');
    });

    // Trouver un emplacement dans l'interface pour le bouton (ex : header)
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(button);
    }
});