import { execSync } from 'child_process';

try {
  execSync('npm install --save-dev @types/leaflet', { stdio: 'inherit' });
  console.log('@types/leaflet has been successfully installed.');
} catch (error) {
  console.error('Failed to install @types/leaflet:', error);
}

