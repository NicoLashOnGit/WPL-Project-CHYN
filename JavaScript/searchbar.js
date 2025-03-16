function search(){
    let input = documentgetElementbyId("searchbar").value.toLowerCase();
    
    let pages = {
      "john wick": "characterInfo.html" 
    }

    if (pages[input]){
        window.location.href = pages[input];
    }
}