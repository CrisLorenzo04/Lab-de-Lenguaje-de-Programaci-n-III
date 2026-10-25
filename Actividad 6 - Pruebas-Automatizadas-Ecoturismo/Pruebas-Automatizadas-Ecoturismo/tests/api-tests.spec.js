const { test, expect } = require('@playwright/test');

test.describe('Pruebas de API REST - EcoTurismo RD', () => {

  // CASO 1: Validar GET (Código 200 y estructura JSON)
  test('GET /api/menu debe retornar status 200 y un JSON válido con el array "menu"', async ({ request }) => {
    const response = await request.get('/api/menu');
    
    // Requisito 7: Validar código de respuesta HTTP
    expect(response.status()).toBe(200);
    
    // Requisito 8: Validar que los datos recibidos son JSON y tienen la estructura correcta
    const data = await response.json();
    expect(data).toHaveProperty('menu');
    expect(Array.isArray(data.menu)).toBe(true);
    expect(data.menu.length).toBeGreaterThan(0);
  });

  // CASO 2: Validar POST con datos inválidos (Código 400)
  test('POST /api/menu con ID duplicado debe retornar status 400 y mensaje de error', async ({ request }) => {
    // Intentamos agregar un menú con ID 1 (que ya existe en el menu.json inicial)
    const response = await request.post('/api/menu', {
      data: {
        id: 1,
        nombre: 'Duplicado',
        enlace: '#duplicado',
        icono: '❌'
      }
    });
    
    // Requisito 7: Validar que el servidor rechaza la petición con 400 (Bad Request)
    expect(response.status()).toBe(400);
    
    // Requisito 8: Validar que la respuesta JSON contiene el mensaje de error esperado
    const data = await response.json();
    expect(data).toHaveProperty('error');
    expect(data.error).toContain('El ID ya existe');
  });
});