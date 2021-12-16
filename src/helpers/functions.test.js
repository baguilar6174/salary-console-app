// Importación de funciones para test
const {
    getName,
    getDayAndSchedule,
    getTime,
    getHourMinutes,
    getDateFromTime,
    getWorkingHours,
    quickValidation,
    calculateSalary
} = require("./functions");

/**
 * Verifica que el nombre de un registro sea el correcto
 */
test('get employee name', () => {
    const name = getName('LUIS=SA14:00-17:00');
    expect(name).toMatch('LUIS');
});

/**
 * Obtiene que dia y rango de horas de un registro
 */
test('get day and schedule', () => {
    const dayAndSchedule = getDayAndSchedule('SA14:00-17:00');
    expect(dayAndSchedule).toEqual({ day: 'SA', time: '14:00-17:00' });
});

/**
 * Verifica que la hora de inicio y fin sea la correcta
 */
test('get start and end time', () => {
    const time = getTime('14:00-17:00');
    expect(time).toEqual({ start: '14:00', end: '17:00' });
});

/**
 * Obtiene las horas y minutos (tipo entero) a partir de un string de fecha
 */
test('get hours and minutes', () => {
    const time = getHourMinutes('14:00');
    expect(time).toEqual({ hour: 14, minutes: 0 });
});

/**
 * Obtener una fecha (con la zona horaria correcta) a partir de horas
 * y minutos
 */
test('get date from hour and minutes', () => {
    const date = getDateFromTime(14, 0);
    expect(date).toEqual(new Date('2021-12-16T14:00:00.000Z'));
});

/**
 * Verifica que la cantidad de horas entre dos fechas sea la correcta
 */
test('get hours between two dates', () => {
    const hours = getWorkingHours(new Date('2021-12-16T13:00:00.000Z'), new Date('2021-12-16T17:00:00.000Z'));
    expect(hours).toBe(4);
});

/**
 * Realiza una validación rápida para cada registro del archivo 'input.txt' 
 */
test('quick validation', () => {
    const isValid = quickValidation('LORENAMO12:00-15:00');
    expect(isValid).toBe(false);
});

/**
 * Verifica que el salario de una persona (un registro del archivo 'input.txt' sea el correcto)
 */
test('get salary', () => {
    const total = calculateSalary('LORENA=MO12:00-15:00');
    expect(total).toBe(45);
});