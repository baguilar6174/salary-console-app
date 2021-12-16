const { calculateSalary, quickValidation } = require('./helpers/functions');
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
        if(['1', '2', '3', '0'].indexOf(option) === -1) console.log(`\nThe option ${option} is wrong!`.red);

        // Manejo de la acción dependiendo de la elección del usuario
        switch (option) {
            case '1':
                // Si se ha leido el archivo y se han encontrado valores, es posible realizar el cálculo
                if(dataInput){
                    // Se obtiene una lista con los datos de cada empleado
                    const employees = dataInput.split(/\r?\n/);
                    console.log(`\n====================== Result ================================\n`.yellow)
                    employees.forEach(employee => {
                        // Validación en caso de que la última fila del archivo este vacía
                        // y que contenga una entrada correcta (al menos un '=' y ':')
                        if(employee?.length && quickValidation(employee)) {
                            // Se calcula el salario para cada empleado
                            calculateSalary(employee);
                            console.log(`\n===============================================================`.yellow)
                        }
                    });
                } else {
                    console.log(`\nThe file does not exist or is empty!`.red.bold);
                }
            break;
            case '2':
                // Read data and calculate salaries
                console.log(`\nYou can enter more than one separate employee with '|'`.cyan+` Ex. LUIS=SA14:00-17:00|JUAN=SA14:00-17:00,MO10:00-12:00`.white.bold);
                // Se obtiene la entrada del usuario
                const input = await read('Write your data: ');
                // Se hace una validación rápida del texto
                if(input?.length && quickValidation(input)){
                    const employees = input.split('|');
                    console.log(`\n====================== Result ================================\n`.yellow)
                    employees.forEach(employee => {
                        // Validación en caso de que la última fila del archivo este vacía
                        // y que contenga una entrada correcta (al menos un '=' y ':')
                        if(employee?.length && quickValidation(employee)) {    
                            // Se calcula el salario para cada empleado
                            calculateSalary(employee);
                            console.log(`\n===============================================================`.yellow)
                        }
                    });
                } else {
                    console.log(`\nThe entry is wrong!`.red.bold);
                }
            break;
            case '3':
                // Mostrar los días, horarios y tarifas al usuario en un
                // formato amigable.
                if(dataRates){
                    formatRates(dataRates)
                }  else {
                    console.log(`\nThe file does not exist or is empty!`.red.bold);
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