var names = ["Ben", "Joel", "Judy", "Anne"];
var scores = [88, 98, 77, 88];

var $ = function (id) { return document.getElementById(id); };



window.onload = function () {
	$("display_results").onclick = displayResults;
	$("display_scores").onclick = displayScores;
	$("add").onclick = addScore;
	
};

function displayResults()
{
	var highestScore = 0;
	var highestScoreIndex = -1;
	var average = 0;

	for(var i=0;i<scores.length;i++)
	{
		if(highestScore<scores[i]){
			highestScore = scores[i];
			highestScoreIndex = i;
		}

		average= (average*(i)+scores[i])/(i+1);
	}
	
	document.getElementById("results").innerHTML="<h2> Results </h2><br /> Average score is "+average + "<br \>High score: "+ names[highestScoreIndex] + " with a score of " + highestScore ;
}

function displayScores() {
    var table = $("scores_table");
    table.innerHTML = ""; 
	document.getElementById("scores_table").innerHTML="<h2> Scores </h2>";

    var headerRow = table.insertRow();
    var firstColumnName = headerRow.insertCell();
    var SecondColumnName = headerRow.insertCell();

    firstColumnName.textContent = "Name";
    SecondColumnName.textContent = "Score";

	firstColumnName.style.fontWeight = "bold";
    SecondColumnName.style.fontWeight = "bold";

    for (var i = 0; i < names.length; i++) {
        var row = table.insertRow();
        var nameCell = row.insertCell();
        var scoreCell = row.insertCell();
        nameCell.textContent = names[i];
        scoreCell.textContent = scores[i];
    }
}

function addScore() {
    var nameInput = $("name").value.trim();
    var scoreInput = parseFloat($("score").value.trim());

    // data validation
    if (nameInput === "" || isNaN(scoreInput) || scoreInput < 0 || scoreInput > 100) {
        alert("You must enter a name and a valid score.");
        return;
    }

    names.push(nameInput);
    scores.push(scoreInput);

    // we should clear the inputs after adding it to the array
    $("name").value = "";
    $("score").value = "";

}



