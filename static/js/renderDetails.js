
export async function renderDetail() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('detail-container');

    if (!id) {
      container.innerHTML = '<p class="text-center text-gray-500">ID not provided.</p>';
      return;
    }

    const response = await fetch('/data/data.json');
    const data = await response.json();
    const project = data.projects.find(p => p.id === parseInt(id));

    if (!project) {
      container.innerHTML = '<p class="text-center text-gray-500">Project not found.</p>';
      return;
    }

    // Replace the entire body content with the new design
    container.innerHTML = generateProjectHTML(project);
   if (window.initFlowbite) window.initFlowbite();

    // Re-add Flowbite JS for interactivity
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js';
    document.body.appendChild(script);

  } catch (error) {
    console.error('Error loading detail:', error);
    document.getElementById('detail-container').innerHTML = '<p class="text-center text-red-500">Error loading project.</p>';
  }
}

function generateProjectHTML(project) {
  const highlights = project.highlights || [];
  const keyFeatures = project.keyFeatures || [];
  const benefits = project.benefits || {};
  const targetAudience = project.targetAudience || [];
  const contact = project.contact || {};

  // Asegurarnos de tener al menos una imagen
  const mainImage = project.imgs && project.imgs[0] ? project.imgs[0] : '/static/images/placeholder.jpg';
  const secondaryImage = project.imgs && project.imgs[1] ? project.imgs[1] : mainImage;

  // Icons para highlights
  const highlightColors = [
    { bg: 'from-emerald-500 to-emerald-600', icon: 'ph-trend-up' },
    { bg: 'from-blue-500 to-blue-600', icon: 'ph-shield-check' },
    { bg: 'from-purple-500 to-purple-600', icon: 'ph-device-mobile' },
    { bg: 'from-orange-500 to-orange-600', icon: 'ph-users-three' }
  ];

  const featureIcons = [
    'ph-qr-code', 'ph-shopping-cart', 'ph-lightning', 
    'ph-credit-card', 'ph-buildings', 'ph-chart-bar'
  ];

  return `
  <!-- Hero Section -->
  <section class="relative overflow-hidden bg-gradient-to-r from-primary-700 to-primary-900">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>
    <div class="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex flex-col items-center gap-8 lg:flex-row">
        <div class="flex-1 text-center lg:text-left">
          <span class="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary-500/30 text-primary-100">
            <i class="ph ph-star mr-2"></i>
            ${project.category || 'Proyecto'}
          </span>
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">${project.name}</h1>
          <p class="mb-6 text-xl text-primary-100">${project.tagline || ''}</p>
          <div class="flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="http://127.0.0.1:5500/templates/home/contact_form.html" class="inline-flex items-center px-6 py-3 font-semibold transition-all duration-300 bg-white rounded-lg shadow-lg text-primary-700 hover:bg-gray-100 hover:scale-105">
              <i class="ph ph-chat-circle-dots mr-2 text-lg"></i>
              Contactar
            </a>
            <a href="#features" class="inline-flex items-center px-6 py-3 font-semibold text-white transition-all duration-300 border rounded-lg bg-primary-600/50 border-primary-400/50 hover:bg-primary-600/70">
              Ver más
              <i class="ph ph-caret-down ml-2"></i>
            </a>
          </div>
        </div>
        <div class="flex-shrink-0">
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl blur-2xl opacity-40"></div>
            <img 
              src="${mainImage}" 
              alt="${project.name}" 
              class="relative object-cover w-full max-w-md border-4 shadow-2xl rounded-2xl border-white/20"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <main class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
    
    <!-- Description Card -->
    <div class="p-8 mb-10 bg-white border border-gray-100 shadow-xl rounded-2xl">
      <div class="flex items-start gap-4">
        <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl">
          <i class="ph ph-info text-2xl text-primary-600"></i>
        </div>
        <div>
          <h2 class="mb-3 text-2xl font-bold text-gray-900" id="about">Acerca del Proyecto</h2>
          <p class="text-lg leading-relaxed text-gray-600">${project.description}</p>
        </div>
      </div>
    </div>

    <!-- Highlights Strip -->
    ${highlights.length > 0 ? `
    <div class="grid grid-cols-2 gap-4 mb-10 md:grid-cols-4">
      ${highlights.map((h, i) => {
        const color = highlightColors[i % highlightColors.length];
        return `
        <div class="p-5 text-center text-white transition-transform duration-300 transform bg-gradient-to-br ${color.bg} rounded-xl hover:scale-105">
          <i class="ph ${color.icon} text-3xl mx-auto mb-2 opacity-90"></i>
          <p class="text-sm font-semibold">${h}</p>
        </div>`;
      }).join('')}
    </div>` : ''}

    <div class="grid gap-8 mb-10 lg:grid-cols-3">
      <!-- Key Features -->
      ${keyFeatures.length > 0 ? `
      <div id="features" class="overflow-hidden bg-white border border-gray-100 shadow-xl lg:col-span-2 rounded-2xl">
        <div class="px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700">
          <h3 class="flex items-center text-xl font-bold text-white">
            <i class="ph ph-sparkle mr-3 text-2xl"></i>
            Funcionalidades Clave
          </h3>
        </div>
        <div class="p-6">
          <div class="grid gap-4 sm:grid-cols-2">
            ${keyFeatures.map((f, i) => `
            <div class="flex items-start gap-3 p-4 transition-colors bg-gray-50 rounded-xl hover:bg-primary-50">
              <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100">
                <i class="ph ${featureIcons[i % featureIcons.length]} text-xl text-primary-600"></i>
              </div>
              <p class="font-medium text-gray-700">${f}</p>
            </div>`).join('')}
          </div>
        </div>
      </div>` : ''}

      <!-- Image Showcase - Ahora usa la segunda imagen real -->
      <div class="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl">
        <img 
          src="${secondaryImage}" 
          alt="Captura de ${project.name}" 
          class="object-cover w-full h-64 lg:h-80"
          loading="lazy"
        />
        <div class="p-6">
          <h4 class="mb-2 font-bold text-gray-900">Experiencia Digital</h4>
          <p class="text-sm text-gray-600">
            Plataforma intuitiva y moderna que mejora la experiencia del usuario final con diseño limpio, 
            navegación fluida y funcionalidades pensadas en la eficiencia diaria.
          </p>
        </div>
      </div>
    </div>

    <!-- Benefits Section -->
    ${(benefits.forClients || benefits.forBusinesses || benefits.forAdministrators || benefits.keyClinicalBenefits) ? `
    <div class="grid gap-6 mb-10 md:grid-cols-3">
      <!-- Aquí puedes mantener tu lógica de beneficios tal como está -->
      <!-- ... (tu código actual de beneficios está bien) ... -->
    </div>` : ''}

    <!-- Target Audience -->
    ${targetAudience.length > 0 ? `
    <div class="p-8 mb-10 text-white shadow-xl bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl">
      <h3 class="flex items-center mb-6 text-2xl font-bold">
        <i class="ph ph-users mr-3 text-3xl text-primary-400"></i>
        Audiencia Objetivo
      </h3>
      <div class="grid gap-6 md:grid-cols-3">
        ${targetAudience.map((t, i) => {
          const colors = ['bg-primary-500', 'bg-emerald-500', 'bg-orange-500'];
          const icons = ['ph-user', 'ph-storefront', 'ph-shield-check'];
          return `
          <div class="p-5 border bg-white/10 backdrop-blur rounded-xl border-white/20">
            <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-full ${colors[i % colors.length]}">
              <i class="ph ${icons[i % icons.length]} text-2xl text-white"></i>
            </div>
            <p class="text-sm font-medium leading-relaxed">${t}</p>
          </div>`;
        }).join('')}
      </div>
    </div>` : ''}
  </main>
  `;
}
// Execute the function on import
renderDetail();