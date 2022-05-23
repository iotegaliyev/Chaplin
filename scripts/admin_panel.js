var people;
var listOfUsers = document.getElementById('listofusers');
var html = "";

showUsers();

function showUsers() {
    if (localStorage.getItem('users') == null) {
        people = [];
    }
    else {
        people = JSON.parse(localStorage.getItem('users'));
    }
    
    if (people.length != 0) {
        for(var i=0; i<people.length; i++){

            if(people[i].isBlocked){
                html += `<div class="user"><div class="person">${people[i].username}</div>
                        <input type="submit" value="Unblock" class="button" id="${i}"></div>`;
            }else {
                html += `<div class="user"><div class="person">${people[i].username}</div>
                        <input type="submit" value="Block" class="button" id="${i}"></div>`;
            }
        }
        listOfUsers.innerHTML = html;
    }else {
        listOfUsers.innerHTML = '<h3 style="color: #000;">Empty</h3>';
    }

    
}
for(var i=0; i<people.length; i++){
    document.querySelectorAll('.button')[i].addEventListener('click', function(event){
        if(event.target.value == "Block"){
            blockUserById(event.target.id);
        }else {
            unblockUserById(event.target.id);
        }
    });
}

function blockUserById(id) {
    for(var i=0; i<people.length; i++){
        if(id == i){
            event.target.value = "Unblock";
        }
    }
    people = JSON.parse(localStorage.getItem('users'));
    people[id].isBlocked = true;
    localStorage.setItem('users', JSON.stringify(people));
}

function unblockUserById(id) {
    for(var i=0; i<people.length; i++){
        if(id == i){
            event.target.value = "Block";
        }
    }
    people = JSON.parse(localStorage.getItem('users'));
    people[id].isBlocked = false;
    localStorage.setItem('users', JSON.stringify(people));
}

var signOutBtn = document.getElementById('signout-btn');


signOutBtn.addEventListener('click', function() {

    document.location.href = "home.html";
});