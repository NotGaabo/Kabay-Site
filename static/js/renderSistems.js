export async function renderSystems() {
  try {
    const response = await fetch('/data/data.json');
    const data = await response.json();

    const container = document.getElementById('systems-container');

    data.projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'flex flex-col justify-between p-6 bg-white rounded-lg shadow';

      card.innerHTML = `
        <h2 class="mb-2 text-xl font-bold">${project.name}</h2>
        <p class="mb-4 text-gray-600">${project.tagline}</p>
        <a href="http://127.0.0.1:5500/templates/home/services/services_template.html?id=${project.id}" class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          See more
        </a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading data.json:', error);
  }
}

// Call the function to execute
renderSystems();