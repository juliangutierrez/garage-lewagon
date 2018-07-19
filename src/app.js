const form =  document.getElementById("new-car");

const getCars = () => {
//TODO FETCH CARS FROM THE API
	fetch("https://wagon-garage-api.herokuapp.com/garage/cars")
	.then(response => response.json())
	.then((data) => {
		data.forEach((car) => {
			addCarTemplate(car);
		}); 
	});
}

const addCarTemplate = (car) => {
//TODO ADD CAR TO LIST
	const carTemplate = `<div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/Ferrari 308 GTS" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
          </div>
        </div>`;
  const cars = document.querySelector(".cars-list");
  cars.insertAdjacentHTML("beforeend", carTemplate);
}

const createCar = (e) => {
//TODO SUBMIT FORM TO API
	e.preventDefault();
  
	const carInputs = {
    "brand": document.getElementById("brand").value,
    "model": document.getElementById("model").value,
    "owner": document.getElementById("owner").value,
    "plate": document.getElementById("plate").value
  };


  fetch("https://wagon-garage-api.herokuapp.com/garage/cars", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(carInputs) // body data type must match "Content-Type" header
  })
  .then(response => response.json()) // parses response to JSON
  document.querySelector(".cars-list").innerHTML = "";
  getCars();
}

getCars();

form.addEventListener("submit", createCar);