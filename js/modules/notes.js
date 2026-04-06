import { startSession } from '../page2';


	//Variables to be used in this doc
	let output = "";
	let categories = "";
	let gResponse = "";



export function getNotes() {

	//Display notes when notes is clicked at menu or bigMenu.
	document.getElementById("bigMenuNotes").addEventListener("click", displayNotes);
	document.getElementById("leftMenuNotes").addEventListener("click", displayNotes);

}


function displayNotes() {

	var sessionStorageData = sessionStorage.getItem('SessionID');
	startSession(sessionStorageData);

	fetch('./services/dataServer.php')
		.then((res) => res.json())
		.then(response => {

			gResponse = response;

			if (response == 0) {
				let dropDownCategoryFromDB = document.querySelectorAll('.categoriesFromDB');

				for (let i = 0; i < dropDownCategoryFromDB.length; i++) {
					dropDownCategoryFromDB[i].innerHTML = `<a href="#">There is no category</a>`;
				}


				output = `
				<div class="align-center emptyAreaMessage">
					<br><br><h1>Ups! There is nothing here.</h1>
					<br><br><i class="icon-darkworld icon-xl"></i>
				</div>
					`;
			} else {

				//Placing all the notes from DB to the screen.
				output = ''; //EVITA RECARGAS DE TODAS LAS NOTAS
				for (let i in response) {

					output += `
					<div class="individualNoteDiv" idOfNote="${response[i].NoteID}">
						<div class="dropdown dropdownPosition">
							<button class="dropbtn"><i class="icon-lightdropmenu"></i></button>
							<div class="dropdown-content dropdown-content-rigth">

							<div class="dropdown eachNoteOptions">
								<a href="#" class="editingNote">Edit</a>
								<a href="#" class="deletingNote">Delete</a>
								
								<div class="deleteOptions" id="deleteOptions">
									<a href="#" class="deletingNoteYes">Yes?</a>
								</div>
							</div>

							
							</div>
						</div>

						<div class="conPa">
							<div class="noteFrame item">

								<div class="cardTitle">${response[i].Title}</div>

								<div class="cardBody">

									<div class="noteBodyFromDB">
										${response[i].Note}
									</div>

									<div class="newNoteCategoryAndNewNoteDateParent">
										<div class="smallOptionsStyle newNoteCategory">
											<p>Category: <span>${response[i].Category}</span></p>
											<p>Modified: <span>${response[i].CreateDate}</span></p>
										</div>
									</div>

								</div>

							</div>

						</div>
					</div>`;
				}

				getValueOfCategory();

			}

			document.querySelector('.containerOfNotesFromDB').innerHTML = output;

			var inputAssignCategoryForNewNote = document.getElementById("inputAssignCategoryForNewNote").value;
			document.getElementById('displayInputValueCategory').innerHTML = inputAssignCategoryForNewNote;

			selectCategoryInputValue();

			assignCategoryForNewNote();

			updateCategoryDisplay()

			displayAllNotes();

			displayYorN();

			editNote();

		}).catch(error => console.log(error));

}




//Get value of category clicked from the displayFromDB dropdown

function getValueOfCategory() {

	categories = ``;

	var arrayWithDuplicates = gResponse;

	function removeDuplicates(originalArray, prop) {
		var newArray = [];
		var lookupObject = {};

		for (var i in originalArray) {
			lookupObject[originalArray[i][prop]] = originalArray[i];
		}

		for (i in lookupObject) {
			newArray.push(lookupObject[i]);
		}
		return newArray;
	} //End of checking for duplicates

	var uniqueArray = removeDuplicates(arrayWithDuplicates, "Category");

	for (let i = 0; i < uniqueArray.length; i++) {
		categories += `<a href="#" class="eachCategory">${uniqueArray[i].Category}</a>`;
	} //End of displaying category only once

	let dropDownCategoryFromDB = document.querySelectorAll('.categoriesFromDB');

	for (let i = 0; i < dropDownCategoryFromDB.length; i++) {
		dropDownCategoryFromDB[i].innerHTML = categories;
	} //End of display categories in the dropdown

	let displayCategoriesUserChoose = document.querySelector('#displayCategoriesFromDB');
	let areaSelector = document.querySelectorAll('#displayCategoriesFromDB .eachCategory');


	for (let i = 0; i < areaSelector.length; i++) {

		areaSelector[i].addEventListener('click', function () {

			output = "";

			let categoryPicked = displayCategoriesUserChoose.children[i].textContent;

			for (let x = 0; x < gResponse.length; x++) {

				let obtainCategory = gResponse[x].Category;

				if (obtainCategory != categoryPicked) {

				} else {

					output += `
					<div class="individualNoteDiv" idOfNote="${gResponse[x].NoteID}">
						<div class="dropdown dropdownPosition">

							<button class="dropbtn"><i class="icon-lightdropmenu"></i></button>
							
							<div class="dropdown-content dropdown-content-rigth">

								<div class="dropdown eachNoteOptions">

									<a href="#" class="editingNote">Edit</a>

									<a href="#" class="deletingNote">Delete</a>
									
									<div class="deleteOptions" id="deleteOptions">

										<a href="#" class="deletingNoteYes">Yes?</a>

									</div>

								</div>
							
							</div>

						</div>

						<div class="conPa">
							<div class="noteFrame item">

								<div class="cardTitle">${gResponse[x].Title}</div>

								<div class="cardBody">

									<div class="noteBodyFromDB">
										${gResponse[x].Note}
									</div>

									<div class="newNoteCategoryAndNewNoteDateParent">
										<div class="smallOptionsStyle newNoteCategory">
											<p>Category: <span>${gResponse[x].Category}</span></p>
											<p>Modified: <span>${gResponse[x].CreateDate}</span></p>
										</div>
									</div>

								</div>

							</div>

						</div>
					</div>`;
				}
			}

			document.querySelector('.containerOfNotesFromDB').innerHTML = output;


			selectCategoryInputValue();

			assignCategoryForNewNote();

			updateCategoryDisplay()

			displayAllNotes();

			displayYorN();

			editNote();
			
		});

	}

}



export function expandAddNewNote() {

	var coll = document.getElementsByClassName("collapsible");
	var i;

	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function () {
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			if (content.style.maxHeight) {
				content.style.maxHeight = null;
			} else {
				content.style.maxHeight = content.scrollHeight + "px";
			}
		});
	}

}



export function sendNewNoteToDB() {

	const sendNote = document.getElementById('sendNote').addEventListener('click', sendingNote);

	function sendingNote() {

		var sessionStorageData = sessionStorage.getItem('SessionID');
		startSession(sessionStorageData);

		let noteTitle = document.getElementById('newNoteTitleInput').value;
		let noteText = document.getElementById('newNoteInput').value;
		let noteCategory = document.getElementById('inputAssignCategoryForNewNote').value;

		console.log('title: ' + noteTitle + ' text: ' + noteText + ' category: ' + noteCategory);

		var datos = new FormData(); // FormData for sending a package of information to the server

		datos.append('Title', noteTitle);
		datos.append('Note', noteText);
		datos.append('Category', noteCategory);

		console.log(datos);
		console.log(datos.get('Title'));
		console.log(datos.get('Note'));
		console.log(datos.get('Category'));

		fetch('services/newNote.php', {
			method: 'POST',
			body: datos
		})

			.then(res => res.json())
			.then(data => {
				console.log(data)

				if (data == "Empty title") {
					niceAlert('#F8D000', 'Title is empty!');
				}else if (data == "Empty note") {
					niceAlert('#F8D000', 'Note is empty!');
				} else {
					clearingInputs();
					niceAlert('#79B774', 'Success!');
					console.log("data sent")
					//Display notes here again!!!!
					displayNotes();
				}

			});
	}
}



export function clearInputsOfNewNote() {

	const sendNote = document.getElementById('closeNewNoteBar').addEventListener('click', clearingInputs);

}



function clearingInputs() {

	document.getElementById('newNoteTitleInput').value = "";
	document.getElementById('newNoteInput').value = "";
	document.getElementById('inputAssignCategoryForNewNote').value = "";
	toggleCollapsible();
}



function toggleCollapsible(){

	var coll = document.getElementsByClassName("collapsible");
		
	for (let i = 0; i < coll.length; i++) {
		coll[i].classList.toggle("active");
		var content = coll[i].nextElementSibling;
		if (content.style.maxHeight) {
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		}
	
	}
}



function displayYorN(){
	let noteToDelete = document.getElementsByClassName('deletingNote');
	let deleteOptionsClass = document.getElementsByClassName('deleteOptions');
			
	deleteNote();

	for (let i = 0; i < noteToDelete.length; i++) {
		
		noteToDelete[i].addEventListener('click', function(){
			
			deleteOptionsClass[i].classList.toggle("deleteOptionsShow");
		});		
	}
}




export function deleteNote(){
	let deleteButton = document.getElementsByClassName('deletingNoteYes');

	for (let i = 0; i < deleteButton.length; i++) {
		deleteButton[i].addEventListener('click', chooseNoteToDelete);
	}

}


function chooseNoteToDelete(){

	let noteID = this.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('idOfNote');
	console.log(noteID);

	var datos = new FormData(); // FormData for sending a package of information to the server

		datos.append('noteIDDelete', noteID);

		console.log(datos);
		console.log(datos.get('noteIDDelete'));

		fetch('services/deleteNote.php', {
			method: 'POST',
			body: datos
		})

			.then(res => res.json())
			.then(data => {
				console.log(data)

				if (data == "Record deleted successfully") {
					displayNotes();
					niceAlert('#79B774', 'Successfully removed');
				} else {
					console.log(data)
					displayNotes();
				}

			});
}




function selectCategoryInputValue(){
	
	document.getElementById('inputAssignCategoryForNewNote').addEventListener('click', function(){
		document.getElementById('inputAssignCategoryForNewNote').select();
	});
}



function assignCategoryForNewNote(){

	let displayCategoriesUserChoose = document.querySelector('#addNewNoteCategory');
	let areaSelector = document.querySelectorAll('#addNewNoteCategory .eachCategory');


	for (let i = 0; i < areaSelector.length; i++) {

		areaSelector[i].addEventListener('click', function () {

			let categoryPicked = displayCategoriesUserChoose.children[i].textContent;

			document.getElementById('inputAssignCategoryForNewNote').value = categoryPicked;

			document.getElementById('displayInputValueCategory').innerHTML = categoryPicked;

		});

	}
}


function updateCategoryDisplay(){

	let displayCategoriesUserChoose = document.querySelector('#addNewNoteCategory');

	document.getElementById('inputAssignCategoryForNewNote').addEventListener('keyup', function(){

		let textInput = document.getElementById('inputAssignCategoryForNewNote').value;

		document.getElementById('displayInputValueCategory').innerHTML = textInput;
	});
}



function displayAllNotes(){
	let displayAllCategories = document.getElementsByClassName('displayAllCategories');

	for (let i = 0; i < displayAllCategories.length; i++) {
		
		displayAllCategories[i].addEventListener('click', displayNotes);		
	}
}



function niceAlert(color, msg){ //Alert to display nicely messages on screen
	let niceAlert = document.getElementById('niceAlert');

	niceAlert.textContent = msg;
	niceAlert.style.backgroundColor = color;
	niceAlert.classList.toggle('niceAlertShow');
	setTimeout(function (){
		niceAlert.classList.toggle('niceAlertShow');
	}, 3000);
}


function editNote(){
	let editingNote = document.getElementsByClassName('editingNote');
	
	for (let i = 0; i < editingNote.length; i++) {

		editingNote[i].addEventListener('click', fillingModal);

	}
	
}

function fillingModal(){
	let idOfNote = this.parentElement.parentElement.parentElement.parentElement.getAttribute("idOfNote");
	console.log(idOfNote);

	let titleOfNote = this.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[0].innerText;
	console.log(titleOfNote);

	let bodyOfNote = this.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[1].children[0].innerText;
	console.log(bodyOfNote);

	let categoryOfNote = this.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[1].children[1].children[0].children[0].children[0].innerText;
	console.log(categoryOfNote);

	let idOfNoteToSend = document.getElementById('newNoteIdInputModal');
	idOfNoteToSend.value = idOfNote;

	let titleOfNoteToSend = document.getElementById('newNoteTitleInputModal');
	titleOfNoteToSend.value = titleOfNote; 

	let bodyOfNoteToSend = document.getElementById('newNoteInputModal');
	bodyOfNoteToSend.value = bodyOfNote;

	let categoryOfNoteToSend = document.getElementById('inputAssignCategoryForNewNoteModal');
	categoryOfNoteToSend.value = categoryOfNote;

	assignCategoryForNewNoteModal();
	var inputAssignCategoryForNewNote = document.getElementById("inputAssignCategoryForNewNoteModal").value;
			document.getElementById('displayInputValueCategoryModal').innerHTML = inputAssignCategoryForNewNote;

	modalEditNote();
	sendEditedNote();
	editUpdateCategoryDisplay();
}


function assignCategoryForNewNoteModal(){

	let displayCategoriesUserChoose = document.getElementById('addNewNoteCategoryModal');
	let areaSelector = document.querySelectorAll('#addNewNoteCategoryModal .eachCategory');


	for (let i = 0; i < areaSelector.length; i++) {

		areaSelector[i].addEventListener('click', function () {

			let categoryPicked = displayCategoriesUserChoose.children[i].textContent;

			document.getElementById('inputAssignCategoryForNewNoteModal').value = categoryPicked;

			document.getElementById('displayInputValueCategoryModal').innerHTML = categoryPicked;

		});

	}
}



function editUpdateCategoryDisplay(){

	let displayCategoriesUserChoose = document.querySelector('#addNewNoteCategoryModal');

	document.getElementById('inputAssignCategoryForNewNoteModal').addEventListener('keyup', function(){

		let textInput = document.getElementById('inputAssignCategoryForNewNoteModal').value;

		document.getElementById('displayInputValueCategoryModal').innerHTML = textInput;
	});
}


// ****** Modal buttons functions

function sendEditedNote(){
	document.getElementById('sendNoteModal').addEventListener('click', sendEditedNoteToDB);
}


// ***** Modal Functions

function modalEditNote(){

	// Get the modal
	var modal = document.getElementById("myModal");
	modal.style.display = "block";

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	span.addEventListener('click', function() {
		modal.style.display = "none";
		});

	// When the user clicks anywhere outside of the modal, close it
	window.addEventListener('click',function(event) {
		if (event.target == modal) {
		modal.style.display = "none";
	}});


}


function closeModal(){
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}

function sendEditedNoteToDB(){

	var sessionStorageData = sessionStorage.getItem('SessionID');
	startSession(sessionStorageData);

	
	let noteID = document.getElementById('newNoteIdInputModal').value;
	let noteTitle = document.getElementById('newNoteTitleInputModal').value;
	let noteText = document.getElementById('newNoteInputModal').value;
	let noteCategory = document.getElementById('inputAssignCategoryForNewNoteModal').value;

	var datos = new FormData(); // FormData for sending a package of information to the server

	
	datos.append('noteID', noteID);
	datos.append('Title', noteTitle);
	datos.append('Note', noteText);
	datos.append('Category', noteCategory);

	console.log(datos);
	console.log(datos.get('noteID'));
	console.log(datos.get('Title'));
	console.log(datos.get('Note'));
	console.log(datos.get('Category'));

	fetch('services/updateNote.php', {
		method: 'POST',
		body: datos
	})

	.then(res => res.json())
	.then(data => {
		console.log(data)

		if (data == "Empty title") {
			niceAlert('#F8D000', 'Title is empty!');
		}else if (data == "Empty note") {
			niceAlert('#F8D000', 'Note is empty!');
		} else {
			closeModal();
			niceAlert('#79B774', 'Success!');
			console.log("data sent")
			//Display notes here again!!!!
			displayNotes();
		}

	});


}