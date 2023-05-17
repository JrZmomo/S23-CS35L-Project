const text_btn = document.getElementsByTagName('input')[0];
text_btn.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    display_check_input_username();
  }
});
const submit_btn = document.getElementsByTagName('input')[1];
submit_btn.addEventListener('click', display_check_input_username);

function check_input_username(username) {
  if (username.length > 40 || username.length < 5) {
    console.log("check_input_username : return 1 by username length out of range");
    return 1;
  }
  if (username.includes(' ') || username.includes(',') || username.includes(';') || username.includes('=') || username.includes('&')) {
    console.log("check_input_username : return 2 by incloud ' ',',',';','=','&'");
    return 2;
  }
  let text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()-_+[]{}:'|`~<.>/?";
  for (let i = 0; i < username.length; i++) {
    if (!text.includes(username[i])) {
      console.log("check_input_username : return 3 by outof abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()-_+[]{}:'|`~<.>/?");
      return 3;
    }
  }
  return 100;
}

function display_check_input_username() {
  username = text_btn.value;
  console.log("The user input Usrtname is [",username,"]");
  let i = check_input_username(username);
  if (i === 1 || i === 2) {
    alert("Username must be 5 characters or longer. \nUsername cannot contain commas.\nUsername cannot contain =.")
    return;
  }
  if (i === 3) {
    alert("Username can only use characters from the following string:\nabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()-_+[]{}:'|`~<.>/?")
    return;
  }

  if (i === 100) {

    console.log("CREATE  USERNAME [" + username + "]");
    let minute_in_future = new Date();
    minute_in_future.setMinutes(minute_in_future.getMinutes() + 1);
    document.cookie = 'username='+username+'; expires='+minute_in_future.toUTCString();
    // window.location.replace("https://www.pic.ucla.edu/~jiaqiyang/HW3/shut_the_box.html");
    }
  }
}

window.onload = function() {
  text_btn.value = get_username();
}