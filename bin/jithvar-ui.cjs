#!/usr/bin/env node

/**
 * Jithvar UI CLI
 * 
 * Easy component installation tool
 * 
 * Usage:
 *   npx jithvar-ui add alerts
 *   npx jithvar-ui add charts datepickers
 *   npx jithvar-ui list
 *   npx jithvar-ui info alerts
 */

const { execSync } = require('child_process');
const readline = require('readline');

const PACKAGES = {
  core: {
    name: '@jithvar-ui/core',
    description: 'Core utilities and types (required by all components)',
    size: '~10KB',
    components: ['Utils', 'Types'],
    required: true
  },
  alerts: {
    name: '@jithvar-ui/alerts',
    description: 'Animated alert dialogs and toast notifications',
    size: '~25KB',
    components: ['JAlerts'],
    deps: ['core']
  },
  charts: {
    name: '@jithvar-ui/charts',
    description: 'Interactive data visualization (20+ chart types)',
    size: '~200KB',
    components: [
      'AreaChart', 'BarChart', 'LineChart', 'PieChart', 'DonutChart',
      'ScatterPlot', 'BubbleChart', 'RadarChart', 'HeatmapChart',
      'CandlestickChart', 'WaterfallChart', 'FunnelChart', 'GaugeChart',
      'HistogramChart', 'ComboChart', 'StackedBarChart', 'BoxPlotChart',
      'BulletChart', 'GanttChart', 'HeartbeatChart'
    ],
    deps: ['core']
  },
  datepickers: {
    name: '@jithvar-ui/datepickers',
    description: 'Date picker and date range picker',
    size: '~30KB',
    components: ['DatePicker', 'DateRangePicker'],
    deps: ['core']
  },
  inputs: {
    name: '@jithvar-ui/inputs',
    description: 'Form input components',
    size: '~40KB',
    components: [
      'Checkbox', 'CheckboxList', 'Radio', 'RadioGroup',
      'SearchableSelect', 'RangeSlider', 'MaskInput', 'ToggleButtons'
    ],
    deps: ['core']
  },
  table: {
    name: '@jithvar-ui/table',
    description: 'Advanced data table with server-side operations',
    size: '~50KB',
    components: ['JTable'],
    deps: ['core', 'datepickers', 'inputs']
  },
  layout: {
    name: '@jithvar-ui/layout',
    description: 'Layout components',
    size: '~15KB',
    components: ['Collapse', 'Tabs'],
    deps: ['core']
  }
};

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

function colorize(text, color) {
  return `${COLORS[color]}${text}${COLORS.reset}`;
}

function printHeader() {
  console.log('');
  console.log(colorize('╔═══════════════════════════════════════════╗', 'cyan'));
  console.log(colorize('║        🎨 Jithvar UI CLI Tool            ║', 'cyan'));
  console.log(colorize('║     Modular React Component Library      ║', 'cyan'));
  console.log(colorize('╚═══════════════════════════════════════════╝', 'cyan'));
  console.log('');
}

function printHelp() {
  printHeader();
  console.log(colorize('Usage:', 'bright'));
  console.log('  npx jithvar-ui <command> [options]');
  console.log('');
  console.log(colorize('Commands:', 'bright'));
  console.log('  add <packages...>    Install one or more component packages');
  console.log('  list                 List all available packages');
  console.log('  info <package>       Show detailed info about a package');
  console.log('  help                 Show this help message');
  console.log('');
  console.log(colorize('Examples:', 'bright'));
  console.log('  npx jithvar-ui add alerts');
  console.log('  npx jithvar-ui add charts datepickers');
  console.log('  npx jithvar-ui list');
  console.log('  npx jithvar-ui info table');
  console.log('');
  console.log(colorize('Manual Installation:', 'bright'));
  console.log('  npm install @jithvar-ui/alerts');
  console.log('  npm install @jithvar-ui/charts @jithvar-ui/inputs');
  console.log('');
}

function listPackages() {
  printHeader();
  console.log(colorize('📦 Available Packages:', 'bright'));
  console.log('');
  
  Object.entries(PACKAGES).forEach(([key, pkg]) => {
    const isRequired = pkg.required ? colorize(' (required)', 'red') : '';
    console.log(colorize(`  ${key}`, 'green') + isRequired);
    console.log(colorize(`  ${pkg.name}`, 'gray'));
    console.log(`  ${pkg.description}`);
    console.log(colorize(`  Size: ${pkg.size}`, 'yellow') + colorize(` | Components: ${pkg.components.length}`, 'cyan'));
    console.log('');
  });
  
  console.log(colorize('💡 Tip:', 'bright'));
  console.log('  Use "npx jithvar-ui add <package>" to install');
  console.log('  Use "npx jithvar-ui info <package>" for details');
  console.log('');
}

function showPackageInfo(packageKey) {
  const pkg = PACKAGES[packageKey];
  
  if (!pkg) {
    console.error(colorize(`❌ Package "${packageKey}" not found`, 'red'));
    console.log('');
    console.log('Available packages:');
    Object.keys(PACKAGES).forEach(key => {
      console.log(`  - ${key}`);
    });
    process.exit(1);
  }
  
  printHeader();
  console.log(colorize(`📦 ${pkg.name}`, 'bright'));
  console.log('');
  console.log(colorize('Description:', 'bright'));
  console.log(`  ${pkg.description}`);
  console.log('');
  console.log(colorize('Size:', 'bright'));
  console.log(colorize(`  ${pkg.size}`, 'yellow'));
  console.log('');
  console.log(colorize(`Components (${pkg.components.length}):`, 'bright'));
  pkg.components.forEach(comp => {
    console.log(`  • ${comp}`);
  });
  console.log('');
  
  if (pkg.deps && pkg.deps.length > 0) {
    console.log(colorize('Dependencies:', 'bright'));
    pkg.deps.forEach(dep => {
      console.log(`  • ${PACKAGES[dep].name}`);
    });
    console.log('');
  }
  
  console.log(colorize('Installation:', 'bright'));
  console.log(`  npm install ${pkg.name}`);
  console.log(`  # or`);
  console.log(`  npx jithvar-ui add ${packageKey}`);
  console.log('');
  
  console.log(colorize('Usage:', 'bright'));
  console.log(`  import { ${pkg.components[0]} } from '${pkg.name}';`);
  console.log('');
}

function getDependencies(packageKey, resolved = new Set()) {
  const pkg = PACKAGES[packageKey];
  if (!pkg) return resolved;
  
  resolved.add(packageKey);
  
  if (pkg.deps) {
    pkg.deps.forEach(dep => {
      if (!resolved.has(dep)) {
        getDependencies(dep, resolved);
      }
    });
  }
  
  return resolved;
}

function installPackages(packageKeys) {
  printHeader();
  
  // Validate all package keys
  const invalidPackages = packageKeys.filter(key => !PACKAGES[key]);
  if (invalidPackages.length > 0) {
    console.error(colorize(`❌ Invalid packages: ${invalidPackages.join(', ')}`, 'red'));
    console.log('');
    console.log('Available packages:');
    Object.keys(PACKAGES).forEach(key => {
      console.log(`  - ${key}`);
    });
    process.exit(1);
  }
  
  // Collect all packages including dependencies
  const allPackages = new Set();
  packageKeys.forEach(key => {
    getDependencies(key, allPackages);
  });
  
  const packagesToInstall = Array.from(allPackages).map(key => PACKAGES[key].name);
  
  console.log(colorize('📦 Packages to install:', 'bright'));
  packagesToInstall.forEach(name => {
    console.log(`  • ${name}`);
  });
  console.log('');
  
  const totalSize = Array.from(allPackages).reduce((sum, key) => {
    const size = PACKAGES[key].size.match(/\d+/)[0];
    return sum + parseInt(size);
  }, 0);
  
  console.log(colorize(`📊 Total size: ~${totalSize}KB`, 'yellow'));
  console.log('');
  
  // Check if npm/yarn/pnpm is available
  let packageManager = 'npm';
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    packageManager = 'pnpm';
  } catch {
    try {
      execSync('yarn --version', { stdio: 'ignore' });
      packageManager = 'yarn';
    } catch {
      packageManager = 'npm';
    }
  }
  
  console.log(colorize(`🚀 Installing with ${packageManager}...`, 'bright'));
  console.log('');
  
  const installCmd = packageManager === 'npm' 
    ? `npm install ${packagesToInstall.join(' ')}`
    : packageManager === 'yarn'
    ? `yarn add ${packagesToInstall.join(' ')}`
    : `pnpm add ${packagesToInstall.join(' ')}`;
  
  try {
    execSync(installCmd, { stdio: 'inherit' });
    console.log('');
    console.log(colorize('✅ Installation complete!', 'green'));
    console.log('');
    console.log(colorize('📚 Next steps:', 'bright'));
    console.log('  1. Import components in your app:');
    packageKeys.forEach(key => {
      const pkg = PACKAGES[key];
      console.log(`     import { ${pkg.components[0]} } from '${pkg.name}';`);
    });
    console.log('');
    console.log('  2. Use them in your components');
    console.log('');
    console.log(colorize('📖 Documentation:', 'bright'));
    console.log('  https://jithvar-ui.netlify.app');
    console.log('');
  } catch (error) {
    console.error(colorize('❌ Installation failed', 'red'));
    console.error(error.message);
    process.exit(1);
  }
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'help' || command === '--help' || command === '-h') {
  printHelp();
} else if (command === 'list' || command === 'ls') {
  listPackages();
} else if (command === 'info') {
  const packageKey = args[1];
  if (!packageKey) {
    console.error(colorize('❌ Please specify a package name', 'red'));
    console.log('Usage: npx jithvar-ui info <package>');
    process.exit(1);
  }
  showPackageInfo(packageKey);
} else if (command === 'add' || command === 'install') {
  const packages = args.slice(1);
  if (packages.length === 0) {
    console.error(colorize('❌ Please specify at least one package', 'red'));
    console.log('Usage: npx jithvar-ui add <packages...>');
    console.log('');
    console.log('Example: npx jithvar-ui add alerts charts');
    process.exit(1);
  }
  installPackages(packages);
} else {
  console.error(colorize(`❌ Unknown command: ${command}`, 'red'));
  console.log('');
  printHelp();
  process.exit(1);
}
