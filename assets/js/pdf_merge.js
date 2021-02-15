// Open Wndow explorer
const openSection = document.querySelector('.upload-section');
if (openSection) {
    openSection.addEventListener('click', () => {
        let activeInputFiled = document.querySelector('#upload_multiple_pdf');
        activeInputFiled.click()
    });
}


const pdfToMerge = document.querySelector('#upload_multiple_pdf');


if (pdfToMerge) {
    var totalPages = 0;
    pdfToMerge.addEventListener('change', () => {
        if (pdfToMerge.files.length == 1) {
            alert("Please Upload more than one Pdf");
            return false;
        } else {
            for (var i = 0; i < pdfToMerge.files.length; i++) {
                // var filesName = pdfToMerge.files.item(i).name;
                var paths = URL.createObjectURL(pdfToMerge.files.item(i))
                // Getting Document To render
                pdfjsLib
                    .getDocument(paths)
                    .promise.then(pdfs => {
                        prePageIsRendering = true;
                        var newContainer = document.querySelector(".merge-area");
                        let finalPages = document.getElementById('total_pages');
                        for (var i = 1; i <= pdfs._pdfInfo.numPages; ++i) {
                            totalPages++;
                            pdfs.getPage(i).then(doc => {
                                    var newDiv = document.createElement("div");
                                    newDiv.setAttribute("class", "preview_pages");
                                    newContainer.appendChild(newDiv);
                                    finalPages.value = totalPages;
                                    var scale = 3;
                                    var page_viewport = doc.getViewport({
                                        scale: scale
                                    });

                                    var canvas2 = document.createElement("canvas");
                                    var contexts = canvas2.getContext('2d');
                                    canvas2.setAttribute("class", 'canvas-pages');
                                    // canvas2.setAttribute("id", 'canvas_container_' + totalPages);
                                    canvas2.height = page_viewport.height;
                                    canvas2.width = page_viewport.width;
                                    canvas2.style.width = "100%";
                                    canvas2.style.height = "100%";
                                    newDiv.appendChild(canvas2);
                                    doc.render({
                                        canvasContext: contexts,
                                        viewport: page_viewport
                                    });
                                },
                                function (reason) {
                                    console.error(reason);
                                });
                            // return false;
                        }
                    });
                // Getting Document To render Ends
            }
            openSection.classList.add('d-none');
            let mergeArea = document.querySelector('.merge-area');
            let mergeButton = document.querySelector('.merge-button-con');
            mergeArea.classList.remove('d-none');
            mergeButton.classList.remove('d-none');

        }
    });
}
// getting pdf files Ends




let savePdf = document.querySelector('.merge_pdf_button');

if (savePdf) {
    savePdf.addEventListener("click", () => {
        savePdf.innerHTML = "Merging Please Wait";
        savePdf.setAttribute('disabled', 'disbaled');
        let pdfpages = [...document.querySelectorAll('.canvas-pages')];
        // console.log(pdfpages.length);
        var pdf = new jsPDF();
        // for (var j = 1; j <= pdfpages.length; j++) {
        //     var width = pdfpages[j].width;
        //     var height = pdfpages[j].height;
        //     var millimeters = {};
        //     millimeters.width = Math.floor(width * 0.264583);
        //     millimeters.height = Math.floor(height * 0.264583);
        //     var imgData = pdfpages[j].toDataURL('image/png', 1.0);
        //     pdf.addPage(millimeters.width, millimeters.height);
        //     pdf.addImage(imgData, 'PNG', 0, 0, millimeters.width, millimeters.height);
        // }

        pdfpages.forEach(element => {
            var width = element.width;
            var height = element.height;
            var millimeters = {};
            millimeters.width = Math.floor(width * 0.264583);
            millimeters.height = Math.floor(height * 0.264583);
            var imgData = element.toDataURL('image/jpeg', 1.0);
            pdf.addPage(millimeters.width, millimeters.height);
            pdf.addImage(imgData, 'JPEG', 0, 0, millimeters.width, millimeters.height);
            pdf.output();
        });

        pdf.deletePage(1);
        pdf.save("merge.pdf");

    });
}