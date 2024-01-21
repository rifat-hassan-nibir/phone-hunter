const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  res = await fetch(url);
  data = await res.json();
  displayPhones(data.data);
};

// Display Phones
const displayPhones = (phones) => {
  console.log(phones);
  const allPhonesDiv = document.getElementById("all-phones-div");
  const noPhonesFoundElement = document.getElementById(
    "no-phones-found-message"
  );
  if (phones.length === 0) {
    loader(true);
    allPhonesDiv.innerHTML = ``;
    noPhonesFoundElement.classList.remove("d-none");
    loader(false);
  } else {
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
    });
    noPhonesFoundElement.classList.add("d-none");
    loader(false);
  }
};

// Search Functionality
document.getElementById("search-button").addEventListener("click", function () {
  const searchFieldElement = document.getElementById("search-field");
  const searchText = searchFieldElement.value;
  loadPhones(searchText);
  // Start Loader
  loader(true);
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
