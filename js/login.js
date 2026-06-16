document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var togglePassword = document.getElementById('togglePassword');
    var globalErrorBox = document.getElementById('globalErrorBox');
    var authCard = document.getElementById('authCard');
    var submitBtn = document.getElementById('submitBtn');
    var btnText = submitBtn.querySelector('.btn-text');
    var btnSpinner = submitBtn.querySelector('.btn-spinner');

    // ۱. عملکرد دکمه چشم برای مخفی/ظاهر کردن رمز عبور
    togglePassword.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            togglePassword.textContent = '👁️';
        }
    });

    // تابع کمکی برای بررسی فرمت صحیح ایمیل
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ۲. اعتبارسنجی فرم هنگام زدن دکمه ثبت فرم
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // جلوگیری از رفرش شدن آنی صفحه
        
        var isFormValid = true;
        globalErrorBox.style.display = 'none'; // ریست کردن خطای کلی

        // بررسی فیلد ایمیل
        if (!isValidEmail(emailInput.value.trim())) {
            document.getElementById('emailGroup').classList.add('has-error');
            isFormValid = false;
        } else {
            document.getElementById('emailGroup').classList.remove('has-error');
        }

        // بررسی فیلد پسورد (حداقل ۶ کاراکتر برای امنیت)
        if (passwordInput.value.length < 6) {
            document.getElementById('passwordGroup').classList.add('has-error');
            isFormValid = false;
        } else {
            document.getElementById('passwordGroup').classList.remove('has-error');
        }

        // ۳. اگر فرم خطا داشت، افکت لرزش اجرا شود
        if (!isFormValid) {
            authCard.classList.add('shake-animation');
            // حذف کلاس انیمیشن پس از اتمام برای اجرای مجدد در دفعات بعدی
            setTimeout(function() {
                authCard.classList.remove('shake-animation');
            }, 400);
            return;
        }

        // ۴. اگر فرم بدون خطا بود، حالت لودینگ فعال شود (شبیه‌سازی ارتباط با سرور)
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnSpinner.style.display = 'block';

        setTimeout(function() {
            // شبیه‌سازی یک خطای فرضی از سمت سرور (مثلا رمز اشتباه است)
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnSpinner.style.display = 'none';
            
            // نمایش خطای سرور و لرزش کارت
            globalErrorBox.textContent = "ایمیل یا رمز عبور وارد شده اشتباه است!";
            globalErrorBox.style.display = 'block';
            authCard.classList.add('shake-animation');
            setTimeout(function() { authCard.classList.remove('shake-animation'); }, 400);
            
        }, 1500); // لودینگ به مدت ۱.۵ ثانیه طول می‌کشد
    });

    // ۵. حذف لحظه‌ای خطای فیلدها هنگام تایپ کردن مجدد کاربر
    emailInput.addEventListener('input', function() {
        document.getElementById('emailGroup').classList.remove('has-error');
    });
    passwordInput.addEventListener('input', function() {
        document.getElementById('passwordGroup').classList.remove('has-error');
    });
});
