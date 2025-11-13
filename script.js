// script.js (Revised for final product view with Add to Cart)
document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("categoryGrid");
  const megaMenuContainer = document.getElementById("megaMenuContainer");
  const mainTitle = document.querySelector('.category-section h1');
  const mainSection = document.querySelector('.category-section');

  // --- Helper: Render a list of categories (used for main grid and subgrids) ---
  const renderCategoriesGrid = (categories, title, showBackButton = false) => {
      mainTitle.textContent = title; 

      const oldBackBtn = document.querySelector('.back-btn');
      if (oldBackBtn) oldBackBtn.remove(); 
      
      if (categories.length === 0) {
        grid.innerHTML = `<p>No further categories or products found under ${title}.</p>`;
      } else {
        // Render the category cards
        grid.innerHTML = categories.map(cat => `
          <div 
            class="category-card" 
            data-category-id="${cat.id}"
            data-category-name="${cat.name}"
            onclick="handleGridCardClick(this)"
          >
            <img src="${cat.image_url || 'https://cdn-icons-png.flaticon.com/512/891/891462.png'}" alt="${cat.name}">
            <h4>${cat.name}</h4>
            <p>${cat.description || 'View Subcategories'}</p>
          </div>
        `).join('');
      }

      if (showBackButton) {
          mainSection.insertAdjacentHTML('beforeend', '<button class="btn-primary back-btn" onclick="window.location.reload()">Go Back to All Main Categories</button>');
      }
      
      document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
  };
  
  // --- NEW: Renders the Product Detail/Purchase View ---
  const renderProductView = (categoryId, categoryName) => {
      mainTitle.textContent = categoryName;

      // Remove any previous back button
      const oldBackBtn = document.querySelector('.back-btn');
      if (oldBackBtn) oldBackBtn.remove(); 

      grid.innerHTML = `
          <div class="product-detail">
              <div class="product-image">
                  <img src="https://via.placeholder.com/400x400.png?text=Product+Image" alt="${categoryName}">
              </div>
              <div class="product-info">
                  <h2>${categoryName}</h2>
                  <p class="product-sku">SKU: VNL-${categoryId}</p>
                  <p class="product-price">Price: ₹1250.00</p>
                  
                  <p class="product-description">
                      This is the final product in the category hierarchy. It is a premium bathware item 
                      with superior finishing and a 5-year warranty. Ready for instant purchase.
                  </p>
                  
                  <div class="purchase-options">
                      <div class="quantity-control">
                          <label for="qty">Quantity:</label>
                          <input type="number" id="qty" value="1" min="1" max="99">
                      </div>
                      
                      <button class="btn-primary btn-add-to-cart" onclick="alert('Added ${categoryName} to cart!')">
                          🛒 Add to Cart
                      </button>
                  </div>
              </div>
          </div>
      `;

      // Add the Go Back button below the product content
      mainSection.insertAdjacentHTML('beforeend', '<button class="btn-primary back-btn" onclick="window.location.reload()">Go Back to All Main Categories</button>');

      document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
  };


  // --- CORE ACTION: Handles both grid and menu clicks ---
  const handleCategoryAction = async (categoryId, categoryName) => {
    try {
        const res = await fetch(`http://localhost:5000/api/subcategories/${categoryId}`);
        const subcategories = await res.json();
        
        if (subcategories.length > 0) {
            // Case 1: Subcategories exist -> Render the next grid level
            renderCategoriesGrid(subcategories, `Categories under ${categoryName}`, true);
        } else {
            // Case 2: No subcategories found -> This is the product page
            renderProductView(categoryId, categoryName);
        }
        
    } catch (err) {
        console.error(`Error fetching subcategories for ID ${categoryId}:`, err);
        grid.innerHTML = `
            <p>⚠️ Failed to load data for ${categoryName}.</p>
            <button class="btn-primary" onclick="window.location.reload()">Go Back to All Main Categories</button>
        `;
    }
  };
  
  // --- Other Initialization Functions (Unchanged) ---
  const loadMainCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      renderCategoriesGrid(data, "All Categories", false);
    } catch (err) {
      console.error("Error loading main categories:", err);
      grid.innerHTML = "<p>⚠️ Failed to load categories grid. Check your server.</p>";
    }
  };
  
  const handleMenuLinkClick = (event) => {
    event.preventDefault(); 
    const link = event.currentTarget;
    handleCategoryAction(link.dataset.categoryId, link.dataset.categoryName);
  };
  
  const addMenuClickListeners = () => {
    const links = document.querySelectorAll('.category-link');
    links.forEach(link => {
      link.addEventListener('click', handleMenuLinkClick);
    });
  };

  window.handleGridCardClick = (element) => {
    const categoryId = element.dataset.categoryId;
    const categoryName = element.dataset.categoryName;
    handleCategoryAction(categoryId, categoryName);
  }

  // Mega Menu logic (omitted for brevity, assume correct)
  const buildMenuHTML = (categories, level = 1) => {
    if (!categories || categories.length === 0) return '';
    const levelClass = `level-${level}`;
    let html = `<ul class="${levelClass}">`;
    for (const category of categories) {
      const hasChildren = category.children && category.children.length > 0;
      html += `
        <li>
          <a href="#" class="category-link" data-category-id="${category.id}" data-category-name="${category.name}">
            ${category.name} ${hasChildren ? '▶' : ''}
          </a>
          ${buildMenuHTML(category.children, level + 1)}
        </li>
      `;
    }
    html += '</ul>';
    return html;
  };

  const loadMegaMenu = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/mega-menu-categories");
      const nestedCategories = await res.json();
      const menuHTML = nestedCategories.map(cat => {
        const hasChildren = cat.children && cat.children.length > 0;
        return `
          <li>
            <a href="#" class="category-link" data-category-id="${cat.id}" data-category-name="${cat.name}">
              ${cat.name} ${hasChildren ? '▶' : ''}
            </a>
            ${buildMenuHTML(cat.children, 2)}
          </li>
        `;
      }).join('');
      megaMenuContainer.innerHTML = menuHTML;
      addMenuClickListeners(); 
    } catch (err) {
      console.error("Error loading mega menu:", err);
      megaMenuContainer.innerHTML = "<li><a href='#'>⚠️ Failed to load menu. Check your server.</a></li>";
    }
  };
  
  // --- Initialize on Load ---
  loadMainCategories();
  loadMegaMenu();
});