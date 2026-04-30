const tables = document.querySelectorAll(".wikitable");
const collectionData = [];
const noImgLink = "./src/img/no_img.jpg";
const tableData = tables[2].querySelector("tbody");
console.log(tableData);
const dataRows = tableData.querySelectorAll("tr");

for (let step = 0; step < dataRows.length; step++) {
    const editionNumber = dataRows[step].querySelector("b").textContent.trim();
    step++;
    const description = dataRows[step].querySelector("span").textContent.replace(/[\t\n\r]/g, "");

    const checkImg = dataRows[step + 1].querySelector("IMG");
    let imageUrl;
    if (checkImg) {
        step++;
        imageUrl = dataRows[step].querySelector("IMG").getAttribute("src");
    } else {
        imageUrl = noImgLink;
    }
    console.log(editionNumber);
    console.log(description);
    console.log(imageUrl);
    collectionData.push({
        description: description,
        image: imageUrl,
        edition: editionNumber,
        code: "",
        id: "",
    });
}

console.log(collectionData);
// Ordena por edición
const collectionsSorted = collectionData.sort((a, b) => a.edition - b.edition);
const uniqueArray = collectionData.filter((obj, index, self) => index === self.findIndex((o) => o.edition === obj.edition));

console.log(uniqueArray);

console.log({
    name: `${document.title}`,
    cover: "",
    editions: uniqueArray,
});
