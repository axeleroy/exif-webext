const DISPLAY_EXIF_ID = "display-exif-menu-item";

browser.contextMenus.create({
    id: DISPLAY_EXIF_ID,
    title: browser.i18n.getMessage("menuItemDisplayExif"),
    contexts: ['image']
})

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === DISPLAY_EXIF_ID) {
        browser.sidebarAction.open();
        browser.sidebarAction.setPanel({
            panel: browser.runtime.getURL("/sidebar/sidebar.html?url=" + info.srcUrl)
        })
    }
});
