const selector = (id, target = $d) => target.querySelector(`${id}`);
const selectorAll = (id, target = $d) => target.querySelectorAll(`${id}`);

const items = document.querySelector("ol").querySelectorAll("li");
const collectionData = [];
const griegos = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
  XI: 11,
  XII: 12,
  XIII: 13,
  XIV: 14,
  XV: 15,
};
items.forEach((item) => {
  const img = item.querySelector("img").getAttribute("src");
  const productData = item
    .querySelector(".product-item-name")
    .textContent.trim();

  const producDescription = item
    .querySelector(".product-item-title")
    .textContent.trim();

  let edicion;
  let split;

  const dataSplit = productData.split(" ");

  edicion = parseInt(dataSplit[dataSplit.length - 1]);
  if(!parseInt(dataSplit[dataSplit.length - 1])){
    edicion=griegos[dataSplit[dataSplit.length - 1].trim()]
  }
  collectionData.push({
    description: producDescription,
    image: img,
    edition: edicion,
    code: "",
    id: "",
  });
});
console.log(collectionData);

