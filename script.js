import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { firebaseConfig } from "./firebase.js";
import {
  getDatabase,
  set,
  ref,
  push,
  onValue,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();

let form = document.getElementById("form");
let carBrand = document.getElementById("carBrandInput");
let carModel = document.getElementById("carModelInput");
let carYear = document.getElementById("carYearInput");
let carPrice = document.getElementById("carPriceInput");
let favCarPhoto = document.getElementById("favoriteCarPhotoInput");
let imgContainer = document.getElementById("imgContainer");

let insertBtn = document.getElementById("insertBtn");
let updateBtn = document.getElementById("updateBtn");
let deleteBtn = document.getElementById("deleteBtn");

insertBtn.addEventListener("click", (ev) => {
  ev.preventDefault();

  //   const cname = carBrand.value;
  //   const cmodel = carModel.value;
  //   const cyear = carYear.value;
  //   const cprice = carPrice.value;
  //   const cphoto = favCarPhoto.value;

  set(push(ref(db, "cars/")), {
    name: carBrand.value,
    model: carModel.value,
    year: carYear.value,
    price: carPrice.value,
    photo: favCarPhoto.value,
  })
    .then(() => {
      alert("Added");
      form.reset();
      getData();
    })
    .catch((err) => {
      alert(err);
    });
});

/////////////////////////////////////////////

const getData = function () {
  get(child(ref(db), "cars/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const data = snapshot.val();

        for (let car in data) {
          const carData = data[car];
          console.log("Car data:", carData);
          imgContainer.innerHTML += `
            <div class="card" style="width:250px; height: 400px; border: 1px solid black; margin-bottom: 10px">
            <img src="${carData.photo}" alt="car" style="object-fit:cover"/>
            <h2>${carData.name}</h2>
            <h6>${carData.model}</h6>
            <p>Metai: ${carData.year}</p>
            <h3>Kaina: ${carData.price} $</h3>
            </div>`;
        }
      } else {
        console.log("No data");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

getData();

////////////////////////////////////////////

// updateBtn.addEventListener("click", (ev) => {
//   ev.preventDefault();

//   onValue(ref(db, "cars/" + carBrand.value), (snapshot) => {
//     const data = snapshot.val();

//     if (snapshot.exists()) {
//       const data = snapshot.val();

//       carBrand.value = data.name;
//       carModel.value = data.model;
//       carYear.value = data.year;
//       carPrice.value = data.price;
//       carBrand.value = data.photo;
//     } else {
//       console.log("Vapshe no data");
//     }
//   });
// });
