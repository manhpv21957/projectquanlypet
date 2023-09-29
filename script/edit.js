"use strict";
const tableBodyEl = document.getElementById("tbody");
const displayEdit = document.querySelector(".hide");
let idInput = document.getElementById("input-id");
const editPet = document.getElementById("edit-pet");
let nameInput = document.getElementById("input-name");
let ageInput = document.getElementById("input-age");
let typeInput = document.getElementById("input-type");
let weightInput = document.getElementById("input-weight");
let lengthInput = document.getElementById("input-length");
let colorInput = document.getElementById("input-color-1");
let vaccinatedInput = document.getElementById("input-vaccinated");
let dewormedInput = document.getElementById("input-dewormed");
let sterilizedInput = document.getElementById("input-sterilized");
let breedInput = document.getElementById("input-breed");
const submitBtn = document.querySelector("#submit-btn");
let petArr;
let breedArr;
const d = new Date();
// Animation
const activeSidebar = document.getElementById("sidebar");
activeSidebar.addEventListener("click", function () {
  activeSidebar.classList.toggle("active");
});
// Lấy các giá trị giống thú cưng có sẵn trong Local Storage, nếu không có thì breedArr = []
if (!getFromStorage("breedArr")) {
  breedArr = [];
} else {
  breedArr = getFromStorage("breedArr");
}
console.log(breedArr);
// Lấy các giá trị thú cưng có sẵn trong Local Storage, nếu không có thì petArr = []
if (!getFromStorage("petArr")) {
  petArr = [];
} else {
  petArr = getFromStorage("petArr");
}
// hàm hiển thị giống thú cưng theo từng trường Chó hoặc mèo
function displayNameOfType() {
  let selectedType = document.getElementById("input-type").value;
  if (selectedType == "Dog") {
    const dogBreeds = breedArr.filter((item) => item.type == "Dog");
    renderBreed(dogBreeds);
  } else if (selectedType == "Cat") {
    const catBreeds = breedArr.filter((item) => item.type == "Cat");
    renderBreed(catBreeds);
  } else {
    renderBreed([]);
  }
}
// Hàm tạo ra các tag option của phần "Select Breed"
function renderBreed(breedX) {
  const breedInput = document.getElementById("input-breed");
  breedInput.innerHTML = "<option>Select Breed</option>";
  breedX.forEach(function (item) {
    const option = document.createElement("option");
    option.value = item.input;
    option.innerHTML = item.input;
    breedInput.appendChild(option);
  });
}
// Hàm validate các dữ liệu được người dùng sửa
function validateDataEdit(data) {
  let isValidate = true;
  if (data.name == "") {
    alert("You must type the name to manage easier");
    isValidate = false;
  }
  if (isNaN(data.age) == true || data.age == "") {
    alert("You must type a number into the blank");
    isValidate = false;
  }
  if (data.age < 1 || data.age > 15) {
    alert("The age must be in 1 to 15");
    isValidate = false;
  }
  if (data.type == "Select Type") {
    alert("You must choose anyType of animals in the Select Type part");
    isValidate = false;
  }
  if (isNaN(data.weight) == true || data.weight == "") {
    alert("You must type the weight into the blank");
    isValidate = false;
  }
  if (data.weight < 1 || data.weight > 15) {
    alert("The weight must be in 1 to 15");
    isValidate = false;
  }
  if (isNaN(data.length) == true || data.length == "") {
    alert("You must type the length into the blank");
    isValidate = false;
  }
  if (data.length < 1 || data.length > 15) {
    alert("The length must be in 1 to 15");
    isValidate = false;
  }
  if (data.breed == "Select Breed") {
    alert("You must choose anyType of animals in the Select Type part");
    isValidate = false;
  }
  return isValidate;
}
// Hàm hiển thị lại dữ liệu sau khi người dùng đã edit xong
rendertableEdit(petArr);
function rendertableEdit(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach(function (item) {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>${
      item.age
    }</td><td>${item.type}</td><td>${item.weight}</td><td>${
      item.length
    }</td><td>${
      item.breed
    }</td><td><i class="bi bi-square-fill" style="color: ${
      item.color
    }"></i></td><td>
          <i class="${
            item.vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
          }"></i>
      </td><td>
      <i class="${
        item.dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
      }"></i>
  </td><td>
  <i class="${
    item.sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
  }"></i>
</td>
<td>${item.date}</td>
<td>
<button class="btn btn-warning" onclick="Edit('${item.id}')">Edit</button> 
</td>`;
    tableBodyEl.appendChild(row);
  });
}
// Hàm hiển thị các giá trị trước khi tiến hành sữa của thú cưng

function Edit(petX) {
  // console.log("xin chao");
  let editIndex = petArr.findIndex((pet) => pet.id == petX);
  let option = document.createElement("option");
  if (editIndex !== -1) {
    option = `${petArr[editIndex].breed}`;
    displayEdit.classList.remove("hide");
    idInput.value = petArr[editIndex].id;
    nameInput.value = petArr[editIndex].name;
    ageInput.value = petArr[editIndex].age;
    typeInput.value = petArr[editIndex].type;
    weightInput.value = petArr[editIndex].weight;
    lengthInput.value = petArr[editIndex].length;
    colorInput.value = petArr[editIndex].color;
    vaccinatedInput.checked = petArr[editIndex].vaccinated;
    dewormedInput.checked = petArr[editIndex].dewormed;
    sterilizedInput.checked = petArr[editIndex].sterilized;
    console.log(petArr[editIndex].breed);
    console.log(breedInput);
    //hiện thị các loài cat dog
    if (typeInput.value == "Dog") {
      const dogBreeds = breedArr.filter((item) => item.type == "Dog");
      renderBreed(dogBreeds);
    } else if (typeInput.value == "Cat") {
      const catBreeds = breedArr.filter((item) => item.type == "Cat");
      renderBreed(catBreeds);
    } else {
      renderBreed([]);
    }
    breedInput.value = petArr[editIndex].breed;
  }
}
// Nút submit của phần edit
submitBtn.addEventListener("click", function () {
  const dataEdit = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
  };
  const editIndex = petArr.findIndex((pet) => pet.id == idInput.value);
  if (validateDataEdit(dataEdit)) {
    // Delete old data
    // xoa du lieu cu
    // cap nhat lai local storage
    // render local storage
    // console.log("xin chao");
    petArr[editIndex] = dataEdit;
    saveToStorage("petArr", petArr);
    displayEdit.classList.add("hide");
    rendertableEdit(petArr);
    // Type new data
    // Close the edit tab (hide)
  }
});
