// Instrucción para buscar archivos JSON en carpetas y subcarpetas recursivamente y mostrar su contenido en la página
function findAndShowJsonFilesInFolder(folderPath, callback) {
    // Llamar a la función recursiva para buscar y mostrar los archivos JSON
    findJsonFilesInFolder(folderPath, "", 0, callback);
}

// Función recursiva para buscar y mostrar todos los archivos JSON y mostrar su contenido en la página
function findJsonFilesInFolder(folderPath, currentPath, level) {
    // Si no hay un path actual especificado, establecerlo en la carpeta raíz
    if (!currentPath) {
        currentPath = ".";
    }

    // Obtener la lista de archivos y carpetas en la carpeta actual
    let folderContents = fs.readdirSync(Path.join(__dirname, folderPath, { recursive: true, withFileTypes: true });

    // Recorrer todos los archivos y carpetas en la carpeta actual
    for (const file of folderContents) {
        // Ignorar todos los archivos y carpetas ocultos y archivos JSON anteriores a la fecha de creación especificada
        if (!file.isDirectory(file.path) || !file.name.endsWith(".json")) {
            continue;
        }

        // Construir la ruta completa del archivo o carpeta
        const filePath = Path.join(folderPath, file.name);

        // Recursivamente buscar en las subcarpetas e imprimir la ruta completa de los archivos JSON encontrados
        if (file.isDirectory(filePath)) {
            findJsonFilesInFolder(filePath, filePath, level + 1);
        }
    }
}

findAndShowJsonFilesInFolder("", "https://github.com/Juan-66/Paraguay"); // Reemplaza el enlace de GitHub por la ruta de tu repositorio en GitHub
