var myWords = chrome.extension.getBackgroundPage().Words;

if (myWords.length < 1) {
    document.getElementById('Words').innerHTML = "You have not bookmarked any words.";
}

document.write("<ol start='0'>");
for (i = 0; i < myWords.length; i++) {
    document.write("<li>" + myWords[i] + "</li>");
}
document.write("</ol>");

document.getElementById('submit').addEventListener('click', function() {
    var deleteIndex = document.getElementById('deleteIndex').value;
    if (myWords[deleteIndex] == undefined) {
        alert('Please enter a valid number.\nRemeber: The numbers start with ZERO!');
    } else {
        var confirmation = confirm('Are you sure you want to delete the word "' + myWords[deleteIndex] + '"?');
        if (confirmation) {
            myWords.splice(deleteIndex, 1);
            location.reload();
        } else {
            return false;
        }
    }
});