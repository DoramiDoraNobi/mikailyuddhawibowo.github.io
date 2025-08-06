// Sample AI Generated Images Data
const aiImages = [
  {
    id: 1,
    title: "Cyberpunk Portrait",
    description: "Futuristic portrait with neon lighting and cyberpunk aesthetics",
    tags: ["leonardo", "portrait", "sci-fi", "digital-art"],
    prompt: "A futuristic cyberpunk portrait of a young woman with neon blue hair, glowing eyes, wearing high-tech goggles, city lights reflecting in background, ultra detailed, 8k resolution",
    imageUrl: "https://via.placeholder.com/400x300/2563eb/ffffff?text=Cyberpunk+Portrait",
    featured: true
  },
  {
    id: 2,
    title: "Fantasy Landscape",
    description: "Mystical forest with magical elements and ethereal lighting",
    tags: ["leonardo", "landscape", "fantasy", "concept-art"],
    prompt: "Enchanted forest with glowing mushrooms, fairy lights, misty atmosphere, ancient trees, magical creatures, fantasy art style, detailed illustration",
    imageUrl: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Fantasy+Landscape",
    featured: false
  },
  {
    id: 3,
    title: "Abstract Digital Art",
    description: "Geometric abstract composition with vibrant colors",
    tags: ["leonardo", "abstract", "digital-art"],
    prompt: "Abstract geometric composition, flowing shapes, vibrant gradients, modern digital art, 3D rendered, colorful, contemporary design",
    imageUrl: "https://via.placeholder.com/400x300/059669/ffffff?text=Abstract+Art",
    featured: true
  },
  {
    id: 4,
    title: "Sci-Fi Cityscape",
    description: "Futuristic city with flying vehicles and towering buildings",
    tags: ["leonardo", "landscape", "sci-fi", "concept-art"],
    prompt: "Futuristic cityscape with flying cars, holographic advertisements, towering skyscrapers, neon lights, cyberpunk atmosphere, concept art style",
    imageUrl: "https://via.placeholder.com/400x300/dc2626/ffffff?text=Sci-Fi+City",
    featured: false
  },
  {
    id: 5,
    title: "Character Design",
    description: "Fantasy character with detailed armor and weapons",
    tags: ["leonardo", "portrait", "fantasy", "concept-art"],
    prompt: "Fantasy warrior character, detailed armor, mystical weapons, heroic pose, concept art style, high resolution, professional illustration",
    imageUrl: "https://via.placeholder.com/400x300/7c3aed/ffffff?text=Character+Design",
    featured: true
  },
  {
    id: 6,
    title: "Space Exploration",
    description: "Astronaut exploring alien planet with stunning vista",
    tags: ["leonardo", "landscape", "sci-fi", "digital-art"],
    prompt: "Astronaut on alien planet, two moons in sky, exotic rock formations, space suit reflection, cosmic vista, detailed space art, photorealistic",
    imageUrl: "https://via.placeholder.com/400x300/0891b2/ffffff?text=Space+Scene",
    featured: false
  },
  {
    id: 7,
    title: "Digital Portrait",
    description: "Realistic portrait with artistic digital painting style",
    tags: ["leonardo", "portrait", "digital-art"],
    prompt: "Digital portrait painting, realistic style, soft lighting, artistic brush strokes, professional artwork, detailed facial features, contemporary art",
    imageUrl: "https://via.placeholder.com/400x300/ea580c/ffffff?text=Digital+Portrait",
    featured: true
  },
  {
    id: 8,
    title: "Abstract Landscape",
    description: "Stylized landscape with abstract elements and bold colors",
    tags: ["leonardo", "landscape", "abstract", "digital-art"],
    prompt: "Abstract landscape interpretation, bold colors, stylized mountains, geometric clouds, modern art style, digital painting technique",
    imageUrl: "https://via.placeholder.com/400x300/be185d/ffffff?text=Abstract+Landscape",
    featured: false
  }
];

// Global variables
let currentFilter = 'all';
let currentSearch = '';
let displayedImages = 0;
const imagesPerLoad = 6;

// DOM elements
const galleryGrid = document.getElementById('galleryGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterTags = document.querySelectorAll('.filter-tag');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');
const modalPrompt = document.getElementById('modalPrompt');
const closeModal = document.getElementById('closeModal');

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
  updateTagCounts();
  displayImages();
  setupEventListeners();
});

// Update tag counts
function updateTagCounts() {
  const tagCounts = {};
  
  aiImages.forEach(image => {
    image.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  // Update all count
  document.getElementById('count-all').textContent = aiImages.length;
  
  // Update individual tag counts
  Object.keys(tagCounts).forEach(tag => {
    const countElement = document.getElementById(`count-${tag}`);
    if (countElement) {
      countElement.textContent = tagCounts[tag];
    }
  });
}

// Filter images based on current criteria
function getFilteredImages() {
  return aiImages.filter(image => {
    const matchesFilter = currentFilter === 'all' || image.tags.includes(currentFilter);
    const matchesSearch = currentSearch === '' || 
      image.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
      image.description.toLowerCase().includes(currentSearch.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(currentSearch.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });
}

// Display images in grid
function displayImages(append = false) {
  const filteredImages = getFilteredImages();
  
  if (!append) {
    galleryGrid.innerHTML = '';
    displayedImages = 0;
  }
  
  const imagesToShow = filteredImages.slice(displayedImages, displayedImages + imagesPerLoad);
  
  if (imagesToShow.length === 0 && displayedImages === 0) {
    galleryGrid.innerHTML = `
      <div class="no-results">
        <h3>No images found</h3>
        <p>Try adjusting your search criteria or filter selection.</p>
      </div>
    `;
    loadMoreBtn.style.display = 'none';
    return;
  }
  
  imagesToShow.forEach(image => {
    const imageElement = createImageElement(image);
    galleryGrid.appendChild(imageElement);
  });
  
  displayedImages += imagesToShow.length;
  
  // Show/hide load more button
  if (displayedImages >= filteredImages.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

// Create image element
function createImageElement(image) {
  const div = document.createElement('div');
  div.className = 'gallery-item';
  div.dataset.imageId = image.id;
  
  div.innerHTML = `
    <div class="gallery-item-image">
      <img src="${image.imageUrl}" alt="${image.title}" loading="lazy">
    </div>
    <div class="gallery-item-info">
      <h3 class="gallery-item-title">${image.title}</h3>
      <p class="gallery-item-description">${image.description}</p>
      <div class="gallery-item-tags">
        ${image.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `;
  
  // Add click event to open modal
  div.addEventListener('click', () => openModal(image));
  
  return div;
}

// Open modal with image details
function openModal(image) {
  modalImage.src = image.imageUrl;
  modalTitle.textContent = image.title;
  modalDescription.textContent = image.description;
  modalTags.innerHTML = image.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
  modalPrompt.textContent = image.prompt;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalFunction() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  // Filter tags
  filterTags.forEach(tag => {
    tag.addEventListener('click', function() {
      // Remove active class from all tags
      filterTags.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tag
      this.classList.add('active');
      
      currentFilter = this.dataset.tag;
      displayImages();
    });
  });
  
  // Load more button
  loadMoreBtn.addEventListener('click', function() {
    displayImages(true);
  });
  
  // Modal events
  closeModal.addEventListener('click', closeModalFunction);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModalFunction();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModalFunction();
    }
  });
}

// Perform search
function performSearch() {
  currentSearch = searchInput.value.trim();
  displayImages();
}

// Smooth scroll animation for gallery items
function animateGalleryItems() {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('animate-in');
  });
}

// Add animation class to CSS
const style = document.createElement('style');
style.textContent = `
  .gallery-item {
    opacity: 0;
    transform: translateY(30px);
    animation: slideInUp 0.6s ease forwards;
  }
  
  @keyframes slideInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Call animation after images are loaded
setTimeout(animateGalleryItems, 100);
