// for spinner section 
const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display = displayStyle;
}


const search = async () => {
    const inputField = document.getElementById('input-field').value;
    // case sensative section add
    const inputFieldText = inputField.toLowerCase();


    const searchResultShow = document.getElementById('search-result-show');
    // clear the pervious content on the page 
    searchResultShow.textContent = '';

    // error showing for emapty and no mobile found 
    document.getElementById('mobile-not-found-message').style.display = 'none';
    document.getElementById('search-field-empty').style.display = 'none';


    // for showing spinner 
    toggleSpinner('block');


    // for input field is emptry
    if (inputField == '') {
        document.getElementById('search-field-empty').style.display = 'block';
        toggleSpinner('none');
    } else {
        // API call
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`;

        const res = await fetch(url);
        const data = await res.json();
        showSearchResult(data); // data send another function for showing founded result 

    }


}


const showSearchResult = (data) => {
    console.log(data);

    const searchResultShow = document.getElementById('search-result-show');

    if (data.status == true) {
        const dataArray = data.data;
        for (const item of dataArray) {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card">
                        <div class="p-4 m-auto">
                        <img src=${item.image} alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Model : ${item.phone_name}</h5>
                            <p class="card-text">Brand : ${item.brand}</p>
    
                            <!-- Button trigger modal and showing more details -->
                            <div class="text-left">
                                <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetails('${item.slug}')">See
                                    Details</a>
                            </div>
                        </div>
                    </div>
            `
            searchResultShow.appendChild(div);
        }
        toggleSpinner('none');
    } else {
        // mobile data is found OR means user typed wrong mobile model
        document.getElementById('mobile-not-found-message').style.display = 'block';
        toggleSpinner('none');
    }


    // input feild are clear 
    document.getElementById('input-field').value = '';
}


// show details on page after it selecting 
const showDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`

    // api call and load
    fetch(url)
        .then(res => res.json())
        .then(data => showDetailsOnPage(data))
        .catch(error => console.log(error))

}

const showDetailsOnPage = (data) => {
    // pervious contant are clear 
    const maindiv = document.getElementById('product-page-details');
    maindiv.textContent = '';


    const div = document.createElement('div');
    const mobileData = data.data;

    if (data.status === true) {



        let releaseDateChecking = mobileData.releaseDate;
        if (releaseDateChecking === "") {
            releaseDateChecking = "Date isn't found";
        }


        let otherChecking = mobileData.others;
        if (otherChecking == undefined) {

        }



        //  Destructuring Objectn and store in variable as the same name they have 
        const { displaySize, chipSet, storage, memory, sensors } = mobileData.mainFeatures;




        // other information is handleing this codde 
        let NFC, Bluetooth, Radio, USB, GPS, WLAN;
        const otherObject = mobileData.others;
        if (otherObject === undefined) {
            NFC = Bluetooth = Radio = USB = GPS = WLAN = 'data is not found';
        } else {
            NFC = mobileData.others.NFC;
            Bluetooth = mobileData.others.Bluetooth;
            Radio = mobileData.others.Radio;
            USB = mobileData.others.USB;
            GPS = mobileData.others.GPS;
            WLAN = mobileData.others.WLAN;
        }




        // html code is ganarating with bootsrtap css code 
        div.innerHTML = `
                    <div class="modal-content close-button">
                         <div class="modal-header">
                            <h2 class="modal-title text-danger" id="exampleModalLabel"> ${mobileData.brand} ${mobileData.name}</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <div class="d-flex m-2  flex-wrap">
                                    <div class="border-0 shadow-none ">
                                        <div class="p-3">
                                            <img src="${mobileData.image}" class=" img-fluied rounded-start" alt="...">
                                        </div>
                                        <p><span class='fw-bold'>Brand : </span> ${mobileData.brand}</p>
                                        <p><span class='fw-bold'>Relese Date : </span><span class="text-primary">${releaseDateChecking}</span></p>
                                    </div>

                                    

                                    <div class="features-items">
                                        <h5 class="text-danger">Main Features</h5>
                                        <p><span class='fw-bold'>Display : </span>${displaySize}</p>
                                        <p><span class='fw-bold'>Chipset : </span>${chipSet}</p>
                                        <p><span class='fw-bold'>Storage : </span>${storage}</p>
                                        <p><span class='fw-bold'>Memory : </span>${memory}</p>
                                        <p><span class='fw-bold'>Sensor : </span>${sensors} </p>
                                          
                                        <!-- showing more Features details part  -->

                                        <h5 class="text-danger">Others Features</h5>
                                        <p><span class='fw-bold'>NFC : </span>${NFC}</p>
                                        <p><span class='fw-bold'>Bluetooth : </span>${Bluetooth}</p>
                                        <p><span class='fw-bold'>Radio : </span>${Radio}</p>
                                        <p><span class='fw-bold'>USB : </span>${USB}</p>
                                        <p><span class='fw-bold'>GPS : </span>${GPS}</p>
                                        <p><span class='fw-bold'>WALN : </span>${WLAN}</p>
                                    </div>


                                  

                            </div>
                        </div>
                    </div>
  `
        maindiv.appendChild(div);

    } else {
        console.log('mobile details is not founded');
    }
}