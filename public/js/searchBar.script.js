window.onload = function() {

    // get the search bar DOM elements
    var form = document.querySelector("#searchForm");
    var submitBtn = document.querySelector("#searchSubmit");
    var searchBar = document.querySelector("#searchBar");

    // add event listener to input
    searchBar.addEventListener('input', function(event) {

        if (searchBar.value.length > 0) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    })
}