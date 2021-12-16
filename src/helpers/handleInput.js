// colores para la consola
require('colors');

/**
 * Esta función presenta al usuario un mensaje y da la posibilidad de
 * recibir un valor por teclado. Esta función retorna el texto que el
 * usuario ingrese por teclado.
 * @param {string} message 
 * @returns value
 */
const read = (message) => {
    return new Promise(resolve => {
        
        // Interfaz utilizada para mostrar y recibir información del usuario
        // por consola (no se hace uso de paquetes externos para la lectura)
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        // Mostrar información al usuario
        readLine.question(`\n${message}`, (value) => {
            readLine.close();
            resolve(value);
        });
    });
}

module.exports = {
    read,
}