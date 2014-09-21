document.getElementById('popout').onclick = function () {
    chrome.tabs.create({ url: 'src/popout.html' });
};