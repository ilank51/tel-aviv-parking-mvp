const map = L.map('map').setView([32.0809, 34.7806], 14); // Center Tel Aviv

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

fetch('data/parking-lots.json')
  .then(res => res.json())
  .then(lots => {
    lots.forEach(lot => {
      const availability = `${lot.available}/${lot.total}`;
      const popup = `
        <strong>${lot.name}</strong><br/>
        Spots Available: ${availability}<br/>
        Price/hr: ₪${lot.price_per_hour}<br/>
        <a target="_blank" href="https://www.waze.com/ul?ll=${lot.lat},${lot.lng}&navigate=yes">Navigate in Waze</a>
      `;
      L.marker([lot.lat, lot.lng]).addTo(map).bindPopup(popup);
    });
  });

