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


    //Click function for API calls to look up popular items and display to search.html page // 
    $(".nutrient-list").hide();
    $(".search").on("click", function () {
        event.preventDefault();
        $(".nutrient-list").show();
        var foodGroup
        $("tbody").empty();

        if ($('#dairy').is(':checked')) {
            foodGroup = "0100";
        }
        if ($("#fats").is(":checked")) {
            foodGroup = "0400";
        }
        if ($("#sausages").is(":checked")) {
            foodGroup = "0700";
        }
        if ($("#breakfast").is(":checked")) {
            foodGroup = "0800";
        }
        if ($("#poultry").is(":checked")) {
            foodGroup = "0500";
        }
        if ($("#vegetables").is(":checked")) {
            foodGroup = "1100";
        }
        if ($("#beef").is(":checked")) {
            foodGroup = "1300"
        }
        if ($("#beverages").is(":checked")) {
            foodGroup = "1400";
        }
        if ($("#test").is(":checked")) {
            foodGroup = "1400";

        }

        $.ajax({
            url: "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=UhgPyozOLrjkN0aU9ThFj8KlE9VK1I1GrqPAky1a&nutrients=205&nutrients=204&nutrients=208&nutrients=269&fg=" + foodGroup,
            method: "GET",
        }).then(function (response) {
            var item = response.report.foods
            for (var i = 0; i < item.length; i++) {
                var table = `<tr>
                <td>${item[i].name}</td>
                <td>${item[i].nutrients[3].value + "g"}</td>
                <td>${item[i].nutrients[1].value + "g"}</td>
                <td>${item[i].nutrients[2].value + "g"}</td> 
                `
                $("tbody").append(table);
                console.log(response);
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
        $("#title").val("");
        $("#url").val("");
        $(".recipe").hide();
        $(".add").show();

        if (title === "" || url === "") {
            alert("Please make sure the text boxes are filled")
            $(".add").hide();
            $(".recipe").show();
        }

        else {
            database.ref().push({
                title: title,
                url: url
            });
        }
    });

    database.ref().orderByChild('dateAdded').on('child_added', function (childSnapshot) {
        var data = childSnapshot.val();
        var url = data.url;
        var title = data.title
        var newRecipe = $('<div>');
        newRecipe.addClass("new-recipe")
        newRecipe.html("<a href = '" + url + "'>" + title + "</a>" + "<hr>");
        $(".recipe-list").prepend(newRecipe);
    })
    //Sets up recipe page//
    $(".recipe-response").hide();
    $(".find-recipe").hide();
    $(".find").on("click", function () {
        $(".find-recipe").show();
        $(".find").hide();
    })
    // EDAMAM API call //
    $(".search-recipe").on("click", function () {
        event.preventDefault();
        var ingredients = $("#ingredients").val();
        console.log(ingredients);
        $.ajax({
            url: "https://api.edamam.com/search?q=" + ingredients + "&app_id=ff87945f&app_key=caab8e28705b4cb0c808f0d05d770add",
            method: "GET",
        }).then(function (response) {
            console.log(response.hits)
            console.log(response.hits[0].recipe.label)
            for (var i = 0; i < 10; i++) {
                var recipe = $("<span>")
                recipe.addClass("recipe-text")
                var image = $("<img>")
                image.attr("src", response.hits[i].recipe.image);
                recipe.append(image);
                var title = $("<p>");
                title.html("<a href = '" + response.hits[i].recipe.url + "'>" + response.hits[i].recipe.label + "</a>")
                recipe.prepend(title);
                $(".recipe-response").append(recipe);
            }
            $(".find").show();
            $(".find-recipe").hide();
            $(".recipe-response").show();
        })
    })

});

