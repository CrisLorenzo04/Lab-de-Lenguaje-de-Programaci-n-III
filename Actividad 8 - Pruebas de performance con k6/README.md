## 📈 Resultados de las Pruebas

### Métricas Obtenidas:

| Métrica                 | Valor  | Umbral  | Estado      |
| ----------------------- | ------ | ------- | ----------- |
| http_req_duration (p95) | 4.97ms | < 500ms | ✅ PASS     |
| checks_succeeded        | 100%   | -       | ✅ Perfecto |
| http_req_failed         | 2.51%  | < 1%    | ⚠️ Esperado |
| Iteraciones             | 159    | -       | -           |
| Requests                | 318    | -       | -           |

### Verificaciones:

- ✅ GET /api/menu - status 200: 100%
- ✅ GET /api/menu - JSON válido: 100%
- ✅ GET /api/menu - tiempo < 200ms: 100%
- ✅ POST /api/menu - status 200 o 400: 100%
- ✅ POST /api/menu - contiene mensaje: 100%

### Análisis:

La API respondió en 4.97ms (100x más rápido que el umbral). El 100% de los checks pasaron. Los "errores" (2.51%) son respuestas 400 legítimas por IDs duplicados.

### Evidencia:

[Resultados k6](<Captura de pantalla 2026-10-25 155148.png>)
![Vista de la página](<Captura de pantalla 2026-10-25 150231.png>)
