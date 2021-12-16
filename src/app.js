const { readFile } = require('./helpers/handleFiles');
const { read } = require('./helpers/handleInput');
const { showMenu, pause, formatRates } = require('./helpers/handlerOutput');

// colores para la consola
require('colors');

// limpiar consola
console.clear();

// función princiapal
const main = async () => {
    
    // Variable para almacenar la opción seleccionada por el usuario
    let option = '';

    // Lectura del archivo 'rates.txt'. Este archivo contiene las reglas
    // para días, horarios y tarifas.
    const dataRates = readFile('./src/db/rates.txt');

    // Lectura del archivo 'input.txt'. Este archivo contiene las entradas
    // de los días y horas trabajadas de los empleados.
    const dataInput = readFile('./src/db/input.txt');

    // Ciclo iterativo para mostrar el menú, la aplicación finalizará
    // con la tecla '0'
    do {
        
        // Obtener la opción del usuario a partir de la función de mostrar
        // el menú de opciones (ya que la función retorna una promesa es 
        // necesario utilizar un await para esperar la acción del usuario)
        option = await showMenu();

        // Validación de la opción ingresada por el usuario. En el caso de
        // que digite alguna opción que no se encuentre en el menú, el usuario
        // recibirá un mensaje indicando que la opción es incorrecta.
        if(['1', '2', '3', '4', '0'].indexOf(option) === -1) console.log(`\nThe option ${option} is wrong!`.red);

        // Manejo de la acción dependiendo de la elección del usuario
        switch (option) {
            case '1':
                // Read file and calculate salaries
                if(dataInput){
                    console.log(dataInput);
                }
            break;
            case '2':
                // Read data and calculate salaries
                const input = await read('Write your data: ');
                console.log(`\n Your data is: ${input}`);
            break;
            case '3':
                // Show salaries calculated
            break;
            case '4':
                // Mostrar los días, horarios y tarifas al usuario en un
                // formato amigable.
                if(dataRates){
                    formatRates(dataRates)
                }
            break;
        }

        // Mientras la opción no finalice el programa, pausamos la ejecución
        if (option !== '0') await pause();

    } while (option !== '0');

    // Mensaje al finalizar la ejecución del programa
    console.log(`\nThanks!\n`.bold.magenta);

}

// ejecución de la función principal
main();