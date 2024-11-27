let siteName = document.getElementById("siteName");
let websiteurl = document.getElementById("websiteurl");
let tBody = document.getElementById("tBody");
let formAlert = document.getElementById("formAlert")
let lightContainer = document.querySelector(".light-Container");
let closeBtn = document.getElementById("close");


urlList = [];

if (localStorage.getItem("siteName") != null) {
  urlList = JSON.parse(localStorage.getItem("siteName"));

  displayUrl(urlList);
}

function submit() {
  if(valditionForm(siteName) && valditionForm(websiteurl)){

    let Sites = {
      Name: siteName.value,
      siteurl: websiteurl.value,
    };
  
    urlList.push(Sites);
    localStorage.setItem("siteName", JSON.stringify(urlList));
    clearform()
    displayUrl(urlList);
    formAlert.classList.add("d-none")
  }
  else{
    formAlert.classList.remove("d-none")
  }
}

function clearform() {
  siteName.value = null;
  websiteurl.value = null;
}

function displayUrl() {
  let cartona = "";

  for (let i = 0; i < urlList.length; i++) {
    cartona += `
                    <tr>
                       <td scope="col">${i + 1}</td>
                       <td scope="col">${urlList[i].Name}</td>
                       <td><a href="${urlList[i].siteurl}" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                       <td><button onclick="deleteUrl(${i})" class="btn btn-danger pe-2"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                    </tr>
        `;
  }

  tBody.innerHTML = cartona;
}


function deleteUrl(deleteIndex) {
  urlList.splice(deleteIndex, 1);
  localStorage.setItem("siteName", JSON.stringify(urlList));
  displayUrl(urlList);
}

function valditionForm(element) {
    var regex = {
      siteName: /^[A-Z]{1}[a-z]{0,10}$/,
      websiteurl: /(www|http:|https:)+[^\s]+[\w]$/,
    };
  
    if (regex[element.id].test(element.value)) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      return true
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      return false
    }
  }


  closeBtn.addEventListener("click" , function(){
    close()
  })

  document.addEventListener("click", function (e) {
    if (e.target === lightContainer) {
      close();
    }
  });

  function close(){
    lightContainer.classList.add("d-none");
  }