// عملکرد دکمه لایک قلبی شکل لندینگ دوره
function toggleLikeCourse(button) {
    button.classList.toggle('liked');

    if (button.classList.contains('liked')) {
        button.childNodes[2].textContent = "دوره نشان شد ";
    } else {
        button.childNodes[2].textContent = "نشان کردن دوره";
    }
}

/* ==========================================================================
   ۱. باز و بسته شدن سرفصل‌ها (آکاردئون)
   ========================================================================== */
var toggles = document.querySelectorAll('.landing-chapter-toggle');

toggles.forEach(function(button) {
    button.addEventListener('click', function() {
        var chapter = button.parentElement;
        chapter.classList.toggle('active');
    });
});

/* ==========================================================================
   ۲. ثبت نظر جدید (کاملاً ساده و بدون علامت‌های سخت)
   ========================================================================== */
function addFakeComment(event) {
    event.preventDefault();

    var textInput = document.getElementById('commentText');
    var wrapper = document.getElementById('commentsWrapper');

    // ساخت باکس کامنت جدید
    var newCard = document.createElement('div');
    newCard.className = 'single-comment-card new-comment-animate';

    // محتوای داخل باکس کامنت
    newCard.innerHTML = '<div class="comment-user-info"><div class="comment-user-avatar">👤</div><div><h5>شما (کاربر سایت)</h5><span>هم‌اکنون</span></div></div><p class="comment-message-text">' + textInput.value + '</p>';

    // اضافه کردن کامنت به اول لیست
    wrapper.insertBefore(newCard, wrapper.firstChild);

    // خالی کردن فرم
    textInput.value = '';
}

/* ==========================================================================
   ۳. دکمه مشاهده بیشتر نظرات
   ========================================================================== */
function loadMoreFakeComments() {
    var wrapper = document.getElementById('commentsWrapper');
    var btn = document.getElementById('loadMoreCommentsBtn');

    var newCard = document.createElement('div');
    newCard.className = 'single-comment-card';
    newCard.innerHTML = '<div class="comment-user-info"><div class="comment-user-avatar">👤</div><div><h5>علی مرادی</h5><span>کاربر سایت</span></div></div><p class="comment-message-text">سرفصل‌های این دوره واقعاً کامل و عالی طراحی شده است.</p>';

    wrapper.appendChild(newCard);

    // مخفی کردن دکمه پس از کلیک
    btn.style.display = 'none';
}

// آرایه ذخیره محصولات سبد خرید در حافظه مرورگر
var globalCartList = [];

// تابع افزودن به سبد خرید و نشان دادن پیام سبز
function addProductToCart(title, price) {
    // اضافه کردن محصول به پورتال
    globalCartList.push({
        courseTitle: title,
        coursePrice: price
    });

    // شبیه‌سازی آپدیت تعداد سبد خرید اگر در هدر سایتمان آیکون داریم
    var badge = document.getElementById('cartCountBadge');
    if (badge) {
        badge.innerText = globalCartList.length;
    }

    // اجرای پیام موفقیت سبز رنگ
    showSuccessToast('دوره "' + title + '" با موفقیت به سبد خرید شما افزوده شد!');
}

// تابع ساخت پیام توست سبز رنگ کاملاً داینامیک
function showSuccessToast(messageText) {
    var container = document.getElementById('toastContainer');

    // ساخت پورتال المنت پیام
    var toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = '✅ ' + messageText;

    // اضافه کردن به کانتینر اصلی صفحه
    container.appendChild(toast);

    // حذف خودکار پیام بعد از ۳ ثانیه با افکت خروج
    setTimeout(function() {
        toast.className += ' fade-out';
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 3000);
}

// تابع فعال و غیرفعال کردن دکمه نشان کردن دوره
function toggleBookmark(buttonElement) {
    if (buttonElement.classList.contains('active')) {
        buttonElement.classList.remove('active');
        showSuccessToast('دوره از لیست نشان‌ها حذف شد.');
    } else {
        buttonElement.classList.add('active');
        showSuccessToast('دوره به لیست نشان‌های شما اضافه شد!');
    }
}
