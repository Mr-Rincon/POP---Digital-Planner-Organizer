export function toggleMenu(){

        //Event - toggle left menu
        document.getElementById("menuToggle").addEventListener("mouseover", toggleMenuStyle);
        document.getElementById("menu").addEventListener("mouseleave", toggleMenuStyle);

        function toggleMenuStyle(){
        document.getElementById("menu").classList.toggle("menuStyleShow");
        }


        //Events for the profile menu
        document.getElementById("profilePicToggle").addEventListener("mouseover", toggleProfileMenu);
        document.getElementById("profileMenu").addEventListener("mouseleave", toggleProfileMenu);

        function toggleProfileMenu(){
        document.getElementById("profileMenu").classList.toggle("profileMenuStyleShow");
        }

        //Content of each link displayed        
        document.getElementById('getBigMenu').addEventListener('click', function() {openCity('defaultView');});

        document.getElementById('leftMenuNotes').addEventListener('click', function() {openCity('notesID');});
        document.getElementById('bigMenuNotes').addEventListener('click', function() {openCity('notesID');});
        
        document.getElementById('bigMenuCalendar').addEventListener('click', function() {openCity('calendarID');});
        document.getElementById('leftMenuCalendar').addEventListener('click', function() {openCity('calendarID');});
        
        document.getElementById('bigMenuReminders').addEventListener('click', function() {openCity('remindersID');});
        document.getElementById('leftMenuReminders').addEventListener('click', function() {openCity('remindersID');});
        
        document.getElementById('bigMenuLinks').addEventListener('click', function() {openCity('linksID');});
        document.getElementById('leftMenuLinks').addEventListener('click', function() {openCity('linksID');});
        
        document.getElementById('bigMenuContacts').addEventListener('click', function() {openCity('contactsID');});
        document.getElementById('leftMenuContacts').addEventListener('click', function() {openCity('contactsID');});
        
        document.getElementById('bigMenuPasswords').addEventListener('click', function() {openCity('passwordsID');});
        document.getElementById('leftMenuPasswords').addEventListener('click', function() {openCity('passwordsID');});
        
        document.getElementById('bigMenuBin').addEventListener('click', function() {openCity('binID');});
        document.getElementById('leftMenuBin').addEventListener('click', function() {openCity('binID');});

}


function openCity(cityName) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("menuContent");
 
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  document.getElementById(cityName).style.display = "block";
}