// colores para la consola
require('colors');

const { readFile } = require('./handleFiles');

// Lectura del archivo 'rates.txt'. Este archivo contiene las reglas
// para días, horarios y tarifas.
const dataRates = readFile('./src/db/rates.txt');

/**
 * Esta función calcula el sueldo total para un empleado
 * @param {string} employee Datos del empleado
 */
const calculateSalary = (employee) => {

    // Se obtiene el nombre del empleado
    const name = getName(employee);
    // Se obtienen los datos de los días y horas trabajadas
    let ranges = employee.split('=')[1];

    // Se genera una lista con cada uno de los días y horas
    let schedules = ranges.split(',');
    // Esta variable almacena el sueldo total del empleado
    let total = 0;

    // Se recorren cada uno de los elementos de días y horas
    schedules.forEach((schedule) => {

        // En el caso de que una entrada tenga un formato incorrecto
        if(schedule.length < 12) return;
        
        // Se obtiene el nombre del día y el horario laboral
        let {day, time} = getDayAndSchedule(schedule);
        // Se obtiene las horas de inicio y fin a partir del rango de horas
        let {start, end} = getTime(time);

        // Se obtienen las horas y minutos a partir de la hora de inicio
        let {hour: hourStart, minutes: minutesStart } = getHourMinutes(start);
        // Se obtienen las horas y minutos a partir de la hora de fin
        let {hour: hourEnd, minutes: minutesEnd } = getHourMinutes(end);

        // Se generan variables de tipo Date a partir de las horas de inicio y fin
        let startDate = getDateFromTime(hourStart, minutesStart);
        let endDate = getDateFromTime(hourEnd, minutesEnd);

        // Se recorren los horarios a partir del día
        Object.keys(dataRates[day]).forEach((rateSchedule) => {

            // Se obtiene las horas de inicio y fin a partir del rango de horas
            let { start: rateStart, end : rateEnd} = getTime(rateSchedule);

            // Se obtienen las horas y minutos a partir de la hora de inicio
            let {hour: hourRateStart, minutes: minutesRateStart } = getHourMinutes(rateStart);
            // Se obtienen las horas y minutos a partir de la hora de fin
            let {hour: hourRateEnd, minutes: minutesRateEnd } = getHourMinutes(rateEnd);

            // Se generan variables de tipo Date a partir de las horas de inicio y fin
            let rateStartDate = getDateFromTime(hourRateStart, minutesRateStart);
            let rateEndDate = getDateFromTime(hourRateEnd, minutesRateEnd);

            // Se realiza la comparación para determinar si el horario del empleado esta dentro
            // de alguno de los horarios establecidos por día.
            if (startDate.getTime() > rateStartDate.getTime() && endDate.getTime() <= rateEndDate.getTime()) {
                // Se obtiene el precio en base al día y al horario
                let price = dataRates[day][rateSchedule];
                // Se obtiene la cantidad de horas que el empleado trabajó
                let hours = getWorkingHours(startDate, endDate);
                // Se calcula el valor en base a las horas trabajadas
                let payPerDay = price*hours;
                // Se agrega el valor calculado al total del empleado
                total+=payPerDay;
                console.log(`Payment for the day ${day} is: `.green+`${price} USD for ${hours} hours. Total: ${payPerDay} USD`);
            }
        });
    });
    // Mensaje con el nombre del empleado y el valor a pagar
    console.log(`\nThe amount to pay ${name} is: ${total} USD`.cyan);
}

/**
 * Esta función obtiene el nombre del empleado
 * @param {string} employee 
 * @returns nombre del empleado
 */
const getName = employee => employee.split('=')[0];

/**
 * Esta función obtiene el nombre del día y el horario laboral
 * @param {string} schedule 
 * @returns el día (Ej. MO) y el horario (Ej. 00:01 - 09:00)
 */
const getDayAndSchedule = (dayWithSchedule) => {
    let day = dayWithSchedule.substring(0,2);
    let time = dayWithSchedule.substring(2, dayWithSchedule.length);
    return { day, time };
}

/**
 * Esta función obtiene la hora de inicio y fin a partir de
 * un rango de horas (Ej. 00:01 - 09:00)
 * @param {string} schedule 
 * @returns { start: '00:01', end: '09:00' }
 */
const getTime = (schedule) => {
    let start = schedule.split('-')[0].trim();
    let end = schedule.split('-')[1].trim();
    return { start, end };
}

/**
 * Esta función obtiene las horas y minutos a partir de una hora
 * (Ej. 09:00)
 * @param {string} time 
 * @returns { hour: 9, minutes: 0 }
 */
const getHourMinutes = (time) => {
    let hour = parseInt(time.split(':')[0]);
    let minutes = parseInt(time.split(':')[1]);
    return { hour, minutes};
}

/**
 * Esta función genera un dato de tipo fecha a partir de horas y
 * minutos.
 * @param {string} hour 
 * @param {string} minutes 
 * @returns {Date} fecha
 */
const getDateFromTime = (hour, minutes) => {
    var date = new Date();
    if(hour == 0){
        if(minutes == 0){
            // Se agrega un día a la fecha ya que un '00:00' indica
            // el siguiente día
            date.setDate(date.getDate() + 1);
        } else if( minutes == 1) {
            // Se agrega un día a la fecha ya que un '00:01' indica
            // el inicio del día.
            date.setDate(date.getDate() - 1);
        }
    }
    // Establecemos a la fecha generada las horas y minutos con los
    // segundos y milisegundos a 0 para hacer un cáclulo más preciso
    date.setHours(hour, minutes, 0, 0);
    // Se formatea la fecha a un formato de zona horaria correcto
    const offset = date.getTimezoneOffset()
    return new Date(date.getTime() - (offset*60*1000));;
}

/**
 * Esta función obtiene la diferencia de horas a partir de dos fechas
 * @param {date} start hora de inicio
 * @param {date} end hora de fin
 * @returns diferencia en horas
 */
const getWorkingHours = (start, end) => {
    const diffTime = Math.abs(end - start);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); 
    return diffHours;
}

/**
 * Función para una validación rádipa de la entrada
 * @param {string} text 
 * @returns {boolean} true | false
 */
const quickValidation = (text) => {
    return text.includes('=') && text.includes(':') ? true : false;
}

/**
 * Exportación de funciones
 */
module.exports = {
    quickValidation,
    calculateSalary,
}