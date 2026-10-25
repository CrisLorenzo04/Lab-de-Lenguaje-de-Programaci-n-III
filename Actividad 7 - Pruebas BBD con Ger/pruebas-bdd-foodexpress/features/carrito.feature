# language: es
Característica: Gestión de pedidos en FoodExpress RD
  Como cliente de FoodExpress RD
  Quiero poder realizar pedidos de comida en línea
  Para recibir mi comida en casa de forma rápida y segura

  Contexto:
    Dado que el usuario ha iniciado sesión en FoodExpress RD
    Y el restaurante "Pizza Palace" está abierto y disponible para delivery


    CASOS EXITOSOS 


  Escenario: Agregar producto disponible al carrito de compras
    Dado que el usuario está en el menú del restaurante "Pizza Palace"
    Y el producto "Pizza Pepperoni" tiene un precio de RD$450 y está disponible
    Cuando el usuario agrega "Pizza Pepperoni" al carrito
    Entonces el carrito debe mostrar 1 artículo
    Y el total del carrito debe ser RD$450
    Y el producto debe aparecer en la lista del carrito

  Escenario: Completar pedido con pago exitoso
    Dado que el usuario tiene 2 productos en el carrito con un total de RD$900
    Y la dirección de entrega es "Av. Winston Churchill #123, Santo Domingo"
    Y el método de pago seleccionado es "Tarjeta de Crédito"
    Cuando el usuario ingresa los datos de la tarjeta "4111111111111111" con vencimiento "12/2028" y CVV "123"
    Y confirma el pedido
    Entonces el sistema debe mostrar el mensaje "Pedido confirmado, tiempo estimado: 30-45 minutos"
    Y el carrito debe vaciarse automáticamente
    Y se debe generar un número de orden único

  Escenario: Aplicar código de descuento válido
    Dado que el usuario tiene un carrito con un total de RD$1000
    Y el código de descuento "BIENVENIDO20" otorga un 20% de descuento
    Cuando el usuario ingresa el código "BIENVENIDO20" en el campo de cupón
    Y aplica el descuento
    Entonces el sistema debe mostrar "Descuento aplicado: -RD$200"
    Y el nuevo total del carrito debe ser RD$800

  
    CASOS DE ERROR 
  

  Escenario: Intentar agregar producto agotado al carrito
    Dado que el usuario está en el menú del restaurante "Pizza Palace"
    Y el producto "Alitas BBQ" tiene stock en 0 unidades
    Cuando el usuario intenta agregar "Alitas BBQ" al carrito
    Entonces el sistema debe mostrar el mensaje de error "Producto agotado, no disponible"
    Y el carrito no debe contener "Alitas BBQ"
    Y el total del carrito no debe cambiar

  Escenario: Pago rechazado por fondos insuficientes
    Dado que el usuario tiene 1 producto en el carrito con un total de RD$450
    Y la dirección de entrega es válida
    Cuando el usuario ingresa una tarjeta con fondos insuficientes
    Y confirma el pedido
    Entonces el sistema debe mostrar el mensaje de error "Pago rechazado: fondos insuficientes"
    Y el carrito debe mantener los productos sin cambios
    Y no se debe generar número de orden

  Escenario: Dirección de entrega fuera del área de cobertura
    Dado que el usuario tiene productos en el carrito por un total de RD$600
    Cuando el usuario ingresa la dirección "Calle Falsa #123, Pueblo Remoto"
    Y la dirección está fuera del área de cobertura de delivery
    Entonces el sistema debe mostrar el mensaje de error "Lo sentimos, no entregamos en esta zona"
    Y el botón de confirmar pedido debe estar deshabilitado