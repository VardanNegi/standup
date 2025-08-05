# Standard Project Structure Template

## Basic Web Project Structure
```
project-root/
├── src/                      # Source files
│   ├── index.html           # Entry point
│   ├── assets/              # Static assets
│   │   ├── images/         
│   │   ├── icons/
│   │   └── fonts/
│   ├── styles/              # CSS files
│   │   ├── main.css        # Main stylesheet
│   │   ├── components/     # Component-specific styles
│   │   └── utils/          # Variables, mixins, utilities
│   └── scripts/            # JavaScript files
│       ├── main.js         # Main JavaScript file
│       ├── components/     # Component-specific scripts
│       └── utils/          # Utility functions
├── docs/                    # Documentation
│   ├── README.md
│   └── requirements/
├── package.json            # Project configuration
└── .gitignore             # Git ignore rules

## Initial Setup Steps

1. Create project structure:
```bash
mkdir -p src/{assets/{images,icons,fonts},styles/{components,utils},scripts/{components,utils}} docs/requirements
```

2. Initialize project:
```bash
# Initialize npm project
npm init -y

# Install development dependencies
npm install --save-dev live-server
```

3. Configure package.json:
```json
{
  "scripts": {
    "start": "live-server --port=5500 --no-browser --watch=src/**/*.{html,css,js} --entry-file=src/index.html --mount=/src:/src",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

4. Create .gitignore:
```
# Dependencies
node_modules/
package-lock.json

# Environment files
.env
.env.local
.env.*.local

# IDE files
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
/dist
/build
```

5. Add cache-busting meta tags to index.html:
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

## Best Practices

1. **File Organization**:
   - Keep related files together
   - Use clear, descriptive names
   - Separate concerns (HTML, CSS, JS)
   - Group by feature/component when possible

2. **Naming Conventions**:
   - Use kebab-case for files and folders
   - Use descriptive prefixes (e.g., `util-`, `component-`)
   - Keep names clear and meaningful

3. **Development Setup**:
   - Use consistent development server configuration
   - Include cache-busting in development
   - Set up proper file watching
   - Configure source maps

4. **Version Control**:
   - Use meaningful commit messages
   - Keep .gitignore updated
   - Commit often and logically

5. **Documentation**:
   - Maintain README.md
   - Document setup steps
   - Include requirements
   - Add comments for complex logic

## Common Extensions

1. **For TypeScript**:
   - Add `tsconfig.json`
   - Use `.ts` extensions
   - Add type definitions folder

2. **For SASS/SCSS**:
   - Use `.scss` extensions
   - Add variables and mixins folders
   - Configure preprocessor

3. **For Testing**:
   - Add `tests/` directory
   - Configure test runner
   - Add test scripts to package.json

4. **For Production**:
   - Add build configuration
   - Configure minification
   - Set up deployment scripts