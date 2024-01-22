// Load all phones data
const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  res = await fetch(url);
  data = await res.json();
  displayPhones(data.data, dataLimit);
};

// Load single phone data
const loadSinglePhoneData = async (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  res = await fetch(url);
  data = await res.json();
  showSinglePhoneData(data.data);
};

// Showing single phone data
const showSinglePhoneData = (singlePhoneData) => {
  console.log(singlePhoneData);
  const modalTitle = document.getElementById("staticBackdropLabel");
  modalTitle.innerText = singlePhoneData.name;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <p>Brand: ${singlePhoneData.brand}</p>
  <p>Release Date: ${
    singlePhoneData.releaseDate ? singlePhoneData.releaseDate : "No data found"
  }</p>
  <p>Chipset: ${
    singlePhoneData.mainFeatures.chipSet
      ? singlePhoneData.mainFeatures.chipSet
      : "No data found"
  }</p>
  <p>Display Size: ${
    singlePhoneData.mainFeatures.displaySize
      ? singlePhoneData.mainFeatures.displaySize
      : "No data found"
  }</p>
  <p>Memory: ${
    singlePhoneData.mainFeatures.memory
      ? singlePhoneData.mainFeatures.memory
      : "No data found"
  }</p>
  <p>Storage: ${
    singlePhoneData.mainFeatures.storage
      ? singlePhoneData.mainFeatures.storage
      : "No data found"
  }</p>
  `;
};

loadSinglePhoneData();

// Display Phones
const displayPhones = (phones, dataLimit) => {
  const allPhonesDiv = document.getElementById("all-phones-div");
  const noPhonesFoundElement = document.getElementById(
    "no-phones-found-message"
  );
  const showAllButton = document.getElementById("show-all-button");
  if (phones.length === 0) {
    showAllButton.classList.add("d-none");
    loader(true);
    allPhonesDiv.innerHTML = ``;
    noPhonesFoundElement.classList.remove("d-none");
    loader(false);
  } else {
    // Show 10 phones
    if (dataLimit && phones.length > 0) {
      phones = phones.slice(0, dataLimit);
      showAllButton.classList.remove("d-none");
    } else {
      showAllButton.classList.add("d-none");
    }
    allPhonesDiv.innerHTML = ``;
    phones.forEach((phone) => {
      console.log(phone);
      const singlePhoneDiv = document.createElement("div");
      singlePhoneDiv.classList.add("col");
      singlePhoneDiv.innerHTML = `
      <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <button onclick = "loadSinglePhoneData('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show Details
              </button>
            </div>
      </div>
    `;
      allPhonesDiv.appendChild(singlePhoneDiv);
      noPhonesFoundElement.classList.add("d-none");
      loader(false);
    });
  }
};

// Search Function
const processSearch = (dataLimit) => {
  const searchFieldElement = document.getElementById("search-field");
  const searchText = searchFieldElement.value;
  loadPhones(searchText, dataLimit);
  // Start Loader
  loader(true);
};

// Search Functionality
document.getElementById("search-button").addEventListener("click", function () {
  processSearch(10);
});

// Search by enter key functionality
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

// Show All Functionality
document
  .getElementById("show-all-button")
  .addEventListener("click", function () {
    processSearch();
  });

// Loader Funtionality
const loader = (isTrue) => {
  const loaderElement = document.getElementById("loader");
  if (isTrue) {
    loaderElement.classList.remove("d-none");
  } else {
    loaderElement.classList.add("d-none");
  }
};
