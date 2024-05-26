function setResetButtonHrefToPathUrl(id) { 
    const reset = document.getElementById('reset');
    reset.attributes.href.value = window.location.pathname;
}; 

setResetButtonHrefToPathUrl();