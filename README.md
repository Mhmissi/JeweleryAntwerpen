# JeweleryAntwerpen 🏺💎

A premium jewelry webshop built with React and TypeScript, showcasing authentic Belgian craftsmanship and luxury jewelry pieces.

## ✨ Features

- **Modern React Architecture**: Built with React 18, TypeScript, and modern hooks
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **Security-First**: Comprehensive security measures including XSS protection, CSP headers, and secure authentication
- **Theme Support**: Light/dark mode with system preference detection
- **Shopping Cart**: Full-featured cart with local storage persistence
- **User Authentication**: Secure login/registration system
- **Product Management**: Comprehensive product catalog with filtering and search
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance**: Lazy loading, code splitting, and optimized builds

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jewelery-antwerpen.git
cd jewelery-antwerpen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Navigation header
│   ├── Footer/         # Site footer
│   └── UI/             # Common UI components
├── context/            # React context providers
│   ├── AuthContext.tsx # Authentication state
│   ├── CartContext.tsx # Shopping cart state
│   └── ThemeContext.tsx # Theme management
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── Home/           # Homepage
│   ├── Products/       # Product catalog
│   ├── Auth/           # Authentication pages
│   └── ...             # Other pages
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── styles/             # Global styles and CSS variables
└── assets/             # Static assets
```

## 🛡️ Security Features

- **Content Security Policy (CSP)**: Prevents XSS attacks
- **Input Sanitization**: All user inputs are properly sanitized
- **Secure Token Storage**: JWT tokens stored securely in localStorage
- **HTTPS Enforcement**: Security headers for production
- **XSS Protection**: Built-in XSS prevention measures
- **CSRF Protection**: Token-based CSRF protection
- **Secure Headers**: Comprehensive security headers

## 🎨 Design System

The project uses a comprehensive design system with:

- **CSS Variables**: Consistent theming and spacing
- **Component Library**: Reusable UI components
- **Responsive Grid**: Mobile-first responsive design
- **Typography Scale**: Consistent font sizes and weights
- **Color Palette**: Semantic color system
- **Spacing System**: Consistent spacing using CSS custom properties

## 🔧 Configuration

### TypeScript Configuration
- Strict mode enabled
- Modern ES2020 target
- Comprehensive type checking
- Source maps for debugging

### ESLint Configuration
- TypeScript support
- React best practices
- Accessibility rules
- Security-focused rules

### Webpack Configuration
- TypeScript compilation
- CSS processing
- Asset optimization
- Development server with hot reload

## 📱 Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Breakpoint system: 480px, 768px, 1024px
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all device sizes

## 🌙 Theme System

- **Light Theme**: Clean, professional appearance
- **Dark Theme**: Easy on the eyes
- **Auto Detection**: Follows system preferences
- **Smooth Transitions**: Elegant theme switching

## 🛒 Shopping Features

- **Product Catalog**: Comprehensive product listings
- **Shopping Cart**: Persistent cart with local storage
- **User Accounts**: Secure user registration and login
- **Order Management**: Complete order lifecycle
- **Wishlist**: Save favorite products
- **Search & Filtering**: Advanced product discovery

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading of routes
- **Bundle Optimization**: Webpack optimization
- **Image Optimization**: Responsive images
- **Caching**: Efficient caching strategies
- **Minification**: Production build optimization

## 📊 Browser Support

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- TypeScript team for type safety
- Belgian jewelry craftsmanship heritage
- Open source community

## 📞 Support

For support and questions:

- Email: info@jeweleryantwerpen.be
- Phone: +32 3 123 45 67
- Address: Antwerp, Belgium

---

**JeweleryAntwerpen** - Where Belgian craftsmanship meets modern technology 💎✨

