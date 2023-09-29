"use strict";
const btnFind = document.querySelector("#find-btn");
let idInput = document.getElementById("input-id");
let nameInput = document.getElementById("input-name");
let typeInput = document.getElementById("input-type");
let vaccinatedInput = document.getElementById("input-vaccinated");
let dewormedInput = document.getElementById("input-dewormed");
let sterilizedInput = document.getElementById("input-sterilized");
let breedInput = document.getElementById("input-breed");
const tableBodyEl = document.getElementById("tbody");
let petArr;
let breedArr;
// Animation
const activeSidebar = document.getElementById("sidebar");
activeSidebar.addEventListener("click", function () {
  //click hiện ra
  activeSidebar.classList.toggle("active"); //toggle ẩn phần tử khi click vào lần nữa
});
// lấy dữ liệu các thú cưng có sẵn trong Local Storage, nếu không có dữ liệu nào thì petArr = []
if (!getFromStorage("petArr")) {
  petArr = [];
} else {
  petArr = getFromStorage("petArr");
}
renderTable(petArr);
// lấy dữ liệu breed có sẵn trong Local Storage, nếu không có dữ liệu nào thì breedArr = []
if (!getFromStorage("breedArr")) {
  breedArr = [];
} else {
  breedArr = getFromStorage("breedArr");
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
// Hàm tạo ra các thẻ option chứa các giống
function renderBreed(breedX) {
  const breedInput = document.getElementById("input-breed");
  breedInput.innerHTML = "<option>Select Breed</option>";
  breedX.forEach(function (item) {
    //foreach thực hiện câu chuyện để làm việc
    const option = document.createElement("option");
    option.innerHTML = item.input;
    breedInput.appendChild(option);
  });
}
// Hàm render table hiển thị tất cả thú cưng
function renderTable(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    let row = document.createElement("tr"); //createekement tạo một phần tử tr nối vào html
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
          `;

    tableBodyEl.appendChild(row);
  }
}
// hàm xóa các giá trị nhập sau khi người dùng nhấn nút Find
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
// Hàm xử lý sự kiện khi click vào nút Find
btnFind.addEventListener("click", function () {
  let findPetArr = petArr;
  if (idInput.value) {
    findPetArr = findPetArr.filter((item) => item.id.includes(idInput.value));
  } //Hàm include() được sử dụng để kiểm tra xem chuỗi đối số có trong chuỗi đã cho hay không . Chức năng này phân biệt chữ hoa chữ thường. Đối số Đối số đầu tiên của hàm searchString này là chuỗi cần tìm kiếm trong chuỗi đã cho.
  if (nameInput.value) {
    findPetArr = findPetArr.filter((item) =>
      item.name.includes(nameInput.value)
    );
  }
  if (typeInput.value !== "Select Type") {
    findPetArr = findPetArr.filter((item) =>
      item.type.includes(typeInput.value)
    );
  }
  if (breedInput.value !== "Select Breed") {
    findPetArr = findPetArr.filter((item) =>
      item.breed.includes(breedInput.value)
    );
  }
  if (vaccinatedInput.checked == true) {
    findPetArr = findPetArr.filter((item) => item.vaccinated == true);
  }
  if (dewormedInput.checked == true) {
    findPetArr = findPetArr.filter((item) => item.dewormed == true);
  }
  if (sterilizedInput.checked == true) {
    findPetArr = findPetArr.filter((item) => item.sterilized == true);
  }
  renderTable(findPetArr);
});
