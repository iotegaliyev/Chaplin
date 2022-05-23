var x = document.getElementById("login-form");
var y = document.getElementById("register-form");
var z = document.getElementById("pointer-btn");
var l = document.getElementById("login");
var r = document.getElementById("register");

function register(){
    clearBox();
    clearMessages();
    x.style.left = "-400px";
    y.style.left = "100px";
    z.style.left = "290px";
    l.style.color = "#848484";
    r.style.color = "#ff5100";
}

function login(){
    clearBox();
    clearMessages();
    x.style.left = "100px";
    y.style.left = "600px";
    z.style.left = "90px";
    l.style.color = "#ff5100";
    r.style.color = "#848484";
}		

function clearBox() {
    document.getElementById('username1').value = "";
    document.getElementById('password1').value = "";
    document.getElementById('username2').value = "";
    document.getElementById('email2').value = "";
    document.getElementById('phone2').value = "";
    document.getElementById('password2').value = "";
    document.getElementById('username1').classList.remove('invalid');
    document.getElementById('username1').classList.remove('valid');
    document.getElementById('password1').classList.remove('invalid');
    document.getElementById('password1').classList.remove('valid');
    document.getElementById('username2').classList.remove('invalid');
    document.getElementById('username2').classList.remove('valid');
    document.getElementById('email2').classList.remove('invalid');
    document.getElementById('email2').classList.remove('valid');
    document.getElementById('phone2').classList.remove('invalid');
    document.getElementById('phone2').classList.remove('valid');
    document.getElementById('password2').classList.remove('invalid');
    document.getElementById('password2').classList.remove('valid');
}


function showBox() {
    clearBox();

    document.getElementById('login_box').style.display = "block";
    // document.querySelector('body').style.overflow = "hidden";
}

var btnlogin = document.getElementById('signin-btn');

btnlogin.addEventListener('click', function() {
    showBox();
});

var btnClose = document.getElementById('close-btn');

btnClose.addEventListener('click', function() {
    closeBox();
});

function closeBox() {
    document.getElementById('login_box').style.display = "none";
    
}

function clearMessages() {
    document.getElementById('messagelogin').innerHTML = "";
    document.getElementById('messageusername').innerHTML = "";
    document.getElementById('messageemail').innerHTML = "";
    document.getElementById('messagephone').innerHTML = "";
    document.getElementById('messagepassword').innerHTML = "";
}


var users;
var user;

var signUpBtn = document.getElementById('sign_up');

signUpBtn.addEventListener('click', function() {
    
    event.preventDefault();

    var myUsername = document.getElementById('username2').value;
    var myEmail = document.getElementById('email2').value;
    var myPhone = document.getElementById('phone2').value;
    var myPassword = document.getElementById('password2').value;

   
    if (localStorage.getItem('users') == null) {
        users = [];
    }
    else {
        users = JSON.parse(localStorage.getItem('users'));
    }

    ValidUsername(myUsername);
    ValidMail(myEmail);
    ValidPhone(myPhone);
    ValidPassword(myPassword);
    
    if(ValidUsername(myUsername) && ValidMail(myEmail) && ValidPhone(myPhone) && ValidPassword(myPassword)) {
        
        user = {
            username: myUsername,
            email: myEmail,
            phone: myPhone,
            password: myPassword,
            isBlocked: false,
            isLoggedIn: false
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('You have registered!');
        closeBox();
    }
});

// Validation
function ValidUsername(myUsername) {
    var re = /^[a-z0-9_\.]{1,}$/;
    var valid = re.test(myUsername);
    document.getElementById('username2').classList.remove('invalid');
    document.getElementById('username2').classList.remove('valid');

    if (valid) {
        if(doesUsernameExist(myUsername)){
            document.getElementById('messageusername').style.display = "block";
            document.getElementById('messageusername').innerHTML = "Username is not available";
            document.getElementById('username2').classList.add('invalid');
        }else {
            document.getElementById('messageusername').style.display = "none";
            document.getElementById('username2').classList.add('valid');
            return true;
        }
    }
    else {
        document.getElementById('messageusername').style.display = "block";
        document.getElementById('username2').classList.add('invalid');
        document.getElementById('messageusername').innerHTML = "Entered username is incorrect";
    } 
}

function ValidMail(myEmail) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var valid = re.test(myEmail);
    document.getElementById('email2').classList.remove('invalid');
    document.getElementById('email2').classList.remove('valid');
    if (valid) {
        if(doesEmailExist(myEmail)){
            document.getElementById('messageemail').style.display = "block";
            document.getElementById('messageemail').innerHTML = "Email is not availabe";
            document.getElementById('email2').classList.add('invalid');
        }else {
            document.getElementById('messageemail').style.display = "none";
            document.getElementById('email2').classList.add('valid');
            return true;
        }
    } 
    else {
        document.getElementById('messageemail').style.display = "block";
        document.getElementById('email2').classList.add('invalid');
        document.getElementById('messageemail').innerHTML = "Entered email is incorrect";
    } 
}
 
function ValidPhone(myPhone) {
    var re = /^\+?([0-9]{1})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var valid = re.test(myPhone);
    document.getElementById('phone2').classList.remove('invalid');
    document.getElementById('phone2').classList.remove('valid');
    if (valid) {
        if(doesPhoneExist(myPhone)){
            document.getElementById('messagephone').style.display = "block";
            document.getElementById('messagephone').innerHTML = "Phone number is not available";
            document.getElementById('phone2').classList.add('invalid');
        }else {
            document.getElementById('messagephone').style.display = "none";
            document.getElementById('phone2').classList.add('valid');
            return true;
        }
    } 
    else {
        document.getElementById('messagephone').style.display = "block";
        document.getElementById('phone2').classList.add('invalid');
        document.getElementById('messagephone').innerHTML = "Entered phone number is incorrect";
    } 
} 

function ValidPassword(myPassword) {
    var re = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
    var valid = re.test(myPassword);
    document.getElementById('password2').classList.remove('invalid');
    document.getElementById('password2').classList.remove('valid');
    if (valid) {
        document.getElementById('messagepassword').style.display = "none";
        document.getElementById('password2').classList.add('valid');
        return true;
    } 
    else {
        document.getElementById('messagepassword').style.display = "block";
        document.getElementById('password2').classList.add('invalid');
        document.getElementById('messagepassword').innerHTML = "Entered password is incorrect";
    } 
}

function doesUsernameExist(myUsername) {
    for(var i=0; i<users.length; i++){
        if(myUsername == users[i].username) {
            return true;
        }
    }
    return false;
}

function doesEmailExist(myEmail) {
    for(var i=0; i<users.length; i++){
        if(myEmail == users[i].email){
            return true;
        }
    }
    return false;
}

function doesPhoneExist(myPhone) {
    for(var i=0; i<users.length; i++){
        if(myPhone == users[i].phone){
            return true;
        }
    }
    return false;
}

// Login

var signInBtn = document.getElementById('sign_in');

signInBtn.addEventListener('click', function() {
    if (localStorage.getItem('users') == null) {
        users = [];
    }
    else {
        users = JSON.parse(localStorage.getItem('users'));
    }

    event.preventDefault();
    var username1 = document.getElementById('username1').value;
    var password1 = document.getElementById('password1').value;

    if(username1.trim() == "" || password1.trim() == "") {
        document.getElementById('messagelogin').innerHTML = "Fill all of the field!";
        document.getElementById('username1').classList.add('invalid');
        document.getElementById('password1').classList.add('invalid');
    }else {
        if(username1 == "admin2022" && password1 == "@dmiN2022"){
            document.location.href = "admin_panel.html";
            return;
        }

        for(var i = 0; i < users.length; i++) {
            if (username1 == users[i].username && password1 == users[i].password && !(users[i].isBlocked)) {
                event.preventDefault();
                alert(username1 + " is logged in");
                users[i].isLoggedIn = true;
                localStorage.setItem('users', JSON.stringify(users));
                document.location.href = "loginned_pages/home.html"
                
                return; //stops function
            }
            else if (username1 == users[i].username && password1 == users[i].password && users[i].isBlocked) {
                document.location.href = "user_blocked.html";

                return;
            } 

        }
        document.getElementById('messagelogin').innerHTML = "Username/password is not correct or user doesn't exist"
        document.getElementById('username1').classList.add('invalid');
        document.getElementById('password1').classList.add('invalid');
    }
});

// Show Password

document.getElementById('show_password').addEventListener('click', function(){
    var x = document.getElementById("password1");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
});

document.getElementById('show_password2').addEventListener('click', function(){
    var x = document.getElementById("password2");
    if (x.type === "password") {
        x.type = "text";
    }else {
        x.type = "password";
    }
});