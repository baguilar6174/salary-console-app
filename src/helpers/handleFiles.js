/**
 * El módulo fs proporciona funciones  útiles para acceder e interactuar con el sistema de archivos.
 * Es parte del núcleo de Node, se puede usar simplemente requiriéndolo (no es necesario instalarlo).
 */
const fs = require('fs');

/**
 * Función para escribir en un archivo
 * @param {string} file Path o ruta del archivo
 * @param {any} data Información o datos que se van a guardar
 */
const saveFile = (file, data) => {
    // Es necesario realizar una conversión estricta a un string
    fs.writeFileSync(file, JSON.stringify(data));
}

/**
 * Función para leer un archivo
 * @param {*} file Path o ruta del archivo
 * @returns data Información obtenida del archivo
 */
const readFile = (file) => {
    // Validación de existenccia del archivo
    if(!fs.existsSync(file)) return null;
    // Codificación utf-8 para soportar caracteres especiales
    const data = fs.readFileSync(file, {encoding: 'utf-8'});
    
    // Validación en caso de que la información pueda ser convertida a JSON
    // de no ser posible, se retorma la información como un string
    try {
        return JSON.parse(data);    
    } catch (e) {
        return data;
    }
}

module.exports = {
    saveFile,
    readFile,
}