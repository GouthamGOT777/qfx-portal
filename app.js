// Main Application Logic

let currentProduct = null;
let editMode = false;
let editingElement = null;

// Initialize Application
function initializeApp() {
    const hasSession = authManager.loadSession();
    
    if (authManager.isAdmin()) {
        // Show admin interface
        document.getElementById('appContainer').classList.add('active');
        document.getElementById('editModeBtn').style.display = 'inline-flex';
        document.getElementById('logoutBtn').style.display = 'inline-flex';
        document.getElementById('adminTools').style.display = 'block';
        document.getElementById('userStatus').textContent = `Logged in as: ${authManager.getCurrentUser().name}`;
        document.getElementById('deleteProductContainer').style.display = 'block';
    } else {
        // Show guest interface
        document.getElementById('appContainer').classList.add('active');
        document.getElementById('editModeBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline-flex';
        document.getElementById('adminTools').style.display = 'none';
        document.getElementById('userStatus').textContent = 'Guest Access';
        document.getElementById('deleteProductContainer').style.display = 'none';
    }

    renderDashboard();
    renderProducts();
}

// Section Navigation
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(s => {
        s.classList.remove('active');
    });

    // Hide product details
    document.getElementById('productDetailsSection').style.display = 'none';

    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show selected section
    const sectionId = section + 'Section';
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
        sectionElement.classList.add('active');
        sectionElement.style.display = 'block';
    }
}

// Dashboard Rendering
function renderDashboard() {
    const stats = dataManager.getStatistics();
    document.getElementById('totalProducts').textContent = stats.totalProducts;
    document.getElementById('totalDocumentation').textContent = stats.totalDocumentation;
    document.getElementById('totalFeatures').textContent = stats.totalFeatures;
    document.getElementById('totalHardware').textContent = stats.totalHardware;

    // Recent Products
    const products = dataManager.getProducts().slice(0, 3);
    const recentHTML = `
        <div style="margin-top: 30px;">
            <h3 style="margin-bottom: 15px;">Recent Products</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                ${products.map(p => `
                    <div style="background: white; padding: 15px; border-radius: 8px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                         onclick="selectProduct('${p.id}')">
                        <strong>${p.name}</strong>
                        <p style="font-size: 12px; color: #666; margin-top: 5px;">${p.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.getElementById('recentProducts').innerHTML = recentHTML;
}

// Products List Rendering
function renderProducts() {
    const products = dataManager.getProducts();
    const productsHTML = products.map(product => `
        <div class="product-card" onclick="selectProduct('${product.id}')">
            <div class="product-card-header">
                <div class="product-card-title">${product.name}</div>
                <div class="product-card-desc">${product.description}</div>
            </div>
            <div class="product-card-body">
                <div class="product-card-meta">Created: ${new Date(product.createdAt).toLocaleDateString()}</div>
                <button class="btn btn-primary product-card-button">View Details →</button>
            </div>
        </div>
    `).join('');

    document.getElementById('productsList').innerHTML = productsHTML || '<p>No products available</p>';
}

// Select Product and Show Details
function selectProduct(productId) {
    currentProduct = dataManager.getProduct(productId);
    
    if (currentProduct) {
        document.getElementById('productsSection').style.display = 'none';
        document.getElementById('productDetailsSection').style.display = 'block';
        document.getElementById('productName').textContent = currentProduct.name;
        
        renderProductTabs();
    }
}

// Render Product Tabs
function renderProductTabs() {
    renderOverview();
    renderSpecifications();
    renderFeatures();
    renderDocumentation();
    renderHardware();
    renderReleases();
    renderRoadmap();
}

// Tab Switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const tabId = tabName + 'Tab';
    const tabElement = document.getElementById(tabId);
    if (tabElement) {
        tabElement.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Overview Tab
function renderOverview() {
    const html = `
        <div class="editable-content">
            <h3>Product Overview</h3>
            <p>${currentProduct.overview}</p>
        </div>
    `;
    document.getElementById('overviewContent').innerHTML = html;
    makeEditable('overviewContent');
}

// Specifications Tab
function renderSpecifications() {
    const specs = currentProduct.specifications;
    const html = `
        <div class="editable-content">
            <h3>Technical Specifications</h3>
            <table style="width: 100%; border-collapse: collapse;">
                ${Object.entries(specs).map(([key, value]) => `
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px; font-weight: 600; width: 30%;">${key.replace(/([A-Z])/g, ' $1').trim()}</td>
                        <td style="padding: 10px;">${value}</td>
                    </tr>
                `).join('')}
            </table>
        </div>
    `;
    document.getElementById('specificationsContent').innerHTML = html;
    makeEditable('specificationsContent');
}

// Features Tab
function renderFeatures() {
    const html = `
        <div class="editable-content">
            <h3>Key Features</h3>
            <ul>
                ${currentProduct.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    `;
    document.getElementById('featuresContent').innerHTML = html;
    makeEditable('featuresContent');
}

// Documentation Tab
function renderDocumentation() {
    const docs = currentProduct.documentation;
    const html = `
        <div class="editable-content">
            <h3>Device Essentials</h3>
            <p>${docs.deviceEssentials}</p>
            
            <h3>Set Up</h3>
            <p>${docs.setUp}</p>
            
            <h3>Manage</h3>
            <p>${docs.manage}</p>
        </div>
    `;
    document.getElementById('documentationContent').innerHTML = html;
    makeEditable('documentationContent');
}

// Hardware Tab
function renderHardware() {
    const hw = currentProduct.hardware;
    const html = `
        <div class="editable-content">
            <h3>Transceivers</h3>
            <p>${hw.transceivers.join(', ')}</p>
            
            <h3>Power Supplies</h3>
            <p>${hw.powerSupplies.join(', ')}</p>
            
            <h3>Cables</h3>
            <p>${hw.cables.join(', ')}</p>
            
            <h3>Adapters</h3>
            <p>${hw.adapters.join(', ')}</p>
            
            <h3>Rack Mounting</h3>
            <p>${hw.rackMounting.join(', ')}</p>
        </div>
    `;
    document.getElementById('hardwareContent').innerHTML = html;
    makeEditable('hardwareContent');
}

// Releases Tab
function renderReleases() {
    const html = `
        <div class="editable-content">
            <h3>Supported Releases</h3>
            <ul>
                ${currentProduct.supportedReleases.map(release => `<li>${release}</li>`).join('')}
            </ul>
        </div>
    `;
    document.getElementById('releasesContent').innerHTML = html;
    makeEditable('releasesContent');
}

// Roadmap Tab
function renderRoadmap() {
    const html = `
        <div class="editable-content">
            <h3>Product Roadmap (SOPD)</h3>
            <p>${currentProduct.roadmap}</p>
        </div>
    `;
    document.getElementById('roadmapContent').innerHTML = html;
    makeEditable('roadmapContent');
}

// Edit Mode Toggle
function toggleEditMode() {
    if (!authManager.isAdmin()) return;

    editMode = !editMode;
    const btn = document.getElementById('editModeBtn');
    
    if (editMode) {
        btn.textContent = '✓ Exit Edit Mode';
        btn.classList.add('active');
        document.querySelectorAll('.editable-content').forEach(el => {
            makeEditable(el.id);
        });
    } else {
        btn.textContent = '✏️ Edit Mode';
        btn.classList.remove('active');
        saveCurrentEdits();
    }
}

// Make Content Editable
function makeEditable(elementId) {
    if (!editMode || !authManager.isAdmin()) return;

    const element = document.getElementById(elementId);
    if (!element) return;

    element.querySelectorAll('p, li, td:last-child').forEach(el => {
        if (el.textContent.trim() && !el.classList.contains('editable-text')) {
            el.classList.add('editable-text');
            el.style.cursor = 'pointer';
            
            el.addEventListener('click', (e) => {
                if (!editMode) return;
                e.stopPropagation();
                enableInlineEdit(el);
            });
        }
    });
}

// Enable Inline Editing
function enableInlineEdit(element) {
    if (editingElement) return; // Only one edit at a time
    
    const originalText = element.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalText;
    input.className = 'editing-input';
    
    element.textContent = '';
    element.appendChild(input);
    input.focus();
    
    const saveEdit = () => {
        const newText = input.value || originalText;
        element.textContent = newText;
        element.classList.remove('editing');
        editingElement = null;
        updateProductData();
    };
    
    input.addEventListener('blur', saveEdit);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveEdit();
    });
    
    element.classList.add('editing');
    editingElement = element;
}

// Update Product Data
function updateProductData() {
    if (!currentProduct) return;
    
    const tabs = {
        overview: document.getElementById('overviewContent').textContent,
        specifications: document.getElementById('specificationsContent').textContent,
        features: document.getElementById('featuresContent').textContent,
        documentation: document.getElementById('documentationContent').textContent,
        hardware: document.getElementById('hardwareContent').textContent,
        releases: document.getElementById('releasesContent').textContent,
        roadmap: document.getElementById('roadmapContent').textContent
    };
    
    currentProduct.overview = tabs.overview;
    dataManager.updateProduct(currentProduct.id, currentProduct);
}

// Save Current Edits
function saveCurrentEdits() {
    if (currentProduct) {
        updateProductData();
        showMessage('Changes saved successfully!', 'success');
    }
}

// Add Product
function showAddProductForm() {
    const name = prompt('Enter product name:');
    if (!name) return;
    
    const description = prompt('Enter product description:');
    if (!description) return;
    
    dataManager.addProduct(name, description);
    renderProducts();
    showMessage('Product added successfully!', 'success');
}

// Delete Product
function deleteProduct() {
    if (!currentProduct) return;
    
    if (confirm(`Are you sure you want to delete "${currentProduct.name}"?`)) {
        dataManager.deleteProduct(currentProduct.id);
        document.getElementById('productDetailsSection').style.display = 'none';
        document.getElementById('productsSection').style.display = 'block';
        renderProducts();
        showMessage('Product deleted successfully!', 'success');
    }
}

// Export Data
function exportData() {
    dataManager.exportData();
    showMessage('Data exported successfully!', 'success');
}

// Import Data
function showImportForm() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                dataManager.importData(event.target.result);
                location.reload();
                showMessage('Data imported successfully!', 'success');
            } catch (error) {
                showMessage(error.message, 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Message Toast Function
function showMessage(message, type = 'success') {
    const toast = document.getElementById('messageToast');
    toast.textContent = message;
    toast.className = `message-toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const hasSession = authManager.loadSession();
    
    if (hasSession && authManager.isAdmin()) {
        document.getElementById('landingPage').classList.add('hidden');
        initializeApp();
    } else if (authManager.isGuest()) {
        document.getElementById('landingPage').classList.add('hidden');
        initializeApp();
    }
});
