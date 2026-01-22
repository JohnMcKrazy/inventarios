const $d=document;
const selector=(id,target=$d)=>target.querySelector(`${id}`);
const selectorAll=(id,target=$d)=>target.querySelectorAll(`${id}`);

const container=document.querySelector("#rev_slider_201_1").querySelector("rs-slides");
const collectionData=[];
console.log(container);
let edicion=0;

container.querySelectorAll("rs-slide").forEach(slide=>{
    edicion++;
    console.log(slide)
    collectionData.push({
    description:"",
    code:"",
    edition:edicion,
    image:slide.querySelector("rs-sbg").getAttribute("collectionData-lazyload"),
})
})

console.log(collectionData);
const collectionsSorted = collectionData.sort((a, b) => a.edition - b.edition);
const uniqueArray = collectionData.filter((obj, index, self) => index === self.findIndex((o) => o.edition === obj.edition));
console.log(collectionData);

