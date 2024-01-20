const loadPhones = async () => {
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
  res = await fetch(url);
  data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  console.log(phones);
  phones.forEach((phone) => {
    console.log(phone);
    const allPhonesDiv = document.getElementById("all-phones-div");
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
};

loadPhones();
