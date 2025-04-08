import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Comprobamos la ruta al archivo
        const filePath = path.join(process.cwd(),'src', 'app', 'api', 'categories', 'categories.json');
        console.log('Archivo a leer:', filePath);  // Verifica que la ruta sea correcta

        // Intentamos leer el archivo
        const fileContents = await fs.readFile(filePath, 'utf-8');
        
        // Intentamos parsear el archivo JSON
        const rawData = JSON.parse(fileContents);

        // Transformamos el objeto a un array de categorías
        const transformed = Object.entries(rawData).map(([name, words]) => ({
            name,
            words
        }));

        return NextResponse.json(transformed); // Respuesta exitosa
    } catch (error : any) {
        // Agregar más detalles en el error para depurar
        console.error('Error al leer el archivo:', error);

        // Usar NextResponse para manejar el error
        return NextResponse.json({ error: 'Error al leer categories.json', details: error.message }, { status: 500 });
    }
}