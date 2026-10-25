# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Pruebas-Automatizadas-Ecoturismo\tests\ui-tests.spec.js >> Pruebas de Interfaz de Usuario - EcoTurismo RD >> debe cargar el menú principal y sus opciones
- Location: Pruebas-Automatizadas-Ecoturismo\tests\ui-tests.spec.js:6:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Pruebas de Interfaz de Usuario - EcoTurismo RD', () => {
  4  | 
  5  |   // CASO 1: Validar que el menú dinámico carga correctamente
  6  |   test('debe cargar el menú principal y sus opciones', async ({ page }) => {
> 7  |     await page.goto('/');
     |                ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  8  |     
  9  |     // Validar que el título está presente
  10 |     await expect(page.locator('h1')).toContainText('EcoTurismo RD');
  11 |     
  12 |     // Validar que las opciones del menú JSON se renderizaron
  13 |     await expect(page.locator('#dynamic-menu')).toContainText('Inicio');
  14 |     await expect(page.locator('#dynamic-menu')).toContainText('Destinos RD');
  15 |     await expect(page.locator('#dynamic-menu')).toContainText('Contacto');
  16 |   });
  17 | 
  18 |   // CASO 2: Validar interacción con el formulario (Agregar nueva opción)
  19 |   test('debe permitir agregar una nueva opción al menú desde el formulario', async ({ page }) => {
  20 |     await page.goto('/');
  21 |     
  22 |     // Llenar el formulario
  23 |     await page.fill('#new-id', '99');
  24 |     await page.fill('#new-nombre', 'Playwright Test');
  25 |     await page.fill('#new-enlace', '#test');
  26 |     await page.fill('#new-icono', '🤖');
  27 |     
  28 |     // Hacer clic en el botón de enviar
  29 |     await page.click('button[type="submit"]');
  30 |     
  31 |     // Validar que el mensaje de éxito aparece
  32 |     await expect(page.locator('#form-message')).toContainText('✅ Opción agregada');
  33 |     
  34 |     // Validar que el nuevo elemento aparece visualmente en el menú
  35 |     await expect(page.locator('#dynamic-menu')).toContainText('🤖 Playwright Test');
  36 |   });
  37 | 
  38 |   // CASO 3: Validar navegación y eventos al hacer clic
  39 |   test('debe actualizar el contenido al hacer clic en una opción del menú', async ({ page }) => {
  40 |     await page.goto('/');
  41 |     
  42 |     // Hacer clic en el enlace de "Contacto"
  43 |     await page.click('a[href="#contacto"]');
  44 |     
  45 |     // Validar que la sección de contenido principal se actualizó
  46 |     await expect(page.locator('#content h2')).toContainText('Navegando a: Contacto');
  47 |   });
  48 | });
```