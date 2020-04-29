import exifr from 'exifr';
const tableTemplate = require('./table.handlebars');
const historyTemplate = require('./history.handlebars');

const imgSrc = new URLSearchParams(window.location.search).get('url');
const thumbnailImg = document.getElementById("img-thumbnail");

if (imgSrc) {
    thumbnailImg.setAttribute("src", imgSrc);
    document.getElementById("img-src").innerText = imgSrc;
}

thumbnailImg.addEventListener('loadend', () => {
    document.getElementById("img-thumbnail-placeholder").classList.add("hide");
    document.getElementById("img-thumbnail-box").classList.add("displayed");
    document.getElementById("img-info-panel").classList.add("display");
    getPicture();
});

function getPicture() {
    let request = new XMLHttpRequest();
    request.addEventListener("load", parseExif);
    request.responseType = "arraybuffer"
    request.open("GET", imgSrc);
    request.send();
}

function parseExif() {
    const tableElementId = "table";
    const isObject = (el) => (typeof el === "object" && el.length === undefined && el.getDate === undefined)

    exifr.parse(this.response, true)
        .then(exif => {
            // First list attributes that cannot be directly displayed
            const objects = Object.entries(exif).filter(v => isObject(v[1]));
            const objectKeys = objects.map(obj => obj[0]);
            objectKeys.push("History"); // Filter History too

            // Filter them out
            const filtered = Object.keys(exif)
                .filter(key => objectKeys.indexOf(key) < 0)
                .reduce((obj, key) => Object.assign(obj, { [key]: exif[key] }), {})

            // Render the filtered EXIF
            renderTableTemplate(filtered, tableElementId, "__MSG_sidebarBodyMainInfoTitle__");

            // Special treatment for modification history
            if (exif.History) {
                const newTableId = "history-table";
                createNewDiv(tableElementId, newTableId);
                renderTableTemplate(exif.History, newTableId, "__MSG_sidebarBodyHistoryTitle__", historyTemplate)
            }
            // Treat filtered attributes
            objects.forEach(o => {
                const newTableId = o[0] + "-table";
                createNewDiv(tableElementId, newTableId);
                renderTableTemplate(o[1], newTableId, o[0])
            });
            // Finally, replace i18n keys by their translations
            window.l10n.updateDocument();
        });
}

function createNewDiv(parentId, childId) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", childId);

    const parentDiv = document.getElementById(parentId);
    parentDiv.appendChild(newDiv);
}

function renderTableTemplate(map, id, title, template=tableTemplate) {
    let html = template({
        id: id,
        title: title,
        entries: map
    });
    document.getElementById(id).innerHTML = html;
}
