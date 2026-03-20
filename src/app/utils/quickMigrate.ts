/**
 * Quick Migration Tool - Spusťte v konzoli prohlížeče
 * 
 * Zkopírujte a vložte tento kód do konzole (F12):
 */

export async function quickMigrate() {
  console.clear();
  console.log('%c🚀 CMS Migrace - Start', 'color: #4CAF50; font-size: 16px; font-weight: bold;');
  console.log('');
  
  try {
    const { migrateStaticDataToCMS } = await import('./migrateStaticDataToCMS.ts');
    await migrateStaticDataToCMS();
  } catch (error) {
    console.error('%c❌ Chyba při migraci:', 'color: #f44336; font-weight: bold;', error);
  }
}

// Auto-export pro snadné volání z konzole
if (typeof window !== 'undefined') {
  (window as any).quickMigrate = quickMigrate;
  console.log('%c💡 Tip: Pro spuštění migrace napište do konzole:', 'color: #2196F3; font-weight: bold;');
  console.log('%cquickMigrate()', 'color: #4CAF50; font-size: 14px; font-weight: bold; background: #f0f0f0; padding: 4px 8px; border-radius: 4px;');
}
