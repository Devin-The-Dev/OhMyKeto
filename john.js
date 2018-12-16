$(document).ready(function(){
   $("#press").on("click", function(){
    name = $("#name").val().trim();
    calorieMin = $("#cal-min").val().trim();
    calorieMax = $("#cal-max").val().trim();
    console.log(name);
    console.log(calorieMin);
    console.log(calorieMax)
    $.ajax({
        url: "https://api.nutritionix.com/v1_1/search/" + name + "?results=0:20&cal_min=" + calorieMin + "&cal_max=" + calorieMax + "&fields=item_name,brand_name,item_id,nf_calories&appId=f6b91060&appKey=14e0ba5ac60549d774298df1a86ce3b8",
        method: "GET",
    }).then(function(response) {
        console.log(response.hits)
        $(".jumbotron").empty();
       for (var i = 0; i < 20; i++){
           console.log(response.hits[i].fields.item_name)
           var name = $("<div>");
           name.text(response.hits[i].fields.item_name + "" + response.hits[i].fields.brand_name + " calories: " + response.hits[i].fields.nf_calories);
           $(".jumbotron").append(name);
       }
    })
   })
})

