export function links(){
    expandCollapsable();
    minimizeCollapsable();
    deleteConfirmation();
}

function expandCollapsable(){
    const linkTitle = getById('inputAddNewLinkTitle');

    linkTitle.addEventListener('click', function(){
        let a = getByClass('collapsableAddNew');
        a[0].style.height = "100%";
        getById('inputAddNewLinkTitle').placeholder = "Title";
    });

}

function minimizeCollapsable(){
    const linkTitle = getByClass('cancelButton');

    linkTitle[0].addEventListener('click', function(){
        let a = getByClass('collapsableAddNew');
        a[0].style.height = "50px";
        getById('inputAddNewLinkTitle').placeholder = "Add new link...";
    });

}

function deleteConfirmation(){
	let deleteBtn = getByClass('deleteBtn');

	for (let i = 0; i < deleteBtn.length; i++) {

        deleteBtn[i].addEventListener('click', function(){
            this.nextSibling.nextSibling.classList.toggle("deleteOptionsShow");
        });
    }
}









//Tools
function getById(elementId){
    let element = document.getElementById(elementId);
    return element;
}

function getByClass(elementClass){
    let element = document.getElementsByClassName(elementClass);
    return element;
}