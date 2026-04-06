export function contacts(){
    editContact()
}



function editContact(){
        
    let x = true;

    let z = getById('editCnt');
    z.addEventListener('click', function(){

        let inputFields = this.parentElement.parentElement.getElementsByClassName('inputFields');

        if (x == true){

            for (let i = 0; i < inputFields.length; i++) {

                inputFields[i].disabled=false;

            }
            z.innerText = "✓";
            x=false;

        }else{

            for (let i = 0; i < inputFields.length; i++) {

                inputFields[i].disabled=true;

            }
            z.innerHTML = "&#128393;";
            x=true;

        }

    })
}



function swapViews(){
    
    let contact = getByClass('contactName');

    for (let i = 0; i < contact.length; i++) {
        
        contact[i].addEventListener('click', function(){

                getById('contactShown').style.display="block";
                getById('contactList').style.display="none";
        })
        
    }
}



function swapViewsBack(){
    getById('backFromCS').addEventListener('click', function(){
        getById('contactShown').style.display="none";
        getById('contactList').style.display="block";
    });

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