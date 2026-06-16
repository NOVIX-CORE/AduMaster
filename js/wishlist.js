// عملکرد دکمه حذف کارت از علاقه‌مندی‌ها
function removeWishItem(itemId) {
    var item = document.getElementById(itemId);
    if (!item) return;

    // ایجاد یک افکت محو شدن نرم قبل از حذف کامل
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';

    setTimeout(function() {
        item.remove();
        
        // بررسی اینکه آیا هنوز کارتی باقی مانده است یا خیر
        var grid = document.getElementById('wishlistGrid');
        var remainingItems = grid.querySelectorAll('.wish-card');
        
        if (remainingItems.length === 0) {
            grid.style.display = 'none';
            document.getElementById('wishlistEmptyState').style.display = 'flex';
        }
    }, 300);
}
