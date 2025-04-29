document.getElementById('bewertungForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const location = document.getElementById('location').value;
  const size = parseFloat(document.getElementById('size').value);
  const rooms = parseInt(document.getElementById('rooms').value);
  const type = document.getElementById('type').value.toLowerCase();

  let basisPreis = 3000; // Basispreis pro m²

  if (location.toLowerCase().includes('münchen') || location.toLowerCase().includes('frankfurt')) {
    basisPreis = 5000;
  } else if (location.toLowerCase().includes('zürich')) {
    basisPreis = 7000;
  }

  if (type.includes('villa')) {
    basisPreis *= 1.5;
  } else if (type.includes('penthouse')) {
    basisPreis *= 1.3;
  }

  const wert = size * basisPreis + (rooms * 10000);

  document.getElementById('result').textContent = `ca. €${wert.toLocaleString()}`;
  document.getElementById('bewertungResultat').classList.remove('hidden');
});

