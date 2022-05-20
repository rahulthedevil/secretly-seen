let checkBox = document.querySelector(`input[type="checkbox"]`);

checkBox.addEventListener('change', (event) => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ "read": event.currentTarget.checked });
});

// eslint-disable-next-line no-undef
chrome.storage.local.get(["read"], ({read}) => {
    checkBox.checked = read;
});