import { db } from "./db.js";

console.log(db.editoriales);
const $d = document;
const selector = (tag, ref = $d) => ref.querySelector(`${tag}`);
const selectorAll = (tag, ref = $d) => ref.querySelectorAll(`${tag}`);
const themeBtn = selector("[theme-btn]");
const pageBody = selector("body");

const menuBtns = selectorAll("[menu-btn]");
const submenuBtns = selectorAll("[submenu-btn]");
const sectionWindows = selectorAll("[window]");
const sectionSubindows = selectorAll("[subwindow]");

const dialogWindow = selector("dialog");
const menuActionBtns = selectorAll("[action-menu]");
const serachResult = selector('[selector="search_result"]');
const itemCardTemplate = selector("[template-ref='item_card']").content;
const editionCardTemplate = selector("[template-ref='edition_card']").content;
const resultEditionContainer = selector('[cards-container="results_editions"]');
const searchInput = selector('[selector="search_input"]');
const searchBtn = selector("[search-btn]");

const noImgLink = "./src/img/no_img.jpg";
const noEditionData = { name: "Indefinida", edition: "Indefinida", image: noImgLink, description: "Indefinida", code: "000000" };
const html5QrCode = new Html5Qrcode("reader");

const scannerConfig = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.ITF,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.RSS_14,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.CODE_93,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.RSS_EXPANDED,
    ],
};
const deleteChildElements = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const sanitizeInput = (inputValue) => {
    const div = document.createElement("div");
    div.textContent = inputValue;
    return div.innerHTML;
};
const resetWindows = () => {
    menuBtns.forEach((btn) => btn.setAttribute("btn-active", "false"));
    sectionWindows.forEach((window) => {
        window.setAttribute("show", "false");
        window.setAttribute("visible", "false");
    });
    if (html5QrCode.isScanning === true) {
        html5QrCode.stop();
    }
};
const resetSubwindows = () => {
    submenuBtns.forEach((btn) => btn.setAttribute("btn-active", "false"));
    sectionSubindows.forEach((subwindow) => {
        subwindow.setAttribute("show", "false");
        subwindow.setAttribute("visible", "false");
    });
};
const showEditionData = (edito, itemName, data) => {
    if (html5QrCode.isScanning === true) {
        html5QrCode.stop();
    }
    console.log(edito, itemName, data);
    resetWindows();
    const resultWindow = selector('[window="results"]');
    resultWindow.setAttribute("show", "true");
    setTimeout(() => {
        resultWindow.setAttribute("visible", "true");
    }, 100);
    const name = selector('[result="name"]');
    const description = selector('[result="description"]');
    const image = selector('[result="image"]');
    const edition = selector('[result="edition"]');
    const code = selector('[result="code"]');
    const editorial = selector('[result="editorial"]');
    name.textContent = itemName;
    description.textContent = data.description;
    edition.textContent = data.edition;
    code.textContent = data.code;
    editorial.textContent = edito;
    image.src = data.image;
};
const onScanSuccess = (decodedText, decodedResult) => {
    console.log(decodedText);

    let itemSearched;
    /* selector("selector='scan_'").textContent = `${decodedText}`; */
    console.log(`Code matched = ${decodedText}`, decodedResult);
    db.editoriales.forEach((editorial) => {
        editorial.items.forEach((item) => {
            item.editions.forEach((edition) => {
                if (edition.code === decodedText) {
                    console.log(edition);
                    showEditionData(editorial.name, item.name, edition);
                    console.log("existe");
                    console.log(edition.code, decodedText);
                    console.log(edition);
                }
            });
        });
    });
};

const changeTheme = () => {
    const state = pageBody.getAttribute("color-scheme");
    selectorAll(`[theme-icon]`).forEach((icon) => {
        icon.getAttribute("theme-icon") === state ? icon.setAttribute("show", "false") : icon.setAttribute("show", "true");
    });
    pageBody.setAttribute("color-scheme", pageBody.getAttribute("color-scheme") === "dark" ? "light" : "dark");
};

const windowActions = (target, state, container) => {
    const targetWindow = selector(`[${target}="${container}"]`);

    switch (state) {
        case "true":
            targetWindow.setAttribute("visible", "false");
            setTimeout(() => {
                targetWindow.setAttribute("show", "false");
            }, 500);
            break;
        case "false":
            targetWindow.setAttribute("show", "true");
            setTimeout(() => {
                targetWindow.setAttribute("visible", "true");
            }, 100);
            break;
    }
};
submenuBtns.forEach((submenuBtn) => {
    submenuBtn.addEventListener("click", () => {
        const target = submenuBtn.getAttribute("submenu-btn");
        const currentState = submenuBtn.getAttribute("btn-active");
        if (currentState !== "true") {
            resetSubwindows();
            windowActions("subwindow", currentState, target);
            submenuBtn.setAttribute("btn-active", currentState === "true" ? "false" : "true");
        }
    });
});
menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
        const target = menuBtn.getAttribute("menu-btn");
        const currentState = menuBtn.getAttribute("btn-active");
        if (currentState !== "true") {
            resetWindows();

            if (target === "scan") {
                html5QrCode.start({ facingMode: "environment" }, scannerConfig, onScanSuccess);
            }

            windowActions("window", currentState, target);
            menuBtn.setAttribute("btn-active", currentState === "true" ? "false" : "true");
        }
    });
});

menuActionBtns.forEach((menuActionBtn) => {
    menuActionBtn.addEventListener("click", () => {
        const currentState = menuActionBtn.getAttribute("btn-active");
        const target = menuActionBtn.getAttribute("action-menu");
        const targetMenu = selector(`[menu-container="${target}"]`);
        switch (currentState) {
            case "true":
                targetMenu.setAttribute("visible", "false");
                setTimeout(() => {
                    targetMenu.setAttribute("show", "false");
                }, 500);
                break;
            case "false":
                targetMenu.setAttribute("show", "true");
                setTimeout(() => {
                    targetMenu.setAttribute("visible", "true");
                }, 100);
                break;
        }
        menuActionBtn.setAttribute("btn-active", currentState === "true" ? "false" : "true");
    });
});

const createEditionCard = (data, itemName) => {
    /* console.log(data); */
    const newEdition = editionCardTemplate.cloneNode(true);
    const card = selector('[selector="card"]', newEdition);
    const edition = selector('[selector="edition_number"]', newEdition);
    const code = selector('[selector="edition_code"]', newEdition);
    const name = selector('[selector="edition_name"]', newEdition);
    const image = selector('[selector="edition_image"]', newEdition);
    const editorialImage = selector('[selector="edition_editorial_image"]', newEdition);
    code.textContent = data.code;
    edition.textContent = data.edition;
    name.textContent = itemName;
    /* console.log(data.image); */
    image.src = data.image === "" ? noImgLink : data.image;
    return newEdition;
};
const setSearchStartCards = () => {
    db.editoriales[0].items[0].editions[0];
    const editorial = db.editoriales[0];
    const item = editorial.items[0];
    const edition = item.editions[0];
    showEditionData(editorial.name, item.name, edition);
};
setSearchStartCards();

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchText = sanitizeInput(searchInput.value);
    console.log(searchText);
    resetWindows();
    windowActions("window", "false", "search");
    searchBtn.setAttribute("btn-active", "true");
    const dataSearchEdition = "";
    const searchData = [];
    const searchRef = (ref) => {
        const exist = ref.name.toLowerCase().includes(searchText) ? "Existe" : "No existe";
        console.log(`${ref.name} ${exist}`);
    };
    db.editoriales.forEach((editorial) => {
        searchRef(editorial);
        editorial.items.forEach((item) => {
            searchRef(item);
        });
    });
    const dataSearchItem = "";
    const dataSearchEditorial = "";
    searchInput.value = null;
});

/* dialogWindow.showModal(); */
themeBtn.addEventListener("click", changeTheme);
