$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyDVnx56uJHtku48XUqXXstq8cZuijLvT5k",
        authDomain: "keto-4756a.firebaseapp.com",
        databaseURL: "https://keto-4756a.firebaseio.com",
        projectId: "keto-4756a",
        storageBucket: "",
        messagingSenderId: "964124781982"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    //Click function for API call to search items and display to page //  
    $(".search").on("click", function () {
        event.preventDefault();
        $("tbody").empty();
        name = $("#search-item").val().trim();
        calorieMin = $("#cal-min").val().trim();
        calorieMax = $("#cal-max").val().trim();
        brandName = $("#brand-name").val().trim();
        $("#search-item").val("");
        $("#cal-min").val("");
        $("#cal-max").val("");
        $.ajax({
            url: "https://api.nutritionix.com/v1_1/search/" + name + "?results=0:20&cal_min=" + calorieMin + "&cal_max=" + calorieMax + "&fields=item_name,brand_name,item_id,nf_calories&appId=f6b91060&appKey=14e0ba5ac60549d774298df1a86ce3b8",
            method: "GET",
        }).then(function (response) {
            console.log(response.hits)
         
            for (var i = 0; i < 20; i++) {
                var table = `<tr>
                <td>${response.hits[i].fields.item_name}</td>
                <td>${response.hits[i].fields.brand_name}</td>
                <td>${response.hits[i].fields.nf_calories}</td></tr>`
                $("tbody").append(table);
            }
        })
    })


    // Click function to add recipe //
    $(".recipe").hide();

    $(".add").on("click", function () {
        $(".recipe").show();
        $(".add").hide();
    })

    // Adds new recipe to recipe-list //
    $(".add-recipe").on("click", function () {
        event.preventDefault();
        var title = $("#title").val().trim();
        var url = $("#url").val().trim();
        var newRecipe = $("<div>")
        newRecipe.html("<a href= ' " + url + " ' >" + title + "</a>");
        $("#title").val("");
        $("#url").val("");
        $(".recipe").hide();
        $(".add").show();

        database.ref().push({
            title: title,
            url: url
        });

    });

    database.ref().orderByChild('dateAdded').on('child_added', function (childSnapshot) {
        var data = childSnapshot.val();
        var url = data.url;
        var title = data.title
        var newRecipe = $('<div>');
        newRecipe.html("<a href = '" + url + "'>" + title + "</a>");
        $(".recipe-list").prepend(newRecipe);
    })
    // food to fork API call //
    $(".find-recipe").hide();
    $(".find").on("click", function() {
        $(".find-recipe").show();
        $(".find").hide();
    })
    $(".search-recipe").on("click", function () {
        event.preventDefault();
        var ingredients = $("#ingredients").val();
        console.log(ingredients);
        $.ajax({
            url: "https://www.food2fork.com/api/search?key=489004e4c27559da0e4e5e6843fdb79e&q=" + ingredients + "&page=1",
            method: "GET",
        }).then(function(response) {
           console.log(response)

        })
        $(".find").show();
        $(".find-recipe").hide();
    })

});

