const container = document.querySelector(".FiguresGridAutomatic");
console.log(container);

const slides = container ? container.querySelectorAll(".swiper-slide") : [];

const collectionData = [];

slides.forEach((slide) => {
    console.log(slide);
    // 1. Obtiene el número de edición
    const uptitleElement = slide.querySelector(".uptitle");

    // 2. Obtiene la imagen
    const imgContainer = slide.querySelector(".img-container");
    const img = imgContainer ? imgContainer.querySelector("img") : null;

    // 3. Obtiene el título/descripción
    const titleElement = slide.querySelector(".FiguresGridAutomatic__figure-name");

    if (uptitleElement && titleElement && img) {
        const editionNumber = uptitleElement.textContent.trim().replace(/\D/g, "");
        const imageUrl = img.src || img.getAttribute("data-src");
        let description = titleElement.textContent.trim();

        // Limpia la descripción (Lógica unificada)
        if (description.includes("+")) {
            const parts = description.split("+");
            const beforePlus = parts[0].trim();
            const afterPlus = parts[1].trim();

            // Si "Fascículo" está al final (después del +), tomar la parte antes del +
            if (afterPlus.match(/Fasc[ií]culo/i)) {
                description = beforePlus;
            }
            // Si "Fascículo" está al principio (antes del +), tomar la parte después del +
            else if (beforePlus.match(/Fasc[ií]culo/i)) {
                description = afterPlus;
            }
            // Si no hay "Fascículo", tomar la parte después del + por defecto
            else {
                description = afterPlus;
            }
        }

        // Remueve espacios múltiples
        description = description.replace(/\s+/g, " ").trim();

        collectionData.push({
            description: description,
            image: imageUrl,
            edition: editionNumber,
            code: "",
            id: "",
        });
    }
});
console.log(collectionData);
// Ordena por edición
const collectionsSorted = collectionData.sort((a, b) => a.edition - b.edition);
const uniqueArray = collectionData.filter((obj, index, self) => index === self.findIndex((o) => o.edition === obj.edition));

console.log(uniqueArray);

/* console.log("Total de items encontrados:", collectionsSorted.length);
console.log("Colección:", document.title);
console.log(collectionsSorted); */
console.log({
    name: `${document.title}`,
    cover: "",
    editions: uniqueArray,
});
