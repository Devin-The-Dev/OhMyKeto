$(document).ready(function () {
    // Click function for API call to search items  //  

    $(".search").on("click", function () {
        event.preventDefault();
        name = $("#search-item").val().trim();
        calorieMin = $("#cal-min").val().trim();
        calorieMax = $("#cal-max").val().trim();
        $("#search-item").val("");
        $("#cal-min").val("");
        $("#cal-max").val("");
        $.ajax({
            url: "https://api.nutritionix.com/v1_1/search/" + name + "?results=0:20&cal_min=" + calorieMin + "&cal_max=" + calorieMax + "&fields=item_name,brand_name,item_id,nf_calories&appId=f6b91060&appKey=14e0ba5ac60549d774298df1a86ce3b8",
            method: "GET",
        }).then(function (response) {
            console.log(response.hits)
            for (var i = 0; i < 20; i++) {
                var item = $("<div>");
                item.addClass("item-style")
                item.text(response.hits[i].fields.item_name + "" + response.hits[i].fields.brand_name + " calories: " + response.hits[i].fields.nf_calories);
                $(".items").append(item);
            }
        })
    })
   
    // Click functions to add recipe //

    $(".recipe").hide();

    $(".add").on("click", function () {
        $(".recipe").show();
    })

    $(".add-recipe").on("click", function () {
        event.preventDefault();
        var title = $("#title").val().trim();
        var url = $("#url").val().trim();
        var newRecipe = $("<div>")
        newRecipe.html("<a href= ' " + url + " ' >" + title + "</a>");
        $(".recipe-list").prepend(newRecipe);
        $("#title").val("");
        $("#url").val("");
        $(".recipe").hide();
    })

})

