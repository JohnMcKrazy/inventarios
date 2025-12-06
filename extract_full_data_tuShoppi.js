const container = document.querySelector("#main-collection-product-grid");
const slides = container ? container.querySelectorAll(".product-box") : [];

const collectionData = [];

slides.forEach((slide) => {
    const imgContainer = slide.querySelector(".product-image");
    const productTitle = slide.querySelector(".product-title");

    const imageUrl = imgContainer ? `http:${imgContainer.querySelector("img").getAttribute("srcset")}` : null;

    let title = productTitle.textContent.split(",")[0].trim();
    let edition;
    if (productTitle.textContent.includes("#")) {
        edition = productTitle.textContent.split("#")[1].trim();
    } else {
        edition = "1";
    }

    let currentCollection = collectionData.find((item) => item.name === title);

    console.log(currentCollection);

    if (currentCollection) {
        currentCollection.editions.push({
            description: "",
            image: imageUrl,
            edition: edition,
            code: "",
            id: "",
        });
    } else {
        collectionData.push({
            name: title,
            image: "",
            editions: [
                {
                    description: "",
                    image: imageUrl,
                    edition: edition,
                    code: "",
                    id: "",
                },
            ],
        });
    }
});
console.log(collectionData);
const collectionsSorted = collectionData.sort((a, b) => a.edition - b.edition);
const uniqueArray = collectionData.filter((obj, index, self) => index === self.findIndex((o) => o.edition === obj.edition));

console.log(uniqueArray);

console.log("Total de items encontrados:", collectionsSorted.length);
console.log("Colección:", document.title);
console.log(collectionsSorted);
console.log(uniqueArray);
