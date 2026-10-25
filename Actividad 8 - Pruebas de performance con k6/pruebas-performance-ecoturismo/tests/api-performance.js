import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuración de la prueba de carga
export const options = {
  stages: [
    { duration: '30s', target: 5 },   // Solo 5 usuarios
    { duration: '30s', target: 5 },   // Mantener 5 usuarios
    { duration: '30s', target: 0 },   // Bajar a 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.02'],
  },
};

// URL de tu API (ajusta si es necesario)
const BASE_URL = 'http://localhost:3000/api/menu';

export default function () {
  // ============================================
  // PRUEBA 1: GET /api/menu - Obtener menú completo
  // ============================================
  const getMenuResponse = http.get(BASE_URL);
  
  check(getMenuResponse, {
    'GET /api/menu - status es 200': (r) => r.status === 200,
    'GET /api/menu - respuesta es JSON válido': (r) => {
      try {
        const body = r.json();
        return body.hasOwnProperty('menu');
      } catch (e) {
        return false;
      }
    },
    'GET /api/menu - tiempo de respuesta < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1); // Pausa de 1 segundo entre iteraciones

  // ============================================
  // PRUEBA 2: POST /api/menu - Agregar nueva opción (simulación)
  // ============================================
  const payload = JSON.stringify({
    id: Math.floor(Math.random() * 10000) + 1000, // ID aleatorio para evitar duplicados
    nombre: 'Test Performance',
    enlace: '#test',
    icono: ''
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const postMenuResponse = http.post(BASE_URL, payload, params);

  check(postMenuResponse, {
    'POST /api/menu - status es 200 o 400': (r) => r.status === 200 || r.status === 400,
    'POST /api/menu - respuesta contiene mensaje': (r) => {
      try {
        const body = r.json();
        return body.hasOwnProperty('message') || body.hasOwnProperty('error');
      } catch (e) {
        return false;
      }
    },
  });

  sleep(1);
}