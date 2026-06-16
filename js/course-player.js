// ۱. عملکرد آکاردئون باز و بسته شدن سرفصل‌ها
var chapterButtons = document.querySelectorAll('.chapter-toggle-btn');
chapterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var chapterItem = this.parentElement;
        chapterItem.classList.toggle('active');
    });
});

// ۲. عملکرد جابه‌جایی تعاملی بین تب توضیحات و فایل‌های تمرینی
function switchTab(tabName) {
    var panelDesc = document.getElementById('panelDesc');
    var panelFiles = document.getElementById('panelFiles');
    var tabDescBtn = document.getElementById('tabDescBtn');
    var tabFilesBtn = document.getElementById('tabFilesBtn');

    if (tabName === 'desc') {
        panelDesc.style.display = 'block';
        panelFiles.style.display = 'none';
        tabDescBtn.classList.add('active');
        tabFilesBtn.classList.remove('active');
    } else if (tabName === 'files') {
        panelDesc.style.display = 'none';
        panelFiles.style.display = 'block';
        tabDescBtn.classList.remove('active');
        tabFilesBtn.classList.add('active');
    }
}
