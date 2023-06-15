// 
// Form Submission
// 
const formSubmitSetup = (curPage, newPage, items) => {
    // grab reference to form
    const formElem = document.querySelector('form');
    // submit handler
    formElem.addEventListener('submit', (e) => {
        // on form submission, prevent default
        e.preventDefault();
        // construct a FormData object, which fires the formdata event
        new FormData(formElem);
    });
    // formdata handler to retrieve data
    formElem.addEventListener('formdata', (e) => {
        console.log('formdata fired');
        // Get the form data from the event object
        let newFormData = e.formData;
        for (let value of newFormData.values()) {
            console.log(value);
        }
        ;
        //Save character data to local storage.
        for (let i = 0; i < items.length; i++) {
            const saveName = items[i][0];
            const formItemName = items[i][1];
            const itemNameValue = newFormData.get(formItemName);
            if (typeof itemNameValue === 'string') {
                localStorage.setItem(saveName, itemNameValue);
            }
        }
        // Change page
        const url = window.location.href.replace(curPage, newPage);
        window.location.href = url;
    });
};
export default formSubmitSetup;
