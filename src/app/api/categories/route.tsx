import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import categories from "@/app/api/categories/categories.json"


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

        console.log(categories)

        return NextResponse.json(transformed); // Respuesta exitosa
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al leer el archivo:', error);
    
            return NextResponse.json(
                { error: 'Error al leer categories.json', details: error.message },
                { status: 500 }
            );
        } else {
            // Por si el universo decide lanzar otra cosa, como un string o un gremlin
            console.error('Error desconocido al leer el archivo:', error);
    
            return NextResponse.json(
                { error: 'Error desconocido al leer categories.json' },
                { status: 500 }
            );
        }
    }
}