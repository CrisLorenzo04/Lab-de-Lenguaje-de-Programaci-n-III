# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Pruebas-Automatizadas-Ecoturismo\tests\api-tests.spec.js >> Pruebas de API REST - EcoTurismo RD >> GET /api/menu debe retornar status 200 y un JSON válido con el array "menu"
- Location: Pruebas-Automatizadas-Ecoturismo\tests\api-tests.spec.js:6:3

# Error details

```
TypeError: apiRequestContext.get: Invalid URL
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Pruebas de API REST - EcoTurismo RD', () => {
  4  | 
  5  |   // CASO 1: Validar GET (Código 200 y estructura JSON)
  6  |   test('GET /api/menu debe retornar status 200 y un JSON válido con el array "menu"', async ({ request }) => {
> 7  |     const response = await request.get('/api/menu');
     |                                    ^ TypeError: apiRequestContext.get: Invalid URL
  8  |     
  9  |     // Requisito 7: Validar código de respuesta HTTP
  10 |     expect(response.status()).toBe(200);
  11 |     
  12 |     // Requisito 8: Validar que los datos recibidos son JSON y tienen la estructura correcta
  13 |     const data = await response.json();
  14 |     expect(data).toHaveProperty('menu');
  15 |     expect(Array.isArray(data.menu)).toBe(true);
  16 |     expect(data.menu.length).toBeGreaterThan(0);
  17 |   });
  18 | 
  19 |   // CASO 2: Validar POST con datos inválidos (Código 400)
  20 |   test('POST /api/menu con ID duplicado debe retornar status 400 y mensaje de error', async ({ request }) => {
  21 |     // Intentamos agregar un menú con ID 1 (que ya existe en el menu.json inicial)
  22 |     const response = await request.post('/api/menu', {
  23 |       data: {
  24 |         id: 1,
  25 |         nombre: 'Duplicado',
  26 |         enlace: '#duplicado',
  27 |         icono: '❌'
  28 |       }
  29 |     });
  30 |     
  31 |     // Requisito 7: Validar que el servidor rechaza la petición con 400 (Bad Request)
  32 |     expect(response.status()).toBe(400);
  33 |     
  34 |     // Requisito 8: Validar que la respuesta JSON contiene el mensaje de error esperado
  35 |     const data = await response.json();
  36 |     expect(data).toHaveProperty('error');
  37 |     expect(data.error).toContain('El ID ya existe');
  38 |   });
  39 | });
```