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
