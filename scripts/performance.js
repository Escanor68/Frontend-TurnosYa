#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Colores para la consola
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(50));
  log(title, colors.bold + colors.blue);
  console.log('='.repeat(50));
}

function logMetric(name, value, unit = '', threshold = null) {
  const color = threshold && value > threshold ? colors.red : colors.green;
  log(`${name}: ${value}${unit}`, color);
}

async function runLighthouse() {
  logSection('🔍 Ejecutando Lighthouse Audit');

  try {
    // Verificar si el servidor está corriendo
    log('Verificando si el servidor está corriendo...', colors.yellow);

    const lighthouseCmd =
      'lighthouse http://localhost:4000 --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage"';

    log('Ejecutando Lighthouse...', colors.yellow);
    execSync(lighthouseCmd, { stdio: 'inherit' });

    // Leer y analizar el reporte
    const reportPath = './lighthouse-report.json';
    if (fs.existsSync(reportPath)) {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

      logSection('📊 Métricas de Performance');

      const metrics = report.audits;

      // First Contentful Paint
      const fcp = metrics['first-contentful-paint']?.numericValue || 0;
      logMetric('First Contentful Paint', (fcp / 1000).toFixed(2), 's', 2000);

      // Largest Contentful Paint
      const lcp = metrics['largest-contentful-paint']?.numericValue || 0;
      logMetric('Largest Contentful Paint', (lcp / 1000).toFixed(2), 's', 2500);

      // First Input Delay
      const fid = metrics['max-potential-fid']?.numericValue || 0;
      logMetric('First Input Delay', fid.toFixed(0), 'ms', 100);

      // Cumulative Layout Shift
      const cls = metrics['cumulative-layout-shift']?.numericValue || 0;
      logMetric('Cumulative Layout Shift', cls.toFixed(3), '', 0.1);

      // Total Blocking Time
      const tbt = metrics['total-blocking-time']?.numericValue || 0;
      logMetric('Total Blocking Time', tbt.toFixed(0), 'ms', 300);

      // Speed Index
      const si = metrics['speed-index']?.numericValue || 0;
      logMetric('Speed Index', (si / 1000).toFixed(2), 's', 3400);

      // Performance Score
      const performanceScore = report.categories?.performance?.score * 100 || 0;
      logMetric('Performance Score', performanceScore.toFixed(0), '/100', 90);

      // Accessibility Score
      const accessibilityScore =
        report.categories?.accessibility?.score * 100 || 0;
      logMetric(
        'Accessibility Score',
        accessibilityScore.toFixed(0),
        '/100',
        90
      );

      // Best Practices Score
      const bestPracticesScore =
        report.categories?.['best-practices']?.score * 100 || 0;
      logMetric(
        'Best Practices Score',
        bestPracticesScore.toFixed(0),
        '/100',
        90
      );

      // SEO Score
      const seoScore = report.categories?.seo?.score * 100 || 0;
      logMetric('SEO Score', seoScore.toFixed(0), '/100', 90);

      logSection('💡 Recomendaciones');

      // Analizar oportunidades de mejora
      const opportunities = report.audits;

      if (opportunities['unused-css-rules']?.numericValue > 0) {
        log(
          `⚠️  CSS no utilizado: ${(
            opportunities['unused-css-rules'].numericValue / 1024
          ).toFixed(2)} KB`,
          colors.yellow
        );
      }

      if (opportunities['unused-javascript']?.numericValue > 0) {
        log(
          `⚠️  JavaScript no utilizado: ${(
            opportunities['unused-javascript'].numericValue / 1024
          ).toFixed(2)} KB`,
          colors.yellow
        );
      }

      if (opportunities['modern-image-formats']?.details?.items?.length > 0) {
        log(
          `⚠️  Imágenes no optimizadas: ${opportunities['modern-image-formats'].details.items.length} imágenes`,
          colors.yellow
        );
      }

      if (
        opportunities['render-blocking-resources']?.details?.items?.length > 0
      ) {
        log(
          `⚠️  Recursos bloqueantes: ${opportunities['render-blocking-resources'].details.items.length} recursos`,
          colors.yellow
        );
      }

      return report;
    }
  } catch (error) {
    log('❌ Error ejecutando Lighthouse: ' + error.message, colors.red);
    return null;
  }
}

function analyzeBundle() {
  logSection('📦 Análisis de Bundle');

  try {
    // Verificar si existe el build
    const distPath = './dist';
    if (!fs.existsSync(distPath)) {
      log(
        '❌ No se encontró el directorio dist. Ejecuta "npm run build" primero.',
        colors.red
      );
      return;
    }

    // Analizar archivos JS
    const jsFiles = fs
      .readdirSync(distPath)
      .filter((file) => file.endsWith('.js'))
      .map((file) => {
        const filePath = path.join(distPath, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          sizeKB: (stats.size / 1024).toFixed(2),
        };
      })
      .sort((a, b) => b.size - a.size);

    log('📊 Tamaño de archivos JavaScript:', colors.bold);
    jsFiles.forEach((file) => {
      const color =
        file.size > 500 * 1024
          ? colors.red
          : file.size > 200 * 1024
          ? colors.yellow
          : colors.green;
      log(`  ${file.name}: ${file.sizeKB} KB`, color);
    });

    // Analizar archivos CSS
    const cssFiles = fs
      .readdirSync(distPath)
      .filter((file) => file.endsWith('.css'))
      .map((file) => {
        const filePath = path.join(distPath, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          sizeKB: (stats.size / 1024).toFixed(2),
        };
      });

    if (cssFiles.length > 0) {
      log('\n📊 Tamaño de archivos CSS:', colors.bold);
      cssFiles.forEach((file) => {
        const color =
          file.size > 100 * 1024
            ? colors.red
            : file.size > 50 * 1024
            ? colors.yellow
            : colors.green;
        log(`  ${file.name}: ${file.sizeKB} KB`, color);
      });
    }

    // Total bundle size
    const totalSize = jsFiles.reduce((sum, file) => sum + file.size, 0);
    const totalSizeKB = (totalSize / 1024).toFixed(2);
    log(`\n📊 Tamaño total del bundle: ${totalSizeKB} KB`, colors.bold);

    if (totalSize > 1000 * 1024) {
      log(
        '⚠️  Bundle muy grande (>1MB). Considera optimizar con code splitting.',
        colors.yellow
      );
    }
  } catch (error) {
    log('❌ Error analizando bundle: ' + error.message, colors.red);
  }
}

function checkMobileOptimization() {
  logSection('📱 Optimización Mobile');

  try {
    // Verificar si hay media queries para mobile
    const cssFiles = fs
      .readdirSync('./src')
      .filter((file) => file.endsWith('.css'))
      .concat(
        fs
          .readdirSync('./src/components')
          .filter((file) => file.endsWith('.css'))
      );

    let hasMobileOptimization = false;

    cssFiles.forEach((file) => {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('@media') && content.includes('max-width')) {
        hasMobileOptimization = true;
      }
    });

    if (hasMobileOptimization) {
      log('✅ Media queries para mobile detectadas', colors.green);
    } else {
      log(
        '⚠️  No se detectaron media queries específicas para mobile',
        colors.yellow
      );
    }

    // Verificar lazy loading de imágenes
    const tsxFiles = fs
      .readdirSync('./src/components', { recursive: true })
      .filter((file) => file.endsWith('.tsx'));

    let hasLazyLoading = false;
    tsxFiles.forEach((file) => {
      const content = fs.readFileSync(file, 'utf8');
      if (
        content.includes('loading="lazy"') ||
        content.includes('react-lazyload')
      ) {
        hasLazyLoading = true;
      }
    });

    if (hasLazyLoading) {
      log('✅ Lazy loading de imágenes detectado', colors.green);
    } else {
      log('⚠️  No se detectó lazy loading de imágenes', colors.yellow);
    }
  } catch (error) {
    log(
      '❌ Error verificando optimización mobile: ' + error.message,
      colors.red
    );
  }
}

async function main() {
  log(
    '🚀 Iniciando análisis de performance de TurnosYa',
    colors.bold + colors.blue
  );

  // Verificar dependencias
  logSection('🔧 Verificando dependencias');
  try {
    execSync('lighthouse --version', { stdio: 'pipe' });
    log('✅ Lighthouse instalado', colors.green);
  } catch (error) {
    log(
      '❌ Lighthouse no está instalado. Instálalo con: npm install -g lighthouse',
      colors.red
    );
    return;
  }

  // Análisis de bundle
  analyzeBundle();

  // Verificación de optimización mobile
  checkMobileOptimization();

  // Lighthouse audit
  const report = await runLighthouse();

  if (report) {
    logSection('📋 Resumen');
    log(
      '✅ Análisis completado. Revisa lighthouse-report.json para más detalles.',
      colors.green
    );

    // Generar reporte HTML si no existe
    if (!fs.existsSync('./lighthouse-report.html')) {
      log('Generando reporte HTML...', colors.yellow);
      execSync(
        'lighthouse http://localhost:4000 --output=html --output-path=./lighthouse-report.html --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage"',
        { stdio: 'inherit' }
      );
    }
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { runLighthouse, analyzeBundle, checkMobileOptimization };
