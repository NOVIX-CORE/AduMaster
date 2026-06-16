// پیش‌نمایش تصویر پروفایل بلافاصله پس از انتخاب فایل
function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('avatarPreview');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// اعتبارسنجی فرم تغییر رمز عبور (کاملاً ساده و بدون علامت‌های سخت)
function validatePassword(event) {
    var newPass = document.getElementById('newPass').value;
    var confirmPass = document.getElementById('confirmPass').value;

    // چک کردن مطابقت دو رمز عبور
    if (newPass !== confirmPass) {
        event.preventDefault(); // جلوگیری از رفرش شدن و ارسال فرم
        alert('خطا: کلمه عبور جدید با تکرار آن مطابقت ندارد!');
    } else {
        alert('موفقیت: کلمه عبور شما با موفقیت تغییر یافت.');
    }
}
