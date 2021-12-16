# Salaries console App

Esta aplicación contiene la solución a un problema de lógica de programación y esta basada en una aplicación por consola.

## Descripción del problema

La empresa ACME ofrece a sus empleados la flexibilidad de trabajar las horas que deseen. Pagarán las horas trabajadas con base en el día de la semana y la hora del día, según la siguiente tabla:

Lunes Viernes
- 00:01 - 09:00 25 USD
- 09:01 - 18:00 USD 15
- 18:01 - 00:00 20 USD

sábado y domingo
- 00:01 - 09:00 USD 30
- 09:01 - 18:00 USD 20
- 18:01 - 00:00 USD 25

El objetivo de este ejercicio es calcular el total que la empresa debe pagar a un empleado, en función de las horas y días que trabajó. Se utilizarán las siguientes abreviaturas para ingresar datos:

MO: Lunes | TU: martes | WE: miércoles | TH: jueves | FR: viernes | SA: sábado | SU: domingo

__Entrada:__ el nombre de un empleado y el horario que trabajó, indicando el tiempo y horas. Debe ser un archivo .txt con al menos cinco conjuntos de datos. Puede incluir los datos de nuestros dos ejemplos a continuación.

__Salida:__ indique cuánto se le debe pagar al empleado

#### Caso 1:

__ENTRADA:__ RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00

<br>

__SALIDA:__ El monto a pagar por RENE es: 215 USD

#### Caso 2:

__ENTRADA:__ ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

<br>

__SALIDA:__ El monto a pagar ASTRID es: 85 USD

---

## Arquitectura

La aplicación cuenta con la siguiente estructura de directorios y archivos

```
├── media/
├── src/
    ├── db/
    │   ├── input.txt
    │   ├── rates.txt
    │   helpers/
    │   ├── functions.js
    │   ├── functions.test.js
    │   ├── handleFiles.js
    │   ├── handleInput.js
    │   ├── handlerOutput.js
    └── app.js
```
- El directorio `media` contiene imagenes de la funcionalidad de la aplicación.
- El directorio `src` contiene toda la funcionalidad de la aplicación.
- El directorio `db` contiene dos archivos de texto en formato `.txt`
    * El fichero `input.txt` contiene las entradas para la ejecución del programa. Las entradas contienen el formato especificado en la descripción del problema.
    * El fichero `rates.txt` contiene las reglas para el cálculo del salario. Este archivo es un fichero de texto con un formato JSON como se muestra a continuación:
    ```json
    {
        "MO":{
            "00:01 - 09:00":25,
            "09:01 - 18:00":15,
            "18:01 - 00:00":20
        },
        "TU":{
            "00:01 - 09:00":25,
            "09:01 - 18:00":15,
            "18:01 - 00:00":20
        },
        "WE":{
            "00:01 - 09:00":25,
            "09:01 - 18:00":15,
            "18:01 - 00:00":20
        },
        "TH":{
            "00:01 - 09:00":25,
            "09:01 - 18:00":15,
            "18:01 - 00:00":20
        },
        "FR":{
            "00:01 - 09:00":25,
            "09:01 - 18:00":15,
            "18:01 - 00:00":20
        },
        "SA":{
            "00:01 - 09:00":30,
            "09:01 - 18:00":20,
            "18:01 - 00:00":25
        },
        "SU":{
            "00:01 - 09:00":30,
            "09:01 - 18:00":20,
            "18:01 - 00:00":25
        }
    }
    ```
    Se ha elegido esta estructura ya que posee una forma rápida de acceso a una tarifa en base al día y horario.
- El directorio `helpers` contiene ficheros útiles para la funcionalidad de la aplicación.
    * El fichero `functions.js` contiene toda la lógica del cálculo del salario para resolver el problema. La función encargada de hacer el cálculo es la siguiente
    ```js
    /**
     * Esta función calcula el sueldo total para un empleado
    * @param {string} employee Datos del empleado
    */
    const calculateSalary = (employee) => {
        ...
    }
    ```
    Además, de dicha función contiene otras funciones internas que se usan para realizar este cálculo.

    * El fichero `functions.test.js` contiene las pruebas o test de cada una de las funciones del fichero `functions.test.js`
    * El fichero `handleFiles.js` contiene funciones para el manejo de archivos tales como lectura y escritura de archivos. La función encargada de leer los archivos de texto del directorio `db` es la siguiente
    ```js
    /**
     * Función para leer un archivo
    * @param {*} file Path o ruta del archivo
    * @returns data Información obtenida del archivo
    */
    const readFile = (file) => {
        ...
    }
    ```
    Esta función se encarga de obtener y devolver la información de un archivo de texto

    * El fichero `handleInput.js` posee la función que permite al usuario ingresar valores por teclado y retornar dicho valor
    * El fichero `handlerOutput.js` contiene funciones como mostrar el menú de opciones, simular una pausa en la ejecución de la aplicación y formatear el contenido del fichero `rates.txt` en un formato amigable.
- Finalmente el fichero principal `app.js` contiene la función principal del programa. Aqui se ejecuta el menú en la consola y también se finaliza la aplicación.

## Descripción general de la solución

Para resolver este problema se ha hecho uso de `Node.js` basado en el lenguaje de programación `JavaScript` ya que poseen las características sufucientes para dar solución a este problema; cuenta con librerías de lectura y escritura de archivos, además provee la posibilidad de crear aplicaciones por consola.

Se ha hecho uso de la extensión [colors](https://www.npmjs.com/package/colors) para brindar personalizar los colores de los mensajes en consola. Además, de la extensión de [jest](https://jestjs.io/) para testing.

Se ha creado un menú con 4 opciones como se muestra a continuación:

<p align="center">
  <img alt="Menú de opciones" src="https://github.com/bryanAguilar001/salary-console-app/blob/main/media/menu.png?raw=true" width="400"/>
</p>

> Menú de opciones

<br>

__Opción 1 del menu:__ Esta opción le permite al usuario leer el archivo de texto ubicado en el directorio `db/input.txt` y hacer el cálculo de los salarios correspondientes a los empleados de cada entrada del archivo. La salida de esta opción se muestra a continuación:

<p align="center">
  <img alt="Resultado de la opción 1" src="https://github.com/bryanAguilar001/salary-console-app/blob/main/media/menu_opt1.png?raw=true" width="400" />
</p>

<br>

### Explicación

1. Para realizar este cálculo se ha tomado la información del archivo de texto y se ha tomado el salto de línea `\n` como divisor de entradas de empleados.

```
JUAN=SA14:00-17:00
```

2. Para cada fila de registros, se ha hecho una división a partir del caracter `=` lo cual delimita el nombre del empleado y sus horarios de trabajo. Como resultado tenemos:

```
empleado: JUAN
horarios: SA14:00-17:00
```

3. Para los horarios obtenidos se repite el proceso de división pero con el operador `,` lo que permite generar una lista con cada uno de los días que el empleado a laborado.

```
empleado: JUAN
horarios: [ 'SA14:00-17:00']
```

4. Se recorre la lista de horarios generada y para cada entrada se obtiene el día y el horarío. Esto con ayuda de la función `substring`. Como resultado tenemos un objeto cuyas claves indican el día y el horario en dicho día.

```
horario: { day: 'SA', time: '14:00-17:00' }
```

5. Posteriormete, se obtiene la hora de inicio y fin a partir de un rango de horas. Se repite el proceso de división con el operador `-`. Y se obtiene lo siguiente:

```
hora: { start: '14:00', end: '17:00'}
```

6. Se obtienen las horas y los minutos tanto del inicio y fin de las horas extraidas anteriormente con ayuda del proceso de división con el operador `:`:

```
hora-start: { hour: 14, minutes: 0}
hora-end  : { hour: 17, minutes: 0}
```

7. Con las horas y minutos obtenidos se genera datos de tipo Date. Se ha decidido hacer esta transformación ya que se puede hacer una mejor comparación basado en tiempo (fechas y horas). Además se da formato a la fecha con la zona horaria. Y se obtiene el siguiente resultado:

```
FechaInicio: 2021-12-16T14:00:00.000Z
Fecha Fin  : 2021-12-16T17:00:00.000Z
```

8. Con el día obtenido en el paso `4`. Es posible acceder obtener los horarios de dicho día a partir del contenido del archivo `rates.txt`. Ya que el día es la clave del objeto es posible acceder rápidamente.

```json
{
    "SA":{
        "00:01 - 09:00":30,
        "09:01 - 18:00":20,
        "18:01 - 00:00":25
    }
}
```

9. Ahora se recorren cada uno de los horarios. Para cada uno de estos se aplican los pasos `5.` `6.` y `7.`. Con el objetivo de generar horas para compararlas con las horas del usuario.

10. Se hace una comparación entre las horas generadas, identificando el rango correcto y determinando el costo de dicho intervalo de tiempo. Para el ejemplo:

```
Usuario:

inicio → 14:00
fin    → 17:00

Intervalo correcto:

inicio → 09:01
fin    → 18:00

Tarifa → 20

```

11. Se determina la cantidad de horas laboradas y se hace un simple cálculo para obtener el valor total correspondiente a cada empleado.

```
Payment for the day SA is: 20 USD for 3 hours. Total: 60 USD
The amount to pay LUIS is: 60 USD
```

__Opción 2 del menu:__ Esta opción le permite al usuario ingresar una cadena de texto en el mismo formato que el archivo para hacer el cálculo de los salarios. Para ingresar más de un registro, se requiere que el operador de separación sea `|`. Por ejemplo:

```
LUIS=SA14:00-17:00|JUAN=SA14:00-17:00,MO10:00-12:00
```

__Opción 3 del menu:__ Esta opción le permite al usuario observar de manera detallada los días, horas y tarifas establecidas. Como se muestra a continuación.

<p align="center">
  <img alt="Resultado de la opción 3" src="https://github.com/bryanAguilar001/salary-console-app/blob/main/media/menu_opt3.png?raw=true" width="400" />
</p>

__Opción 0  del menu:__ Esta opción le permite al usuario finalizar la aplicación.

<p align="center">
  <img alt="Resultado de la opción 0" src="https://github.com/bryanAguilar001/salary-console-app/blob/main/media/menu_opt0.png?raw=true" width="400" />
</p>

## Enfoque y metodología

Se ha hecho uso de Javascript ya que es un lenguaje muy flexible y mayormente usado en la web y en muchos frameworks actuales. Para abordar este problema se han seguido los siguientes pasos:

1. Inicialización del proyecto

    * Estructura inicial del proyecto
    * Creación de README.md y .gitignore
    * Dependencia colors agregada (colores en consola)

<br>

2. Creación del menú de opciones

    * Validación de opción ingresada por el usuario
    * Obtener opción ingresada
    * Menú iterativo con acción de finalización

<br>

3. Manejo de archivos de texto

    * Creación de funciones para la lectura y escritura de archivos
    * Creación del directorio db con los archivo input.txt y rates.txt
        - input.txt contiene las entradas para el cálculo del salario
        - rates.txt contiene las reglas; días, horas y tarifas
    * Opciones 1 y 4 de menu activadas. Estas opciones muestran la información de los archivos

<br>

4. Calculo de salario con datos del archivo de texto

    * Funciones para realizar cálculo del salario
    * Opción 1 del menú activa.
    * Mensajes en consola del sueldo total y por día del empleado

<br>

5. Funcionalidad completa del menu de opciones

<br>

6. Creación de pruebas unitarias para evaluar todas las funciones del fichero `functions.js`

## Instalación y ejecución

Esta aplicación ha sido creada con Node en su versión `v14.17.6` y Javascript.

Paso 1:

Descargar o clonar este repositorio con el siguiente comando

```
git clone https://github.com/bryanAguilar001/salary-console-app.git
```

Paso 2

En la raíz del proyecto ejecute el siguiente comando en la consola para obtener las dependencias necesarias:

```
npm i
```

Paso 3

Para ejecutar la aplicación ejecute el siguiente comando en la raíz del proyecto:

```
node src/app.js
```

Paso 4

Para ejecutar los test del fichero `functions.test.js` ejecute el siguiente comando en la raíz del proyecto:

```
npm run test
```

## Librerías & Paquetes usados

- `colors: ^1.4.0`: Permite personalizar los colores en los mensajes mostrados al usuario por consola.
- `jest: ^27.4.5`: Dependencia de desarrollo que permite generar pruebas o test.

## Author

- Website - [bryanaguilar](https://bryan-aguilar.com/)
- Medium - [bryanaguilar6174](https://bryanaguilar6174.medium.com/)
- LinkeIn - [bryanaguilar6174](https://www.linkedin.com/in/bryanaguilar6174)
