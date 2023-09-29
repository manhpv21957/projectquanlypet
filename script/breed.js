// Dat bien

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
const storeBreed = (x) => saveToStorage("breed-list", x);
const petBreed = getFromStorage("breed-list") || [];
console.log(petBreed);

// Bo sung animation cho sidebar
sidebarTitleEl.addEventListener("click", function (e) {
  e.preventDefault();
  sidebarEl.classList.toggle("active");
});
// Ham hien thi du lieu
const renderTableData = function (x) {
  tbody.innerHTML = "";
  for (let i = 0; i < x.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<td scope="row">${x.indexOf(x[i]) + 1}</td>
    <td>${x[i].breed}</td>
    <td>${x[i].type}</td>
    <td>
    <button type="button" class="btn btn-danger">
    Delete
    </button>
    </td>`;
    tbody.appendChild(row);
  }
  // Bat su kien "click" vao nut "Delete"
  const btnsDelete = document.querySelectorAll(".btn-danger");
  btnsDelete.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      petBreed.splice(i, 1); //thuc hien xoa
      storeBreed(petBreed); //lưu, cap nhat lai cái array petBreed
      renderTableData(petBreed); //hien thi ra bảng
    });
  });
};
// Tao ham kiem tra du lieu hop le
const validate = function () {
  if (typeInput.value === "Select Type" || typeInput.value === "") return false;
  if (breedInput.value === "") return false;
  return true;
};
renderTableData(petBreed);
// Bat su kien "click" vao nut "Submit"
// Lay duoc du lieu tu input form
submitBtn.addEventListener("click", function () {
  const breedData = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  // Thong bao den nguoi dung neu du lieu khong hop le
  if (typeInput.value === "Select Type" || typeInput.value === "")
    alert("Please select type");
  if (breedInput.value === "Select Breed" || breedInput.value === "")
    alert("Please input breed");
  // Kiem tra du lieu hop le bang cach goi ham validate
  validate();
  // Du lieu hop le thi hien thi
  if (validate()) {
    petBreed.push(breedData);
    renderTableData(petBreed);
    storeBreed(petBreed);
    // 5. Xoa cac du lieu vua nhap tren form
    typeInput.value = "";
    breedInput.value = "";
  }
});
console.log(petBreed);
