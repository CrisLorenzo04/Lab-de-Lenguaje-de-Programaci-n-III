# FoodExpress RD - Pruebas BDD con Gherkin (Práctica 5.2)

## Descripción

Este proyecto contiene escenarios de prueba BDD (Behavior Driven Development) para un sistema de delivery de comida llamado **FoodExpress RD**. Se utiliza el lenguaje **Gherkin** para describir el comportamiento esperado de la aplicación desde la perspectiva del usuario final, siguiendo la estructura **Dado/Cuando/Entonces** (Given/When/Then).

## Funcionalidad Principal

**Proceso de Pedido y Checkout**: Permite al usuario seleccionar productos de un restaurante, agregarlos al carrito, aplicar descuentos, validar la dirección de entrega, y completar el pago de forma segura.

## Tecnologías y Conceptos Utilizados

- **BDD (Behavior Driven Development)**: Metodología de desarrollo que describe el comportamiento del sistema desde la perspectiva del usuario.
- **Gherkin**: Lenguaje estructurado que usa palabras clave como **Dado/Cuando/Entonces** para escribir escenarios legibles por humanos y máquinas.
- **Cucumber/Playwright BDD**: Frameworks compatibles para automatizar estos escenarios (opcional).

## Estructura del Proyecto

pruebas-bdd-foodexpress/
├── features/
│ └── carrito.feature # Escenarios BDD en formato Gherkin
├── README.md # Documentación del proyecto
└── .gitignore # Archivos excluidos de Git

## Escenarios Implementados

### Casos Exitosos

#### 1. Agregar producto disponible al carrito

**¿Qué valida?** Que el sistema permite agregar productos con stock disponible al carrito y actualiza correctamente el contador de artículos y el total.

#### 2. Completar pedido con pago exitoso

**¿Qué valida?** El flujo completo de checkout: validación de dirección, procesamiento de pago con tarjeta válida, generación de número de orden y vaciado del carrito.

#### 3. Aplicar código de descuento válido

**¿Qué valida?** Que el sistema acepta cupones de descuento válidos, recalcula el total correctamente y muestra el monto descontado al usuario.

### Casos de Error

#### 4. Intentar agregar producto agotado

**¿Qué valida?** Que el sistema previene agregar productos sin stock (0 unidades), muestra un mensaje de error claro y mantiene el carrito sin cambios.

#### 5. Pago rechazado por fondos insuficientes

**¿Qué valida?** Que el sistema maneja errores de pago de forma segura, sin perder los datos del carrito y sin generar un número de orden.

#### 6. Dirección fuera del área de cobertura

**¿Qué valida?** Que el sistema valida la cobertura geográfica antes de permitir confirmar el pedido, deshabilitando el botón de confirmación si la dirección no es válida.

## ¿Qué es BDD y Gherkin?

### BDD (Behavior Driven Development)

Es una metodología de desarrollo de software que fomenta la colaboración entre desarrolladores, QA y stakeholders no técnicos. Se centra en describir el **comportamiento** del sistema en lugar de sus implementaciones técnicas.

### Gherkin

Es un lenguaje de dominio específico (DSL) que permite describir el comportamiento del software sin necesidad de definir cómo se implementa. Sus palabras clave principales son:

| Palabra Clave | En Español     | Propósito                              |
| ------------- | -------------- | -------------------------------------- |
| **Feature**   | Característica | Describe la funcionalidad principal    |
| **Scenario**  | Escenario      | Describe un caso de prueba específico  |
| **Given**     | Dado           | Establece el contexto o estado inicial |
| **When**      | Cuando         | Describe la acción del usuario         |
| **Then**      | Entonces       | Define el resultado esperado           |
| **And/But**   | Y/Pero         | Conecta pasos adicionales              |

## Cómo ejecutar los escenarios (Opcional)

Si se desea automatizar estos escenarios con Playwright BDD:

1. Instalar dependencias: `npm install @playwright/test @cucumber/cucumber`
2. Ejecutar: `npx cucumber-js features/`

## 👨‍💻 Autor

**Cristian Lorenzo**  
Práctica 5.2 - Pruebas BDD con Gherkin
