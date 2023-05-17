const text_btn_u = document.getElementsByTagName('input')[0];
text_btn_u.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    display_check_input_username();
  }
});
const text_btn_p = document.getElementsByTagName('input')[1];
text_btn_p.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    display_check_input_password();
  }
});
const submit_btn = document.getElementsByTagName('input')[2];
submit_btn.addEventListener('click', display_check_input);



function check_input_username(username) {
  if (username.length > 40 || username.length < 5) {
    console.log("check_input_username : return 1 - username length out of range");
    return 1;
  }
  if (username.includes(' ')) {
    console.log("check_input_username : return 11 - incloud ' '");
    return 11;
  }
  if (username.includes(',')) {
    console.log("check_input_username : return 12 - incloud ','");
    return 12;
  }
  if (username.includes(';')) {
    console.log("check_input_username : return 13 - incloud ';'");
    return 13;
  }
  if (username.includes('=')) {
    console.log("check_input_username : return 14 - incloud '='");
    return 14;
  }
  if (username.includes('&')) {
    console.log("check_input_username : return 15 - incloud '&'");
    return 15;
  }
  let text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()-_+[]{}:'|`~<.>/?";
  for (let i = 0; i < username.length; i++) {
    if (!text.includes(username[i])) {
      console.log("check_input_username : return 3 - outof abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()-_+[]{}:'|`~<.>/?");
      return 3;
    }
  }
  return 100;
}
function check_input_password(password) {
  if (password.length > 40 || password.length < 5) {
    console.log("check_input_password : return 1 - password length out of range");
    return 1;
  }
  if (username.includes(' ')) {
    console.log("check_input_password : return 11 - incloud ' '");
    return 11;
  }
  if (username.includes(',')) {
    console.log("check_input_password : return 12 - incloud ','");
    return 12;
  }
  if (username.includes(';')) {
    console.log("check_input_password : return 13 - incloud ';'");
    return 13;
  }
  if (username.includes('=')) {
    console.log("check_input_password : return 14 - incloud '='");
    return 14;
  }
  if (username.includes('&')) {
    console.log("check_input_password : return 15 - incloud '&'");
    return 15;
  }
  let text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()-_+[]{}:'|`~<.>/?";
  for (let i = 0; i < password.length; i++) {
    if (!text.includes(password[i])) {
      console.log("check_input_password : return 3 - outof abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()-_+[]{}:'|`~<.>/?");
      return 3;
    }
  }
  let numbers = "0123456789";
  let charachters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let is_numbers = false;
  let is_letter = false;
  for (let i = 0; i < password.length; i++) {
    if (numbers.includes(password[i])){
      is_numbers = true;
      break;
    }
  }
  for (let i = 0; i < password.length; i++) {
    if (charachters.includes(password[i])){
      is_letter = true;
      break;
    }
  }
  if ( !is_numbers ){
    console.log("check_input_password : return 4 - not incloud least one number");
      return 4;
  }
  if ( !is_letter ){
    console.log("check_input_password : return 5 - not incloud least one letter");
      return 5;
  }
  return 100;
}


function display_check_input_username() {
  username = text_btn_u.value;
  console.log("The user input Usertname is [",username,"]");
  let i = check_input_username(username);
  if (i === 1) {
    alert("Username must be 5 characters or longer.")
    return 0;
  }
  if (i === 11) {
    alert("Username cannot contain ' '")
    return 0;
  }
  if (i === 12) {
    alert("Username cannot contain ','")
    return 0;
  }
  if (i === 13) {
    alert("Username cannot contain ';'")
    return 0;
  }
  if (i === 14) {
    alert("Username cannot contain '='")
    return 0;
  }
  if (i === 15) {
    alert("Username cannot contain '&'")
    return 0;
  }
  if (i === 3) {
    alert("Username can only use characters from the following string:\nabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()-_+[]{}:'|`~<.>/?")
    return 0;
  }
  if (i === 100) {
    return 1;
    // window.location.replace("https://www.pic.ucla.edu/~jiaqiyang/HW3/shut_the_box.html");
    }
  }
function display_check_input_password() {
  password = text_btn_p.value;
  console.log("The user input Password is [",password,"]");
  let i = check_input_password(password);
  if (i === 1) {
    alert("Password must be 5 characters or longer.")
    return 0;
  }
  if (i === 11) {
    alert("Password cannot contain ' '")
    return 0;
  }
  if (i === 12) {
    alert("Password cannot contain ','")
    return 0;
  }
  if (i === 13) {
    alert("Password cannot contain ';'")
    return 0;
  }
  if (i === 14) {
    alert("Password cannot contain '='")
    return 0;
  }
  if (i === 15) {
    alert("Password cannot contain '&'")
    return 0;
  }
  if (i === 3) {
    alert("Password can only use characters from the following string:\nabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()-_+[]{}:'|`~<.>/?")
    return 0;
  }
  if (i === 4) {
    alert("Password should incloud least one number")
    return 0;
  }
  if (i === 5) {
    alert("Password should incloud least one letter")
    return 0;
  }
  if (i === 100) {
    return 1;
    // window.location.replace("https://www.pic.ucla.edu/~jiaqiyang/HW3/shut_the_box.html");
    }
  }
function display_check_input(){
  let u = display_check_input_username();
  let p = display_check_input_password();
  if ( u === 1 && p === 1){
    console.log("The user input Usertname is [",text_btn_u.value,"]");
    console.log("The user input Password is [",text_btn_p.value,"]");
  }
}


window.onload = function() {
}



