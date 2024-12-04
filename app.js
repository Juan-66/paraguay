const repoOwner = "Juan-66";
const repoName = "paraguay";
const branch = "main"; // Cambia si usas otra rama
const baseApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents`;

async function fetchRepoContent(path = "") {
    const url = `${baseApiUrl}/${path}?ref=${branch}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener contenido del repositorio");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function fetchAllJsonFiles(path = "") {
    const contents = await fetchRepoContent(path);
    let files = [];

    for (const item of contents) {
        if (item.type === "file" && item.name.endsWith(".json")) {
            files.push(item.download_url); // URL directa al archivo
        } else if (item.type === "dir") {
            const subFiles = await fetchAllJsonFiles(item.path); // Recursivamente busca en subcarpetas
            files = files.concat(subFiles);
        }
    }
    return files;
}

async function loadJsonData(jsonFiles) {
    let allData = [];

    for (const url of jsonFiles) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error al cargar ${url}`);
            const data = await response.json();
            allData = allData.concat(data); // Combina los datos
        } catch (error) {
            console.error(error);
        }
    }

    return allData;
}

$(document).ready(async function () {
    const jsonFiles = await fetchAllJsonFiles();
    const data = await loadJsonData(jsonFiles);

    $('#dataTable').DataTable({
        data: data,
        columns: [
            { data: 'id', title: 'ID' },
            { data: 'fecha', title: 'Fecha' },
            { data: 'cedula', title: 'Cédula' },
            { data: 'nombre', title: 'Nombre' },
            { data: 'apellido', title: 'Apellido' },
            { data: 'edad_actual', title: 'Edad' },
            { data: 'nomdpto', title: 'Departamento' },
            { data: 'nomdist', title: 'Distrito' },
            { data: 'nombarrio', title: 'Barrio' },
            { data: 'celular', title: 'Celular' },
            { data: 'fecha_nacimiento', title: 'Fecha de Nacimiento' }
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
        }
    });
});
