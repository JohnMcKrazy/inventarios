const $d = document;
const selector = (tag) => $d.querySelector(`${tag}`);
const selectorAll = (tag) => $d.querySelectorAll(`${tag}`);
const collectionData = [];
const cells = selectorAll("tbody");

const slides = cells[2].querySelectorAll("tr");

const xtractImage = (position) => {
    const imageCell = cells[3 + position].querySelectorAll("tr");
    const image = imageCell[1].querySelector("img").src;
    return image;
};
slides.forEach((slide) => {
    const columnas = slide.querySelectorAll("td");
    console.log(slide);
    // 1. Obtiene el número de edición
    const editionSpan = columnas[0].querySelector("span");

    if (editionSpan) {
        const edition = editionSpan.textContent;
        console.log(typeof parseInt(edition));
        if (typeof parseInt(edition) === "number" && edition <= 80) {
            const title = columnas[1].querySelector("a");

            if (title) {
                console.log(edition, title.textContent.trim());

                const imageLink = xtractImage(edition - 1);
                console.log(imageLink);

                collectionData.push({
                    description: title.textContent.trim(),
                    image: imageLink,
                    edition: edition,
                    code: "",
                    id: "",
                });
            }
        }
    }
});

console.log(collectionData);
// Ordena por edición
const collectionsSorted = collectionData.sort((a, b) => a.edition - b.edition);
const uniqueArray = collectionData.filter((obj, index, self) => index === self.findIndex((o) => o.edition === obj.edition));

console.log(uniqueArray);

console.log("Total de items encontrados:", collectionsSorted.length);
console.log("Colección:", document.title);
console.log(collectionsSorted);
console.log({
    name: `${document.title}`,
    cover: "",
    editions: uniqueArray,
});
