const container = document.querySelector("ol");
console.log(container);

const items = container ? container.querySelectorAll("li") : [];

const collectionData = [];

for (let count = 0; count < items.length; count++) {
    const title = items[count].textContent;
    console.log(title);

    if (title) {
        collectionData.push({
            description: title,
            image: "",
            edition: count + 1,
            code: "",
            id: "",
        });
    }
}
console.log(collectionData);
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
