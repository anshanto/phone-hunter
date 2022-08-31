const loadPhone = async (searchFieldText, dataLimit) => {
    const url = (`https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`)
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
};

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // display 20 phone
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    // display no phone found
    const noFoundPhone = document.getElementById('warning-message')
    if (phones.length === 0) {
        noFoundPhone.classList.remove('d-none')
    }
    else {
        noFoundPhone.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone ? phone.image : 'https://i.ibb.co/g9CSkZQ/image.png'}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone ? phone.phone_name : 'No Name'}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                 to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    // stop loader
    toggleSpinner(false);
}

const searchProcess = (dataLimit) => {
    // start loader
    toggleSpinner(true);
    const searchFieldId = document.getElementById('search-field');
    const searchFieldText = searchFieldId.value;
    searchFieldId.value = '';
    loadPhone(searchFieldText, dataLimit);
}

document.getElementById('search-btn').addEventListener('click', function () {
    searchProcess(10);
})

document.getElementById('search-field').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        searchProcess(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderDiv = document.getElementById('loader');
    if (isLoading) {
        loaderDiv.classList.remove('d-none')
    }
    else {
        loaderDiv.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    searchProcess();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayLoadPhoneDetails(data.data)
}

const displayLoadPhoneDetails = (phoneDeatils) => {
    const phoneTitle = document.getElementById('phoneDetailsModalLabel');
    phoneTitle.innerText = phoneDeatils.name
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img src="${phoneDeatils ? phoneDeatils.image : 'https://i.ibb.co/g9CSkZQ/image.png'}" class="card-img-top h-50 w-50" alt="...">
    <p>${phoneDeatils ? phoneDeatils.releaseDate : 'N/A'}</p>
    <p>storage: ${phoneDeatils.mainFeatures ? phoneDeatils.mainFeatures.storage : 'N/A'}</p>
    <p>Display: ${phoneDeatils.mainFeatures ? phoneDeatils.mainFeatures.displaySize : 'N/A'}</p>
    <p>Blutooth: ${phoneDeatils.others ? phoneDeatils.others.Bluetooth : 'N/A'}</p>
    `
}
// loadPhone();