const fs = require('fs');
const path = './production_company_ids_11_22_2024.json';

// Read the JSON file
fs.readFile(path, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Basic fix attempt: Manually wrap and add commas using regex
  try {
    // Remove any trailing commas in an array
    data = data.replace(/,\s*([\]}])/g, '$1');

    // Replace any missing commas between adjacent objects
    data = data.replace(/}\s*{/g, '},\n{');

    // Add brackets to wrap "data" if they are missing
    if (!data.trim().startsWith('{')) {
      data = `{\n  "data": [\n${data.trim()}\n]\n}`;
    }

    // Verify if the resulting data is valid JSON
    JSON.parse(data);

    // Write the fixed JSON back to file
    fs.writeFile(path, data, (writeErr) => {
      if (writeErr) {
        console.error('Error writing the file:', writeErr);
      } else {
        console.log('File updated and formatted successfully!');
      }
    });

  } catch (parseError) {
    console.error('Error parsing the JSON:', parseError);
    console.error('Please check the JSON format and try again.');
  }
});
