(() => {
  [
    ['tool-crossed.png','4%','16%','-18deg',128],
    ['tool-drill.png','91%','25%','24deg',92],
    ['tool-helmet.png','7%','43%','-26deg',84],
    ['tool-crossed.png','90%','54%','16deg',105],
    ['tool-drill.png','5%','68%','-12deg',76],
    ['tool-helmet.png','92%','77%','18deg',72],
    ['tool-drill.png','22%','91%','-32deg',78],
    ['tool-crossed.png','76%','91%','-8deg',90],
  ].forEach(x => {
    const image = document.createElement('img');
    image.className = 'floating-tool';
    image.src = x[0];
    image.style.left = x[1];
    image.style.top = x[2];
    image.style.width = x[4] + 'px';
    image.style.transform = 'rotate(' + x[3] + ')';
    image.style.setProperty('--angle', x[3]);
    document.querySelector('.main').appendChild(image);
  });
})();
