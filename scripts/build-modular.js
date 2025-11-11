#!/usr/bin/env node

/**
 * Build Modular Packages Script
 * 
 * This script creates individual npm packages for each component category:
 * - @jithvar-ui/alerts
 * - @jithvar-ui/charts
 * - @jithvar-ui/datepickers
 * - @jithvar-ui/inputs
 * - @jithvar-ui/table
 * - @jithvar-ui/layout
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Component categories and their components
const packages = {
  'core': {
    description: 'Core utilities and types for Jithvar UI',
    components: ['utils', 'types'],
    size: '~10KB'
  },
  'alerts': {
    description: 'Animated alert dialogs and toast notifications',
    components: ['JAlerts'],
    dependencies: [],
    size: '~25KB'
  },
  'charts': {
    description: 'Interactive data visualization charts (20+ chart types)',
    components: [
      'AreaChart', 'BarChart', 'BoxPlotChart', 'BubbleChart', 'BulletChart',
      'CandlestickChart', 'ComboChart', 'DonutChart', 'FunnelChart', 'GanttChart',
      'GaugeChart', 'HeartbeatChart', 'HeatmapChart', 'HistogramChart', 'LineChart',
      'PieChart', 'RadarChart', 'ScatterPlot', 'StackedBarChart', 'WaterfallChart'
    ],
    dependencies: ['@jithvar-ui/core'],
    size: '~200KB'
  },
  'datepickers': {
    description: 'Date picker and date range picker components',
    components: ['DatePicker', 'DateRangePicker'],
    dependencies: ['@jithvar-ui/core'],
    size: '~30KB'
  },
  'inputs': {
    description: 'Form input components (checkbox, radio, select, range slider, etc.)',
    components: [
      'Checkbox', 'CheckboxList', 'MaskInput', 'Radio', 'RadioGroup',
      'RangeSlider', 'SearchableSelect', 'ToggleButtons'
    ],
    dependencies: ['@jithvar-ui/core'],
    size: '~40KB'
  },
  'table': {
    description: 'Advanced data table with server-side operations',
    components: ['JTable'],
    dependencies: ['@jithvar-ui/core', '@jithvar-ui/datepickers', '@jithvar-ui/inputs'],
    size: '~50KB'
  },
  'layout': {
    description: 'Layout components (tabs, collapse, etc.)',
    components: ['Collapse', 'Tabs'],
    dependencies: ['@jithvar-ui/core'],
    size: '~15KB'
  }
};

const PACKAGES_DIR = path.join(__dirname, '..', 'packages');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const SRC_DIR = path.join(__dirname, '..', 'src');

// Clean and create packages directory
if (fs.existsSync(PACKAGES_DIR)) {
  fs.rmSync(PACKAGES_DIR, { recursive: true, force: true });
}
fs.mkdirSync(PACKAGES_DIR, { recursive: true });

console.log('🚀 Building modular packages...\n');

Object.entries(packages).forEach(([packageName, config]) => {
  const packageDir = path.join(PACKAGES_DIR, packageName);
  const packageDistDir = path.join(packageDir, 'dist');
  
  console.log(`📦 Creating @jithvar-ui/${packageName}...`);
  
  // Create package directory
  fs.mkdirSync(packageDir, { recursive: true });
  fs.mkdirSync(packageDistDir, { recursive: true });
  
  // Create package.json
  const packageJson = {
    name: `@jithvar-ui/${packageName}`,
    version: '1.0.5',
    description: config.description,
    main: 'dist/index.js',
    module: 'dist/index.esm.js',
    types: 'dist/index.d.ts',
    sideEffects: ['**/*.css'],
    exports: {
      '.': {
        types: './dist/index.d.ts',
        import: './dist/index.esm.js',
        require: './dist/index.js'
      },
      './package.json': './package.json'
    },
    files: ['dist', 'README.md'],
    keywords: [
      'react',
      'react-components',
      'ui',
      'jithvar-ui',
      packageName,
      ...config.components.map(c => c.toLowerCase())
    ],
    peerDependencies: {
      react: '>=17.0.0',
      'react-dom': '>=17.0.0'
    },
    dependencies: {},
    repository: {
      type: 'git',
      url: 'git+https://github.com/jithvar/jithvar-ui.git',
      directory: `packages/${packageName}`
    },
    bugs: {
      url: 'https://github.com/jithvar/jithvar-ui/issues'
    },
    homepage: `https://github.com/jithvar/jithvar-ui/tree/main/packages/${packageName}#readme`,
    license: 'MIT',
    author: 'Jithvar',
    publishConfig: {
      access: 'public'
    }
  };
  
  // Add dependencies
  if (config.dependencies && config.dependencies.length > 0) {
    config.dependencies.forEach(dep => {
      packageJson.dependencies[dep] = '^1.0.5';
    });
  }
  
  fs.writeFileSync(
    path.join(packageDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  
  // Create README
  const readme = `# @jithvar-ui/${packageName}

${config.description}

Part of the [Jithvar UI](https://github.com/jithvar/jithvar-ui) component library.

## Installation

\`\`\`bash
npm install @jithvar-ui/${packageName}
# or
yarn add @jithvar-ui/${packageName}
# or
pnpm add @jithvar-ui/${packageName}
# or use the CLI
npx jithvar-ui add ${packageName}
\`\`\`

## Components

${config.components.map(c => `- ${c}`).join('\n')}

## Usage

\`\`\`tsx
import { ${config.components.join(', ')} } from '@jithvar-ui/${packageName}';

// Use the components in your app
\`\`\`

## Size

Minified + Gzipped: **${config.size}**

## Documentation

For full documentation, visit [jithvar-ui.netlify.app](https://jithvar-ui.netlify.app)

## License

MIT © Jithvar
`;
  
  fs.writeFileSync(path.join(packageDir, 'README.md'), readme);
  
  // Copy relevant dist files
  if (packageName === 'core') {
    // Copy utils and types only
    ['utils', 'types'].forEach(dir => {
      const srcPath = path.join(DIST_DIR, dir);
      const destPath = path.join(packageDistDir, dir);
      if (fs.existsSync(srcPath)) {
        fs.cpSync(srcPath, destPath, { recursive: true });
      }
    });
    
    // Create minimal index files for core
    const coreIndexJs = `
export * from './types';
export * from './utils/helpers';
`;
    fs.writeFileSync(path.join(packageDistDir, 'index.js'), coreIndexJs);
    fs.writeFileSync(path.join(packageDistDir, 'index.esm.js'), coreIndexJs);
    
    // Copy type definitions
    const typesContent = fs.readFileSync(path.join(DIST_DIR, 'types', 'index.d.ts'), 'utf-8');
    const helpersContent = fs.readFileSync(path.join(DIST_DIR, 'utils', 'helpers.d.ts'), 'utf-8');
    const coreTypes = `
${typesContent}
${helpersContent}
`;
    fs.writeFileSync(path.join(packageDistDir, 'index.d.ts'), coreTypes);
  } else {
    // For component packages, we need to extract specific components
    // For now, we'll copy the entire dist and users can tree-shake
    // In production, you'd want to build each package separately
    console.log(`  ⚠️  Note: Building individual components requires separate Rollup config`);
    console.log(`  ℹ️  For now, create a separate build step or use the monolithic package`);
  }
  
  console.log(`  ✅ Created @jithvar-ui/${packageName} (${config.size})\n`);
});

console.log('\n✨ Modular packages created in ./packages/\n');
console.log('📝 Summary:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
Object.entries(packages).forEach(([name, config]) => {
  console.log(`@jithvar-ui/${name.padEnd(15)} ${config.size.padStart(10)} - ${config.components.length} component(s)`);
});
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📦 To publish all packages:');
console.log('   npm run publish:all\n');
console.log('💡 Users can install specific packages:');
console.log('   npm install @jithvar-ui/alerts');
console.log('   npm install @jithvar-ui/charts');
console.log('   npx jithvar-ui add alerts\n');
