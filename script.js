let guestMap = {};

window.onload = function () {
  Papa.parse('guestlist.csv', {
    download: true,
    header: true,
    complete: function (results) {
      results.data.forEach((row) => {
        const name = row['Name']?.trim();
        const table = row['Table']?.trim();
        if (name && table) {
          guestMap[name.toLowerCase()] = table;
        }
      });
    },
    error: function () {
      alert('Error loading guest list.');
    },
  });
};

function findTable() {
  const input = document.getElementById('nameInput').value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');

  if (!input) {
    resultDiv.textContent = 'Please enter your name.';
    resultDiv.style.color = 'gray';
    return;
  }

  const matches = Object.entries(guestMap).filter(([name]) =>
    name.includes(input)
  );

  if (matches.length === 0) {
    resultDiv.textContent = `No guest found matching "${input}".`;
    resultDiv.style.color = '#395754';
  } else if (matches.length === 1) {
    const [name, table] = matches[0];
    resultDiv.textContent = `${toTitleCase(name)} is seated at Table ${table}.`;
    resultDiv.style.color = '#395754';
  } else {
    resultDiv.innerHTML = `
      <strong>Multiple guests found:</strong><br />
      ${matches
        .map(([name, table]) => `${toTitleCase(name)} → Table ${table}`)
        .join('<br>')}
    `;
    resultDiv.style.color = '#395754';
  }
}

// Helper: Convert "alice smith" → "Alice Smith"
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}
