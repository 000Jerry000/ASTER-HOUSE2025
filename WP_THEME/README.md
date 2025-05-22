# Aster House WordPress Theme

A custom WordPress theme for real estate and property management websites.

## Features

- Custom post types for Properties and Works
- Custom taxonomies for Property Categories, Property Features, Work Categories, and Work Features
- Custom meta boxes for property and work details
- Responsive design
- Widget areas in sidebar and footer
- Gallery support for properties and works
- Instagram feed integration

## Installation

1. Download the theme files
2. Upload the theme folder to your WordPress installation's `wp-content/themes` directory
3. Activate the theme through the WordPress admin panel

## Theme Structure

```
WP_THEME/
├── css/
│   ├── style.css
│   ├── sp.css
│   ├── animation.css
│   ├── tab.css
│   ├── common.css
│   └── reset.css
├── js/
│   ├── script.js
│   ├── index.js
│   └── instagram-feed.js
├── inc/
│   ├── property-meta.php
│   └── works-meta.php
├── template-parts/
│   ├── content.php
│   └── content-none.php
├── style.css
├── functions.php
├── header.php
├── footer.php
├── index.php
├── single.php
├── page.php
├── search.php
├── sidebar.php
├── single-property.php
├── archive-property.php
├── single-works.php
├── archive-works.php
└── README.md
```

## Custom Post Types

### Properties

Properties are real estate listings with the following features:
- Title and description
- Featured image
- Gallery images
- Price
- Location
- Number of bedrooms and bathrooms
- Area
- Categories and features

### Works

Works are project showcases with the following features:
- Title and description
- Featured image
- Gallery images
- Client information
- Date
- Location
- Size
- Categories and features

## Custom Taxonomies

### Property Categories
Hierarchical taxonomy for organizing properties by type (e.g., House, Apartment, Land)

### Property Features
Hierarchical taxonomy for property features (e.g., Pool, Garden, Garage)

### Work Categories
Hierarchical taxonomy for organizing works by type (e.g., Residential, Commercial, Renovation)

### Work Features
Hierarchical taxonomy for work features (e.g., Modern, Traditional, Sustainable)

## Widget Areas

- Sidebar: Main sidebar widget area
- Footer: Footer widget area

## Theme Customization

The theme can be customized through the WordPress Customizer:
- Site identity (logo, title, tagline)
- Colors
- Menus
- Widgets
- Homepage settings

## Requirements

- WordPress 5.0 or higher
- PHP 7.0 or higher
- MySQL 5.6 or higher

## Support

For support, please contact the theme developer or create an issue in the theme's repository.

## License

This theme is licensed under the GNU General Public License v2 or later. 