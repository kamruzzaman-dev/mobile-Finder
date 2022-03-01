const search = () => {
    const inputField = document.getElementById('input-field').value;
    // bouns marks => case sensative section add
    const inputFieldText = inputField.toLowerCase();
    // API call
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showSearchResult(data));
}


const showSearchResult = (data) => {
    const searchResultShow = document.getElementById('search-result-show');
    console.log(data);

    // clear the pervious content on the page 
    document.getElementById('mobile-not-found-message').style.display = 'none';
    searchResultShow.textContent = '';

    if (data.status == true) {
        const dataArray = data.data;
        for (const item of dataArray) {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card">
                        <img src=${item.image} alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${item.phone_name}</h5>
                            <p class="card-text">${item.brand}</p>
    
                            <!-- Button trigger modal and showing more details -->
                            <div class="text-center">
                                <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetails('${item.slug}')">See
                                    Details</a>
                            </div>
                        </div>
                    </div>
            `
            searchResultShow.appendChild(div);
        }
    } else {
        document.getElementById('mobile-not-found-message').style.display = 'block';
    }

}


// show details on page after it selecting 
const showDetails = (id) =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`

    // api load
    fetch(url)
    .then(res =>res.json())
    .then(data=>showDetailsOnPage(data));
}

const showDetailsOnPage = (data) => {
    console.log(data);
    const maindiv = document.getElementById('product-page-details');

    maindiv.textContent='';
    const div = document.createElement('div');

    if(data.status == true){

  
    const mobileData = data.data;

    div.innerHTML=`<div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <div class="d-flex m-2 justify-content-center align-items-center ">
    <div class="card border-0 shadow-none  w-50">
    <img src="${mobileData.image}" class=" img-fluied rounded-start" alt="...">
        
    </div>
    <div class="ms-5 w-50">
        <h3  >Model: ${mobileData.name}</h3>
        <h4>ReleaseData: ${mobileData.releaseDate}</h4>
        <p  ><span class='h4'>Brand:</span> ${mobileData.brand}</p>
        <p ><span class='h3'>Review: </span> <span class='text-warning'> <i class="fa-solid fa-star "></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> </span> </p>
       
    </div>
  </div>
    </div>
  
  </div>
  `
  maindiv.appendChild(div);

}else{
    console.log('mobile details is not founded');
}
}