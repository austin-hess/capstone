/* searchBar.script.js - Was meant to continually query the database based on form input but
                         I ran into issues with cross-origin request during testing and scrapped
                         the idea for the scope of the project because it was taking too much time
                         to debug and not critical to recommender connection.
    Author: Austin Hess
*/

window.onload = function() {

    // get the search bar DOM elements
    var form = document.querySelector("#searchForm");
    var submitBtn = document.querySelector("#searchSubmit");
    var searchBar = document.querySelector("#searchBar");

    // add event listener to input
    /*
    searchBar.addEventListener('input', function(event) {

        if (searchBar.value.length > 0) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    })*/
}