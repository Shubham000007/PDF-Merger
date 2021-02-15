var allImages = [];
// Open Wndow explorer
const openSection = document.querySelector('.upload-section');
if (openSection) {
    openSection.addEventListener('click', () => {
        let activeInputFiled = document.querySelector('#upload_multiple_images');
        activeInputFiled.click()
    });
}


const imagesToMerge = document.querySelector('#upload_multiple_images');


if (imagesToMerge) {
    var totalPages = 0;
    imagesToMerge.addEventListener('change', () => {
        var newContainer = document.querySelector(".merge-area");
        for (var i = 0; i < imagesToMerge.files.length; i++) {
            var paths = URL.createObjectURL(imagesToMerge.files.item(i));
            var newDiv = document.createElement("div");
            newDiv.setAttribute("class", "preview_pages");
            newContainer.appendChild(newDiv);

            var imageContainer = document.createElement("img");
            imageContainer.setAttribute('src', paths);
            imageContainer.setAttribute('class', 'image-data');
            newDiv.append(imageContainer);

        }
        openSection.classList.add('d-none');
        let mergeArea = document.querySelector('.merge-area');
        let mergeButton = document.querySelector('.merge-button-con');
        mergeArea.classList.remove('d-none');
        mergeButton.classList.remove('d-none');
    });
}
// getting pdf files Ends




let savePdf = document.querySelector('.convert_to_pdf');

if (savePdf) {
    savePdf.addEventListener("click", () => {
        savePdf.innerHTML = "Converting Please Wait";
        savePdf.setAttribute('disabled', 'disbaled');
        let pdfpages = [...document.querySelectorAll('.image-data')];
        var pdf = new jsPDF();

        pdfpages.forEach(element => {
            var width = element.width;
            var height = element.height;
            var millimeters = {};
            millimeters.width = Math.floor(width * 0.264583);
            millimeters.height = Math.floor(height * 0.264583);
            // var imgData = element.toDataURL('image/png', 1.0);
            pdf.addPage(millimeters.width, millimeters.height);
            pdf.addImage(element, 'PNG', 0, 0, millimeters.width, millimeters.height);
        });

        pdf.deletePage(1);
        pdf.save("coverted.pdf");

    });
}