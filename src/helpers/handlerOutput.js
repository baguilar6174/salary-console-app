// colores para la consola
require('colors');

/**
 * Esta función es la encargada generar el menú de opciones y presentarlo al usuario.
 * 
 * Se hace uso de promesas ya que se requiere de que el usuario realice alguna acción.
 * De esta manera el menú de opciones se muestra visible hasta que el usuario realiza
 * una acción.
 * @returns option
 */
const showMenu = () => {

    return new Promise(resolve => {
        
        // Limiar la consola cada vez que el menú se inicialice
        console.clear();

        // Cabecera del menú de opciones
        console.log(`===========================================`.green);
        console.log(`                Salary App                 `.yellow)
        console.log(`===========================================\n`.green);

        // Opciones del menú
        console.log(`${'1.'.green} Read file and calculate salaries.`);
        console.log(`${'2.'.green} Enter data and calculate salaries.`);
        console.log(`${'3.'.green} Show calculated salaries.`);
        console.log(`${'4.'.green} Show value by day and time.`);
        console.log(`${'0.'.green} Exit.\n`);

        // Interfaz utilizada para mostrar y recibir información del usuario
        // por consola (no se hace uso de paquetes externos para la lectura)
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        // Pregunta mostrada al usuario para que pueda seleccionar una de las
        // opciones del menu
        readLine.question(`Select a option: `, (option) => {
            // Cierre de la interfaz de lectura | escritura
            readLine.close();
            // Resolución de la promesa con la opción del usuario
            resolve(option);
        });
    });

}

/**
 * Simular una pausa en la ejecución de la aplicación
 * @returns nothing
 */
const pause = () => {

    return new Promise(resolve => {
        // Interfaz utilizada para mostrar y recibir información del usuario
        // por consola (no se hace uso de paquetes externos para la lectura)
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        // Mostrar información al usuario
        readLine.question(`\nPress ${'ENTER'.green} to continue `, () => {
            readLine.close();
            resolve();
        });
    });
}

/**
 * Esta función muestra los días, horarios y tarifas al usuario en un formato amigable.
 * @param {object} rates 
 */
const formatRates = (rates) => {
    Object.keys(rates).forEach((day) => {
        console.log(`\n============= `.green+`Day: ${day}`.bold.white+ ` =============\n`.green);
        Object.keys(rates[day]).forEach((time) => {
            console.log(`Schedule `.cyan+ `${time}`.green + ` → `.white + `Price `.cyan+ `${rates[day][time]}$`.blue);
        });
    });
}

/**
 * Exportación de funciones
 */
module.exports = {
    showMenu,
    pause,
    formatRates
}