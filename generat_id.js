
/* GENERADOR DE CODIGOS */

const creatorID=(long)=> {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let id = '';
  // Se genera un ID hasta que sea único y la long sea la solicitada
  do {
    id = '';
    for (let i = 0; i < long; i++) {
      // Se genera un carácter aleatorio de los caracteres disponibles
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      id += caracteres.charAt(indiceAleatorio);
    }
  } while (idsGenerados.includes(id)); // Verifica si el ID ya existe
  db.editoriales.forEach(editorial=>{
    editorial.items_id
  })
  idsGenerados.push(id); // Agrega el ID a la lista de IDs generados
  return id;
}

// Es necesario mantener una lista de IDs generados para verificar la unicidad


// Ejemplo de uso:
const nuevoId = generarIdUnico(12); // Genera un ID de 12 caracteres
console.log(nuevoId); 
