chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install" || details.reason == "update") {
        chrome.tabs.create({
            url: 'src/welcome.html'
        });
    }
});

var Words = [];

var notificationOptions = {
    type: 'basic',
    title: 'Bookmark added!',
    message: 'Added word to bookmarked words',
    iconUrl: '../icons/bw16.png'
};

function addToArray(info, tab) {
    var text = info.selectionText;
    Words.push(text);
    chrome.notifications.create('id', notificationOptions, function(id) {});
    //alert(Words);
}

chrome.runtime.onInstalled.addListener(function() {
    var id = chrome.contextMenus.create({
        "title": "Bookmark '%s'",
        "contexts": ["selection"],
        "id": "parent",
        "onclick": addToArray
    });
});

chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.executeScript(tab.id, {
            code: "getSelection().toString();"
        }, function(results) {
            if (results[0].length == 0) {
                alert('Please select some text to bookmark');
            } else {
                Words.push(results[0]);
                chrome.notifications.create('id', notificationOptions, function(id) {});
            }
        });
    });
});