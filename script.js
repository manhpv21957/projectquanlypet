"use Strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const breedInput = document.getElementById("input-breed");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
let petArr;
const tableBodyEl = document.getElementById("tbody");
const d = new Date();
const btnHealthyCheck = document.querySelector("#healthy-btn");
const btnShowAll = document.querySelector("#All-btn");
const btnCalBMI = document.querySelector("#cal-BMI");
// Lấy dữ liệu có sẵn của pet từ Local Storage, nếu không có sẵn thì petArr = []
if (!getFromStorage("petArr")) {
  petArr = [];
} else {
  petArr = getFromStorage("petArr");
}
renderTable(petArr);

// Lấy dữ liệu có sẵn của breed từ Local Storage, nếu không có sẵn thì breedArr = []
let breedArr;
if (!getFromStorage("breedArr")) {
  breedArr = [];
} else {
  breedArr = getFromStorage("breedArr");
}
displayNameOfType();
// Animation
const activeSidebar = document.getElementById("sidebar");
activeSidebar.addEventListener("click", function () {
  activeSidebar.classList.toggle("active");
});
// xóa dữ liệu nhập vào
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "0";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "0";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
// hàm validateData kiểm tra dữ liệu nhập vào
function validateData(data) {
  let isValidate = true;
  if (petArr.length >= 1) {
    for (let i = 0; i < petArr.length; i++) {
      if (data.id == petArr[i].id) {
        alert("Id must be unique");
        isValidate = false;
        break;
      }
    }
  }
  if (data.id == "") {
    alert("You must type the id to manage easier");
    isValidate = false;
  }
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
  if (data.type == "0") {
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
  if (data.breed == "0") {
    alert("You must choose anyType of animals in the Select Type part");
    isValidate = false;
  }
  return isValidate;
}
// Hàm render đưa dữ liệu hiển thị lên bảng tab Home
function renderTable(petArr) {
  tableBodyEl.innerHTML = "";
  console.log("ok");
  for (let i = 0; i < petArr.length; i++) {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${petArr[i].id}</td>
        <td>${petArr[i].name}</td>
        <td>${petArr[i].age}</td>
        <td>${petArr[i].type}</td>
        <td>${petArr[i].weight}</td>
        <td>${petArr[i].length}</td>
        <td>${petArr[i].breed}</td>
        <td><i class="bi bi-square-fill" style="color: ${
          petArr[i].color
        }"></i></td>
        <td>
            <i class="${
              petArr[i].vaccinated
                ? "bi bi-check-circle-fill"
                : "bi bi-x-circle-fill"
            }"></i>
        </td>
        <td>
            <i class="${
              petArr[i].dewormed
                ? "bi bi-check-circle-fill"
                : "bi bi-x-circle-fill"
            }"></i>
        </td>
        <td>
            <i class="${
              petArr[i].sterilized
                ? "bi bi-check-circle-fill"
                : "bi bi-x-circle-fill"
            }"></i>
        </td>
        <td>${petArr[i].date}</td>
        <td>
	<button class="btn btn-danger" onclick="deletePet('${
    petArr[i].id
  }')">Delete</button> 
</td>`;

    tableBodyEl.appendChild(row);
  }
}
// hàm nút delete xóa các dữ liệu của pet
const deletePet = (petId) => {
  if (confirm("Are you sure?")) {
    const petIndex = petArr.findIndex((pet) => pet.id === petId);
    console.log(petIndex);
    if (petIndex !== -1) {
      petArr.splice(petIndex, 1);
      tableBodyEl.innerHTML = "";
      renderTable(petArr);
    }
  }
};
// hàm xử lý sự kiện khi nhấn vào nút submit
submitBtn.addEventListener("click", function () {
  // lấy giá trị đưa vào Object data
  const data = {
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
    bmi: "?",
    date: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
  };
  console.log(data);
  //   kiểm tra điều kiện nhập vào và thực hiện hiển thị dữ liệu lên bảng
  if (validateData(data)) {
    petArr.push(data);
    saveToStorage("petArr", petArr);
    renderTable(getFromStorage("petArr"));
    clearInput();
  }
});
// Hàm xử lý sự kiện khi nhấn vào nút Show Healthy Pet để hiển thị thú cưng khỏe mạnh
btnHealthyCheck.addEventListener("click", function () {
  tableBodyEl.innerHTML = "";
  checkHealthy();
  // thay đổi hiển thị giữa 2 nút Show All Pet and Show Healthy Pet
  btnShowAll.classList.remove("hidden");
  btnHealthyCheck.classList.add("hidden");
});
// nút nhấn hiển thị tất cả thú cưng
btnShowAll.addEventListener("click", function () {
  console.log(petArr);
  tableBodyEl.innerHTML = "";
  renderTable(petArr);
  // thay đổi hiển thị giữa 2 nút Show All Pet and Show Healthy Pet
  btnHealthyCheck.classList.remove("hidden");
  btnShowAll.classList.add("hidden");
});
// tạo ra mảng mới chứa các object của thú cưng khỏe mạnh

// Hàm kiểm tra thú cưng khỏe mạnh
function checkHealthy() {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    let healthy = [];
    if (
      petArr[i].vaccinated == true &&
      petArr[i].dewormed == true &&
      petArr[i].sterilized == true
    ) {
      healthy.push(petArr[i]);
      renderTable(healthy);
    }
  }
}
// Hàm tạo ra các thẻ option để hiển thị các giống
function renderBreed(breedX) {
  const breedInput = document.getElementById("input-breed");
  breedInput.innerHTML = "<option>Select Breed</option>";
  breedX.forEach(function (item) {
    const option = document.createElement("option");
    option.innerHTML = item.input;
    breedInput.appendChild(option);
  });
}
// Hàm để hiển thị các thú cưng theo từng trường chó hoặc mèo
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
