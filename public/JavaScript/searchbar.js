document.addEventListener("DOMContentLoaded", function(){
    document.querySelector(".searchBar").addEventListener("submit", function(event){
    event.preventDefault();
    search();
});
});

function search(){
    let input = document.getElementById("searchBar").value.toLowerCase();
    
    let pages = {
      "john wick": "CharacterInfo.html" 
    }

    if (pages[input]){
        window.location.href = pages[input]; 
    }
}
