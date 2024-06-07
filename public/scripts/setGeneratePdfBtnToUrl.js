const setGeneratePdfBtnToUrl = () => {
    const $generatePdfBtn = document.querySelector('#pdfGeneratorBtn');

    // Generate url => http://localhost:3000/pdf/{url after 3000 /}
    const url = window.location.href.split('/').slice(3).join('/');
    $generatePdfBtn.href = `/pdf/${url}`;
}

setGeneratePdfBtnToUrl();