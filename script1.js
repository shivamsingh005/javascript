//   Validation
function validation() {
  let valid = true;
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var dob = document.getElementById("dob").value;
  var quali = document.getElementById("quali").value;
  var hobbies = [];
  hobbies = document.getElementsByClassName("hobbietextbox").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  // first name
  if (fname.trim() == "") {
    document.getElementById("fname1").innerHTML =
      "*Please don't submit blank field*";
    document.getElementById("fname").style.border = "1px solid red";
    valid = false;
  } else if (fname.length < 2 || fname.length > 20) {
    document.getElementById("fname1").innerHTML =
      "*Please enter valid First Name*";
    document.getElementById("fname").style.border = "1px solid red";
    valid = false;
  } else if (!isNaN(fname.trim())) {
    document.getElementById("fname1").innerHTML =
      "*Please enter valid student name don't use Numbers*";
    document.getElementById("fname").style.border = "1px solid red";
    valid = false;
  }
  //   last name
  if (lname.trim() == "") {
    document.getElementById("lname1").innerHTML =
      "*Please don't submit blank field*";
    document.getElementById("lname").style.border = "1px solid red";
    valid = false;
  } else if (lname.length < 2 || lname.length > 20) {
    document.getElementById("lname1").innerHTML =
      "*Please enter valid First Name*";
    document.getElementById("lname").style.border = "1px solid red";
    valid = false;
  } else if (!isNaN(lname.trim())) {
    document.getElementById("lname1").innerHTML =
      "*Please enter valid student name don't use Numbers*";
    document.getElementById("lname").style.border = "1px solid red";
    valid = false;
  }
  //   dob
  if (dob.trim() == "") {
    document.getElementById("dob1").innerHTML =
      "*Please don't submit blank field*";
    document.getElementById("dob").style.border = "1px solid red";
    valid = false;
  }
  //   quallification
  if (!quali) {
    document.getElementById("quali1").innerHTML =
      "*Please don't submit blank field*";
    document.getElementById("quali").style.border = "1px solid red";
    valid = false;
  }
  //   hobbies
  //   if (!hobbies) {
  //     document.getElementById("hobbies1").innerHTML =
  //       "*Please don't submit blank field*";
  //     document.getElementsByClassName("hobbietextbox").style.border =
  //       "1px solid red";
  //     valid = false;
  //   }
  //  email
  let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  if (email.trim() == "") {
    document.getElementById("email1").innerHTML =
      "*Please don't submit blank field*";
    document.getElementById("email").style.border = "1px solid red";
    valid = false;
  } else if (!regEmail.test(email)) {
    document.getElementById("email1").innerHTML =
      "*Please enter valid Email Address*";
    document.getElementById("email").style.border = "1px solid red";
    valid = false;
  }
  //   phone
  var regPhone = /^\d{10}$/;
  if (phone.trim() == "") {
    document.getElementById("phone1").innerHTML =
      "*Please don't submit blank field*";
  } else if (phone.charAt(0) >= 6 && phone.charAt(0) <= 9) {
    if (!regPhone.test(phone)) {
      document.getElementById("phone1").innerHTML =
        "*Please enter valid Phone Number*";
    }
  } else {
    document.getElementById("phone1").innerHTML =
      "*Please enter valid Phone Number*";
  }
  return valid;
}
function onClickSubmit() {
  let valid = validation();
  debugger;
  if (valid) {
    var id = document.getElementById("id").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var dob = document.getElementById("dob").value;
    var quali = document.getElementById("quali").value;
    var hobbies = [];
    var hobbies1 = document.getElementsByClassName("hobbietextbox");
    for (let i = 0; i < hobbies1.length; i++) {
      hobbies.push(hobbies1[i].value);
    }
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    let lstore = {
      id: id,
      fname: fname,
      lname: lname,
      dob: dob,
      quali: quali,
      hobbies: hobbies,
      email: email,
      phone: phone,
    };
    // console.log(hobbies[0].value);
    if (!id) {
      let calid = calculateId();
      lstore.id = calid;
      saveData(lstore);
    } else {
      update(lstore);
    }
  }
}
function calculateId() {
  let id = 1;
  if (localStorage.getItem("lstore") != null) {
    var lstore = JSON.parse(localStorage.getItem("lstore"));
    if (lstore && lstore.length > 0)
      id = parseInt(lstore[lstore.length - 1].id) + 1;
  }
  return id;
}
function saveData(lstore) {
  var storeobject = [];
  if (localStorage.getItem("lstore") != null) {
    storeobject = JSON.parse(localStorage.getItem("lstore"));
  }
  storeobject.push(lstore);
  localStorage.setItem("lstore", JSON.stringify(storeobject));

  showdata();
  resetData();
  return false;
}
function resetData() {
  document.getElementById("id").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("quali").value = "";
  document.getElementsByClassName("hobbietextbox").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}
function showdata() {
  var allData = [];
  if (localStorage.getItem("lstore") != null) {
    allData = JSON.parse(localStorage.getItem("lstore"));
  } else {
    console.log("storage is null");
  }

  var printdata = ``;
  for (var i = 0; i < allData.length; i++) {
    printdata =
      printdata +
      `<td>${allData[i].fname}</td><td>${allData[i].lname}</td><td>${allData[i].dob}</td><td>${allData[i].quali}</td>
              <td>${allData[i].hobbies}</td></td><td>${allData[i].email}</td> <td>${allData[i].phone}</td>  
              <td><button class="edit"  onclick="edit(${i})" >edit</button>
               </td> <td><button onclick="del(${i})"  >Delete</button>   </tr>`;
  }

  document.getElementById("tabdata").innerHTML = printdata;
}
showdata();
function del(i) {
  var arr = [];
  arr = JSON.parse(localStorage.getItem("lstore"));
  arr.splice(i, 1);
  localStorage.setItem("lstore", JSON.stringify(arr));
  showdata();
}
function update(lstore) {
  debugger;
  var arr1 = [];
  if (localStorage.getItem("lstore") != null) {
    arr1 = JSON.parse(localStorage.getItem("lstore"));
    let index = arr1.findIndex((x) => x.id == lstore.id);
    arr1.splice(index, 1, lstore);
  }
  localStorage.setItem("lstore", JSON.stringify(arr1));

  showdata();
  resetData();
  return false;
}

function edit(i) {
  var arr = [];
  arr = JSON.parse(localStorage.getItem("lstore"));

  document.getElementById("id").value = arr[i].id;
  document.getElementById("fname").value = arr[i].fname;
  document.getElementById("lname").value = arr[i].lname;
  document.getElementById("dob").value = arr[i].dob;
  document.getElementById("quali").value = arr[i].quali;
  for (let j = 0; j < arr[i].hobbies.length; j++) {
    hobButton();
    document.getElementsByClassName("hobbietextbox").value = arr[i].hobbies[j];
  }
  document.getElementById("email").value = arr[i].email;
  document.getElementById("phone").value = arr[i].phone;

  localStorage.setItem("lstore", JSON.stringify(arr));
  showdata();
}
let hobSet = document.getElementById("hobSet");
let hobbtn = document.getElementById("hobbtn");

// hobbies add
function hobButton() {
  debugger;
  var getValue = document.getElementsByClassName("hobbietextbox");

  for (var i = 0; i < getValue.length; i++) {
    var getValueofClass = document.getElementsByClassName("hobbietextbox")[i];
    var validate = CheckValidation(getValueofClass);
    if (!validate) {
      document.getElementById("errormessage").innerText =
        "Can't be left blank!!!";
      return;
    }
  }

  document.getElementById("errormessage").innerText = "";
  var newDiv = document.createElement("div");
  newDiv.className = "group";

  var inputElem = document.createElement("input");
  inputElem.type = "text";
  inputElem.setAttribute("class", "hobbietextbox");
  newDiv.appendChild(inputElem);

  var btnElem = document.createElement("button");
  btnElem.type = "button";
  btnElem.textContent = "x";
  btnElem.addEventListener("click", removeUrlBox);
  newDiv.appendChild(btnElem);

  var element = document.getElementById("hobSet");
  element.appendChild(newDiv);
  return false;
}
// hobbies delete
function delHobbies() {
  document.getElementById("btndel").remove();
  document.getElementById("hobbies1").remove();
}

function removeUrlBox() {
  this.closest(".group").remove();
}

function CheckValidation(hobbies) {
  if (hobbies.value.length == 0) {
    return false;
  }
  return true;
}
