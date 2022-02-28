const search = () => {
    const inputField = document.getElementById('input-field').value;
    // bouns marks => case sensative section add
    const inputFieldText = inputField.toLowerCase();
    // API call
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`
    fetch(url)
    .then(res => res.json())
    .then(data =>showSearchResult(data.data));
}


const showSearchResult=(data)=>{
    const searchResultShow = document.getElementById('search-result-show');
console.log(data);
    for(const item of data){
        const div = document.createElement('div');
        div.innerHTML={
            `<div class="card">
            <img src="${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">"${item.phone_name}"</h5>
                <p class="card-text">"${item.brand}"</p>

                <!-- Button trigger modal and showing more details -->
                <div class="text-center">
                    <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">See
                        Details</a>
                </div>
            </div>
        </div>`
        }
    }
}
