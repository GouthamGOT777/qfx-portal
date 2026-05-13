# QFX Product Portal

A professional, fully-featured QFX Product Management System built with HTML, CSS, and JavaScript with JSON-based data storage.

## 🎯 Features

### Authentication System
- **Dual Role Access**:
  - 👤 **Guest Mode**: View-only access to all content
  - 🔐 **Admin Mode**: Full read/write access with editing capabilities
  
- **Admin Authentication**:
  - Email/Password login
  - Signup with secret key validation
  - Secret Key: `QFX HPE JNP BNG`
  - Session persistence
  - Secure logout

### Admin Edit Mode
- **Full Page Editability**: Click any text element to edit inline
- **Real-time Updates**: Changes save immediately to localStorage
- **Add Products**: Create new QFX products dynamically
- **Delete Products**: Remove products completely
- **Edit All Sections**: Modify content across all pages and sections
- **Sections Include**:
  - Product Overview
  - Specifications
  - Features
  - Documentation (Device Essentials, Set Up, Manage)
  - Hardware Compatibility (Transceivers, Power Supplies, Cables, Adapters, Rack Mounting)
  - Supported Releases
  - Product Roadmap (SOPD)

### Content Management
- **Products**: Browse and manage QFX product catalog
- **Dashboard**: Real-time statistics and quick access
- **Documentation**: Organized by category
- **Features**: Comprehensive feature listings
- **Hardware Compatibility**: Detailed hardware specifications
- **Specifications**: Technical specifications for all products
- **Releases**: Supported OS releases
- **Roadmap**: Product development roadmap

### Data Management
- **JSON-Based Storage**: All data stored in browser's localStorage
- **No Backend Required**: Complete client-side operation
- **Data Export**: Download all data as JSON backup
- **Data Import**: Restore from JSON backups
- **Default Sample Data**: Pre-loaded with 2 QFX products (QFX5100, QFX5200)

### UI/UX
- **Professional Design**: Modern, clean interface
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Color-Coded Navigation**: Intuitive menu system
- **Smooth Animations**: Fade and slide effects
- **Tab-Based Navigation**: Organized content sections
- **Expandable Categories**: Collapsible content sections
- **Real-time Stats**: Dashboard with live metrics

## 🚀 Getting Started

### Installation
1. Download all 6 files:
   - `index.html`
   - `styles.css`
   - `auth.js`
   - `app.js`
   - `data.js`
   - `README.md` (this file)

2. Place all files in the same directory

3. Open `index.html` in any modern web browser

**That's it! No server or installation required.**

### First Time Setup

#### Option 1: Guest Access
1. Click "Continue as Guest"
2. Browse all content (read-only)
3. Cannot make changes

#### Option 2: Create Admin Account
1. Click "Login as Admin"
2. Click "Create Account"
3. Fill in details:
   - **Full Name**: Your name
   - **Email**: your@email.com
   - **Password**: Your password
   - **Secret Key**: `QFX HPE JNP BNG`
4. Click "Create Admin Account"
5. Automatically logged in as Admin

#### For Returning Admin Users
1. Click "Login as Admin"
2. Enter your email and password
3. Click "Login"

## 📱 Admin Features

### Enable Edit Mode
1. After logging in as Admin
2. Click "✏️ Edit Mode" button (appears in top right)
3. Button turns green "✓ Exit Edit Mode"
4. All text becomes editable

### Edit Any Content
1. With Edit Mode enabled, click any text
2. Text becomes editable (blue dashed border)
3. Type your changes
4. Press Enter or click outside to save
5. Changes save automatically to localStorage

### Add New Product
1. Click "+ Add Product" in Admin Tools (sidebar)
2. Enter product name when prompted
3. Enter product description
4. New product created and ready to edit
5. Click the product to edit all details

### Delete Products
1. Select a product to view details
2. In Admin Edit Mode, click "🗑️ Delete Product" button
3. Confirm deletion
4. Product removed from catalog

### Export Data
1. Click "💾 Export Data" button in Admin Tools
2. JSON file downloads with current date
3. Use for backup and data portability

### Import Data
1. Click "📥 Import Data" button in Admin Tools
2. Select a previously exported JSON file
3. Data imports and page reloads
4. All products and settings restored

## 📊 Dashboard

Real-time statistics showing:
- Total QFX Products
- Documentation Pages
- Total Features
- Hardware Items
- Recent Products Quick Access

## 🗂️ Product Sections

### Overview
- Product name and description
- High-level overview of capabilities

### Specifications
- Technical specifications
- Ports and throughput
- Power consumption
- Dimensions and weight
- Operating temperature

### Features
- Key features and capabilities
- Supported protocols
- Advanced functionality

### Documentation
1. **Device Essentials**
   - Product overview
   - Component descriptions
   - Basic requirements

2. **Set Up**
   - Installation procedures
   - Rack mounting
   - Power connections
   - Initial configuration

3. **Manage**
   - Operational management
   - Monitoring and maintenance
   - Troubleshooting
   - Firmware updates

### Hardware Compatibility
1. **Transceivers**
   - Model numbers
   - Specifications
   - Supported distances

2. **Power Supplies (PSM)**
   - Power supply modules
   - Redundancy options
   - Specifications

3. **Power Cords/Cables**
   - Cable types and models
   - Specifications
   - Compatibility

4. **Adapters**
   - Adapter models
   - Port conversion
   - Compatibility

5. **Rack Mounting Kits**
   - Mounting hardware
   - Rail systems
   - Installation guides

### Supported Releases
- Junos OS versions supported
- Feature compatibility per release
- Security patch levels

### Roadmap (SOPD)
- Current generation products
- Planned enhancements
- Future development

## 💾 Data Storage

### Local Storage Keys
- `qfx_portal_data` - All products and documentation (JSON)
- `qfx_admins` - Admin account credentials
- `qfx_current_user` - Currently logged-in user
- `qfx_user_role` - User role (admin/guest)

### Sample Data Structure
```json
{
  "products": [
    {
      "id": "qfx5100",
      "name": "QFX5100",
      "description": "48x 1G / 32x 10G Ethernet Switch",
      "overview": "...",
      "specifications": { ... },
      "features": [ ... ],
      "documentation": { ... },
      "hardware": { ... },
      "supportedReleases": [ ... ],
      "roadmap": { ... },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## 🔒 Security Features

✅ **Admin-Only Access**: Edit mode requires admin authentication  
✅ **Secret Key Validation**: `QFX HPE JNP BNG` required for admin signup  
✅ **Role-Based UI**: Different features for admin vs. guest  
✅ **Session Persistence**: Remember logged-in admin users  
✅ **Logout Functionality**: Clear session and return to login  

**⚠️ Note**: For production use, implement:
- Server-side password hashing (bcrypt, scrypt)
- HTTPS encryption
- Backend session management
- Database security
- Rate limiting on admin operations

## 📱 Responsive Design

### Desktop
- Full multi-column layout
- Optimized navigation
- All features visible

### Tablet
- Adaptive grid layout
- Touch-friendly buttons
- Collapsible sidebar

### Mobile
- Single-column layout
- Stack-based navigation
- Optimized for touch
- Readable text sizes

## ⌨️ Keyboard Shortcuts

- `Escape` - Close modals and dialogs
- `Tab` - Navigate form fields
- `Enter` - Submit forms or save edits

## 🐛 Troubleshooting

### Data Not Saving
- Check browser localStorage is enabled
- Verify sufficient storage space
- Try clearing cache and reload

### Cannot Login
- Verify email matches signup email
- Check password is correct
- Try resetting in browser dev tools

### Edit Mode Not Working
- Ensure you're logged in as Admin
- Check browser console for errors
- Try refreshing the page

### Export/Import Issues
- Verify JSON file format is valid
- Ensure file is from same application
- Try with smaller datasets first

## 🔧 Customization

### Change Secret Key
Edit `auth.js` line 5:
```javascript
const SECRET_KEY = "Your New Secret Key";
```

### Modify Colors
Edit `styles.css` CSS variables:
```css
:root {
    --primary-color: #0066cc;
    --primary-light: #0080ff;
    /* ... other colors ... */
}
```

### Add New Sections
1. Add HTML in `index.html`
2. Create render function in `app.js`
3. Add navigation button in sidebar

## 📋 Browser Compatibility

✅ **Chrome** 90+  
✅ **Firefox** 88+  
✅ **Safari** 14+  
✅ **Edge** 90+  
✅ **Mobile browsers** (modern versions)

## 📝 License

This application is created for managing QFX product information. All content and specifications should comply with Juniper Networks' intellectual property policies.

## 🤝 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review browser console for errors
3. Verify data structure in localStorage
4. Check browser developer tools

## 📈 Future Enhancements

Possible additions:
- User roles and permissions
- Advanced search functionality
- Bulk data operations
- Version history tracking
- Collaborative editing
- API integration
- Mobile app version
- Real-time synchronization

---

**QFX Product Portal v1.0**  
*Professional Product Management System*
