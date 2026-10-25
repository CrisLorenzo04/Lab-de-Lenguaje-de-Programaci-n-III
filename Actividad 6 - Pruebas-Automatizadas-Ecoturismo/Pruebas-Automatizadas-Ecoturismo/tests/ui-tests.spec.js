const { test, expect } = require('@playwright/test');

test.describe('Pruebas de Interfaz de Usuario - EcoTurismo RD', () => {

  // CASO 1: Validar que el menú dinámico carga correctamente
  test('debe cargar el menú principal y sus opciones', async ({ page }) => {
    await page.goto('/');
    
    // Validar que el título está presente
    await expect(page.locator('h1')).toContainText('EcoTurismo RD');
    
    // Validar que las opciones del menú JSON se renderizaron
    await expect(page.locator('#dynamic-menu')).toContainText('Inicio');
    await expect(page.locator('#dynamic-menu')).toContainText('Destinos RD');
    await expect(page.locator('#dynamic-menu')).toContainText('Contacto');
  });

  // CASO 2: Validar interacción con el formulario (Agregar nueva opción)
  test('debe permitir agregar una nueva opción al menú desde el formulario', async ({ page }) => {
    await page.goto('/');
    
    // Llenar el formulario
    await page.fill('#new-id', '99');
    await page.fill('#new-nombre', 'Playwright Test');
    await page.fill('#new-enlace', '#test');
    await page.fill('#new-icono', '🤖');
    
    // Hacer clic en el botón de enviar
    await page.click('button[type="submit"]');
    
    // Validar que el mensaje de éxito aparece
    await expect(page.locator('#form-message')).toContainText('✅ Opción agregada');
    
    // Validar que el nuevo elemento aparece visualmente en el menú
    await expect(page.locator('#dynamic-menu')).toContainText('🤖 Playwright Test');
  });

  // CASO 3: Validar navegación y eventos al hacer clic
  test('debe actualizar el contenido al hacer clic en una opción del menú', async ({ page }) => {
    await page.goto('/');
    
    // Hacer clic en el enlace de "Contacto"
    await page.click('a[href="#contacto"]');
    
    // Validar que la sección de contenido principal se actualizó
    await expect(page.locator('#content h2')).toContainText('Navegando a: Contacto');
  });
});