import {toggleMenu} from './modules/menus';
import * as notes from './modules/notes';
import {links} from './modules/links';
import {contacts} from './modules/contacts';


window.onload = function(){
    checkSession();
    toggleMenu();
    showUserName();
    destroySession();

    //Notes
    notes.getNotes();
    notes.expandAddNewNote();
    notes.sendNewNoteToDB();
    notes.clearInputsOfNewNote();

    //Links
    links();
    contacts();
}


// ** SESSION ** //

export function startSession(UserID) { //start the session inside of PHP
	let datos = {
		key: UserID
	};

	fetch('services/sessionStarter.php', {
		method: 'post',
		body: JSON.stringify(datos)
	})
		.then(res => res.json())
		.then(datas => { // data is anything returned by the API/backend code
		});
}


function checkSession(){ //checking if there is a session opened if not then get back to log in.
    if(!sessionStorage.getItem('SessionEmail') && !sessionStorage.getItem('SessionPassword')){
        location.href='index.html';   
    }else{ //Session sent again to server to avoid lost of connection with server when the website is refreshed. VERY IMPORTANT
        var sessionStorageData = sessionStorage.getItem('SessionID');
        startSession(sessionStorageData);
    }
}


function destroySession(){
    document.getElementById('rightMenuLogOut').addEventListener('click', logOut);
    document.getElementById('bigMenuLogOut').addEventListener('click', logOut);
    
    function logOut(){
        sessionStorage.removeItem('SessionEmail');
        sessionStorage.removeItem('SessionID');
        location.href='index.html';
    };
}



function showUserName(){
    let username = sessionStorage.getItem('SessionUser')
    document.getElementById('username').innerHTML = username;
}
