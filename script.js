const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  res = await fetch(url);
  data = await res.json();
  displayPhones(data.data, dataLimit);
};

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
              <button class = "btn btn-primary">Show Details</button>
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
