chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "clearTabs",
        title: "Clear current tabs",
        contexts: ["action"]
    });

    chrome.contextMenus.onClicked.addListener((info) => {
        if (info.menuItemId == "clearTabs") {
            chrome.tabs.query({currentWindow: true}, (tabs) => {
                tabs.forEach((tab) => {
                    chrome.bookmarks.search({url: tab.url}, (bookmarks) => {
                        bookmarks.forEach((bookmark) => {
                            chrome.bookmarks.remove(bookmark.id);
                            chrome.bookmarks.getChildren(bookmark.parentId, (children) => {
                                if (children.length == 0) {
                                    chrome.bookmarks.remove(bookmark.parentId);
                                }
                            });
                        });
                    });
                });
            });
        }
    });
});
