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
    searchResultShow.textContent='';

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
                                <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">See
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
