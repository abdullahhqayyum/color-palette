const colorPicker = document.getElementById('colorPicker');
const schemeSelect = document.getElementById('schemeSelect');
const getSchemeBtn = document.getElementById('getSchemeBtn');
const colorsContainer = document.getElementById('colors');

// Sync swatch & generate on change
colorPicker.addEventListener('input', fetchScheme);

function fetchScheme() {
  const hex = colorPicker.value.slice(1);
  const mode = schemeSelect.value;
  const url = `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      colorsContainer.innerHTML = '';
      data.colors.forEach(color => {
        const container = document.createElement('div');
        container.classList.add('color-container');

        const swatch = document.createElement('div');
        swatch.classList.add('color-box');
        swatch.style.backgroundColor = color.hex.value;

        const hexText = document.createElement('div');
        hexText.classList.add('hex');
        hexText.textContent = color.hex.value;
        hexText.addEventListener('click', () => {
          navigator.clipboard.writeText(color.hex.value);
          hexText.textContent = 'Copied!';
          setTimeout(() => {
            hexText.textContent = color.hex.value;
          }, 800);
        });

        container.append(swatch, hexText);
        colorsContainer.append(container);
      });
    })
    .catch(err => console.error('Error fetching color scheme:', err));
}

window.addEventListener('DOMContentLoaded', fetchScheme);
getSchemeBtn.addEventListener('click', fetchScheme);