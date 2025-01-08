const { execSync } = require('child_process');

try {
  console.log('Installing @types/leaflet...');
  execSync('npm install --save-dev @types/leaflet', { stdio: 'inherit' });
  console.log('@types/leaflet has been successfully installed.');
} catch (error) {
  console.error('Failed to install @types/leaflet:', error);
}

