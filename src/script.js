document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.querySelectorAll('.copy-email').forEach(copyIcon => {
    copyIcon.setAttribute('data-tooltip', 'Copier l’adresse mail ?'); // Texte par défaut

    copyIcon.addEventListener('click', function () {
        const email = this.getAttribute('data-email');
        navigator.clipboard.writeText(email) // Copie dans le presse-papier
            .then(() => {
                this.classList.add('copied'); // Ajoute la classe "copied"
                this.setAttribute('data-tooltip', 'Adresse copiée !'); // Change l'infobulle
                setTimeout(() => {
                    this.classList.remove('copied'); // Réinitialise l'état
                    this.setAttribute('data-tooltip', 'Copier l’adresse mail ?');
                }, 2500); // Réinitialise après 2 secondes
            })
            .catch(() => {
                this.setAttribute('data-tooltip', 'Erreur, réessayez !');
            });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.createElement('div');
    popup.id = 'popup-container';
    popup.innerHTML = `
      <div class="popup">
        <h2>Ouvrir le lien ?</h2>
        <button class="cancel" id="cancel">Annuler</button>
        <button id="same-tab">Cet onglet</button>
        <button id="new-tab">Nouvel onglet</button>
      </div>`;
    document.body.appendChild(popup);
  
    let linkHref = '';
  
    document.querySelectorAll('.external-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        linkHref = link.href;
        popup.style.display = 'flex';
      });
    });
  
    document.getElementById('new-tab').addEventListener('click', () => {
      window.open(linkHref, '_blank');
      popup.style.display = 'none';
    });
  
    document.getElementById('same-tab').addEventListener('click', () => {
      window.location.href = linkHref;
      popup.style.display = 'none';
    });
  
    document.getElementById('cancel').addEventListener('click', () => {
      popup.style.display = 'none';
    });
  });
  