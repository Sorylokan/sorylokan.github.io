const logos = [
  'src/img/logo1.png',
  'src/img/logo2.png',
  'src/img/logo3.png',
  'src/img/logo4.png',
  'src/img/logo5.png'
];

logos.forEach((logo) => {
  const img = new Image();
  img.src = logo;
});

const randomLogo = logos[Math.floor(Math.random() * logos.length)];

document.addEventListener("DOMContentLoaded", () => {
  const logoImage = document.querySelector('.menu-main .logo img');
  if (logoImage) {
      logoImage.src = randomLogo;
  }
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
