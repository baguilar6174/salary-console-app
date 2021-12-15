# Descripción del problema

La empresa ACME ofrece a sus empleados la flexibilidad de trabajar las horas que deseen. Pagarán las horas trabajadas con base en el día de la semana y la hora del día, según la siguiente tabla:

Lunes Viernes

- 00:01 - 09:00 25 USD
- 09:01 - 18:00 USD 15
- 18:01 - 00:00 20 USD

sábado y domingo

- 00:01 - 09:00 USD 30
- 09:01 - 18:00 USD 20
- 18:01 - 00:00 USD 25

El objetivo de este ejercicio es calcular el total que la empresa debe pagar a un empleado, en función de las horas que trabajó y las horas en las que trabajó. Se utilizarán las siguientes abreviaturas para ingresar datos:

MO: Lunes
TU: martes
WE: miércoles
TH: jueves
FR: viernes
SA: sábado
SU: domingo

__Entrada:__ el nombre de un empleado y el horario que trabajó, indicando el tiempo y horas. Debe ser un archivo .txt con al menos cinco conjuntos de datos. Puede incluir los datos de nuestros dos ejemplos a continuación.

__Salida:__ indique cuánto se le debe pagar al empleado

## Por ejemplo:

### Caso 1:

__ENTRADA:__ RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00

__SALIDA:__ El monto a pagar por RENE es: 215 USD

### Caso 2:

__ENTRADA:__ ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

__SALIDA:__ El monto a pagar ASTRID es: 85 USD

## Adicionalmente

El README debe incluir:

* Una descripción general de su solución
* Una explicación de su arquitectura
* Una explicación de su enfoque y metodología
* Instrucciones sobre cómo ejecutar el programa localmente.

Se evaluarán: 

* Estructuración de código
* Diseños de patrones aplicados
* Test y
* Calidad de su solución.