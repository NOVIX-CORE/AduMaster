let cartItems = [];
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // ۱. مدیریت پرلودر (غیب شدن انیمیشن اول صفحه)
    // ==========================================
    var preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }

    // ==========================================
    // ۲. اسلایدر دوره‌ها (coursesSlider)
    // ==========================================
    var mainSlider = document.getElementById('coursesSlider');
    var buttonPrev = document.getElementById('prevBtn');
    var buttonNext = document.getElementById('nextBtn');

    if (mainSlider) {
        var currentSlideIndex = 0;
        var autoScrollTimer = null;

        function countVisibleCards() {
            var pageWidth = window.innerWidth;
            if (pageWidth > 1024) return 3;
            if (pageWidth > 640) return 2;
            return 1;
        }

        function moveSlider() {
            var singleCard = mainSlider.querySelector('.course-card');
            if (!singleCard) return;
            var cardWidth = singleCard.getBoundingClientRect().width;
            var spaceGap = 24;
            var totalMove = currentSlideIndex * (cardWidth + spaceGap);
            mainSlider.style.transform = 'translateX(' + totalMove + 'px)';
        }

        function goToNextSlide() {
            var totalCardsCount = mainSlider.children.length;
            var visibleCardsCount = countVisibleCards();
            if (totalCardsCount <= visibleCardsCount) return;
            if (currentSlideIndex >= (totalCardsCount - visibleCardsCount)) {
                currentSlideIndex = 0;
            } else {
                currentSlideIndex = currentSlideIndex + 1;
            }
            moveSlider();
        }

        function goToPrevSlide() {
            var totalCardsCount = mainSlider.children.length;
            var visibleCardsCount = countVisibleCards();
            if (totalCardsCount <= visibleCardsCount) return;
            if (currentSlideIndex <= 0) {
                currentSlideIndex = totalCardsCount - visibleCardsCount;
            } else {
                currentSlideIndex = currentSlideIndex - 1;
            }
            moveSlider();
        }

        if (buttonNext && buttonPrev) {
            buttonNext.addEventListener('click', function() {
                clearInterval(autoScrollTimer);
                goToNextSlide();
                runAutoPlay();
            });
            buttonPrev.addEventListener('click', function() {
                clearInterval(autoScrollTimer);
                goToPrevSlide();
                runAutoPlay();
            });
        }

        function runAutoPlay() {
            autoScrollTimer = setInterval(goToNextSlide, 4000);
        }

        runAutoPlay();

        window.addEventListener('resize', function() {
            currentSlideIndex = 0;
            moveSlider();
        });
    }

    // ==========================================
    // ۳. دکمه‌های چشم (نمایش/مخفی کردن رمز عبور)
    // ==========================================
    var togglePassword = document.getElementById('togglePassword');
    var passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function(e) {
            e.preventDefault();
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePassword.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                togglePassword.textContent = '👁️';
            }
        });
    }

    var toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    var confirmPasswordInput = document.getElementById('confirmPassword');
    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirmPasswordInput.type === 'password') {
                confirmPasswordInput.type = 'text';
                toggleConfirmPassword.textContent = '🙈';
            } else {
                confirmPasswordInput.type = 'password';
                toggleConfirmPassword.textContent = '👁️';
            }
        });
    }

    // ==========================================
    // ۴. آکاردئون سوالات متداول صفحه اصلی
    // ==========================================
    const questions = document.querySelectorAll(".home-faq-question");

    questions.forEach(function(question) {

        question.addEventListener("click", function() {

            this.parentElement.classList.toggle("active");

        });

    });


    // ==========================================
    // ۵. شمارنده‌های لوکس آمار (luxuryCounters)
    // ==========================================
    var luxuryCounters = document.querySelectorAll('.luxury-stat-number');
    if (luxuryCounters.length > 0) {
        luxuryCounters.forEach(function(counter) {
            var updateCount = function() {
                var target = Number(counter.getAttribute('data-target'));
                var count = Number(counter.innerText.replace(/[^0-9.]/g, ''));
                var speed = target / 40;

                if (count < target) {
                    if (target === 48) {
                        counter.innerText = ((count + 1) / 10).toFixed(1);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = Math.ceil(count + speed);
                        setTimeout(updateCount, 25);
                    }
                } else {
                    if (target === 48) {
                        counter.innerText = "۴.۸";
                    } else if (target === 1500) {
                        counter.innerText = "+۱,۵۰۰";
                    } else {
                        counter.innerText = target;
                    }
                }
            };
            updateCount();
        });
    }

    // ==========================================
    // ۶. اسلایدر نظرات دانشجویان (testimonialSlider)
    // ==========================================
    var slider = document.getElementById("testimonialSlider");
    var prev = document.getElementById("testimonialPrevBtn");
    var next = document.getElementById("testimonialNextBtn");

    if (slider && prev && next) {
        var index = 0;

        function getCardSize() {
            var card = slider.querySelector(".testimonial-card");
            return card ? (card.offsetWidth + 30) : 0;
        }

        function move() {
            slider.style.transform = "translateX(-" + (index * getCardSize()) + "px)";
        }

        next.addEventListener("click", function() {
            var total = slider.children.length;
            var visible = 3;
            if (index >= total - visible) {
                index = 0;
            } else {
                index++;
            }
            move();
        });

        prev.addEventListener("click", function() {
            var total = slider.children.length;
            var visible = 3;
            if (index <= 0) {
                index = total - visible;
            } else {
                index--;
            }
            move();
        });

        window.addEventListener("resize", function() {
            move();
        });
    }

    // ==========================================
    // ۷. مخفی شدن باکس تایمر بالای صفحه با اسکرول
    // ==========================================
    var timerBox = document.getElementById("topTimer");
    if (timerBox) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 80) {
                timerBox.style.transform = "translateY(-100%)";
            } else {
                timerBox.style.transform = "translateY(0)";
            }
        });
    }
});

// ==========================================
// ۸. عملکرد منوی سایدبار داشبورد
// ==========================================
function toggleMenu() {
    var sidebar = document.querySelector(".dash-sidebar");
    if (sidebar) {
        sidebar.classList.toggle("active");
    }
}

// ==========================================
// ۹. باز و بسته کردن پاپ‌آ‌پ تایید خروج
// ==========================================
function toggleLogoutModal(isOpen) {
    var modal = document.getElementById('logoutModal');
    if (!modal) return;
    if (isOpen) {
        modal.classList.add('open');
    } else {
        modal.classList.remove('open');
    }
}

// ==========================================
// ۱۰. پردازش کامل فرم ثبت‌نام و انیمیشن لرزش
// ==========================================
function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

var registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var usernameInput = document.getElementById('username');
        var regEmailInput = document.getElementById('email');
        var regPasswordInput = document.getElementById('password');
        var confirmPasswordInput = document.getElementById('confirmPassword');
        var termsCheck = document.getElementById('termsCheck');
        var regGlobalError = document.getElementById('globalErrorBox');
        var regAuthCard = document.getElementById('authCard');

        var isValid = true;
        if (regGlobalError) regGlobalError.style.display = 'none';

        if (usernameInput && usernameInput.value.trim().length < 3) {
            var group = document.getElementById('usernameGroup');
            if (group) group.classList.add('has-error');
            isValid = false;
        } else {
            var group = document.getElementById('usernameGroup');
            if (group) group.classList.remove('has-error');
        }

        if (regEmailInput && !isEmailValid(regEmailInput.value.trim())) {
            var group = document.getElementById('emailGroup');
            if (group) group.classList.add('has-error');
            isValid = false;
        } else {
            var group = document.getElementById('emailGroup');
            if (group) group.classList.remove('has-error');
        }

        if (regPasswordInput && regPasswordInput.value.length < 6) {
            var group = document.getElementById('passwordGroup');
            if (group) group.classList.add('has-error');
            isValid = false;
        } else {
            var group = document.getElementById('passwordGroup');
            if (group) group.classList.remove('has-error');
        }

        if (confirmPasswordInput && regPasswordInput && (confirmPasswordInput.value !== regPasswordInput.value || confirmPasswordInput.value.length === 0)) {
            var group = document.getElementById('confirmPasswordGroup');
            if (group) group.classList.add('has-error');
            isValid = false;
        } else {
            var group = document.getElementById('confirmPasswordGroup');
            if (group) group.classList.remove('has-error');
        }

        if (termsCheck && !termsCheck.checked) {
            if (regGlobalError) {
                regGlobalError.textContent = "لطفاً ابتدا قوانین و مقررات سایت را تایید کنید.";
                regGlobalError.style.display = 'block';
            }
            isValid = false;
        }

        // اگر خطایی وجود داشت، کارت ثبت‌نام لرزش پیدا کند
        if (!isValid) {
            if (regAuthCard) {
                regAuthCard.classList.add('shake-animation');
                setTimeout(function() { regAuthCard.classList.remove('shake-animation'); }, 400);
            }
            return;
        }

        // شبیه‌سازی لودینگ موفقیت‌آمیز ثبت‌نام
        var submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            var btnText = submitBtn.querySelector('.btn-text');
            var btnSpinner = submitBtn.querySelector('.btn-spinner');
            if (btnText) btnText.style.display = 'none';
            if (btnSpinner) btnSpinner.style.display = 'block';

            setTimeout(function() {
                submitBtn.disabled = false;
                if (btnText) btnText.style.display = 'block';
                if (btnSpinner) btnSpinner.style.display = 'none';

                // نمایش پیام فرضی سرور
                if (regGlobalError) {
                    regGlobalError.textContent = "این ایمیل قبلاً ثبت‌نام شده است!";
                    regGlobalError.style.display = 'block';
                }
                if (regAuthCard) {
                    regAuthCard.classList.add('shake-animation');
                    setTimeout(function() { regAuthCard.classList.remove('shake-animation'); }, 400);
                }
            }, 1500);
        }
    });

    // حذف خطاها در زمان تایپ مجدد کاربر
    var usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            var group = document.getElementById('usernameGroup');
            if (group) group.classList.remove('has-error');
        });
    }

    var confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            var group = document.getElementById('confirmPasswordGroup');
            if (group) group.classList.remove('has-error');
        });
    }
}




window.addEventListener("DOMContentLoaded", () => {
    // انتخاب المان با استفاده از هشتگ (#) برای آی‌دی شما
    const scrollTopBtn = document.querySelector("#scrollTopBtn");

    if (scrollTopBtn) {
        // ۱. مدیریت ظاهر شدن و مخفی شدن دکمه هنگام اسکرول صفحه
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.opacity = "1";
                scrollTopBtn.style.visibility = "visible";
            } else {
                scrollTopBtn.style.opacity = "0";
                scrollTopBtn.style.visibility = "hidden";
            }
        });

        // ۲. اجرای اسکرول نرم به بالا هنگام کلیک روی دکمه
        scrollTopBtn.addEventListener("click", (e) => {
            e.preventDefault(); // جلوگیری از رفتار پرش ناگهانی مرورگر
            window.scrollTo({
                top: 0,
                behavior: "smooth" // اسکرول کاملاً انیمیشنی و نرم
            });
        });
    }
});


window.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.querySelector("#themeToggleBtn");
    const currentTheme = localStorage.getItem("theme");

    // ۱. بررسی حافظه مرورگر؛ اگر کاربر قبلاً تم دارک را انتخاب کرده بود، آن را اعمال کن
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    if (themeToggleBtn) {
        // ۲. گوش دادن به کلیک دکمه سوئیچ
        themeToggleBtn.addEventListener("click", () => {
            // خواندن وضعیت فعلی تم سایت
            let theme = document.documentElement.getAttribute("data-theme");

            if (theme === "dark") {
                // اگر دارک بود، حذفش کن تا روشن شود
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("theme", "light"); // ذخیره در حافظه
            } else {
                // اگر روشن بود، دارک را فعال کن
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark"); // ذخیره در حافظه
            }
        });
    }
});




// برای سبد خرید
// نمونه داده دوره‌ها برای شبیه‌سازی فرانت‌اند
// let cartItems = [
//     { id: 1, title: "آموزش جامع جاوااسکریپت ۲۰۲۶", price: 450000, img: "../images/js.png" },
//     { id: 2, title: "متدهای پیشرفته CSS Grid", price: 290000, img: "../images/css.jpg" },
// ];

// // فانکشن به‌روزرسانی قالب سبد خرید در هدر
// function updateMiniCart() {
//     const cartItemsContainer = document.querySelector('.mini-cart-items');
//     const cartBadge = document.querySelector('.cart-badge');
//     const totalPriceEl = document.querySelector('.mini-cart-footer strong');

//     if(!cartItemsContainer || !cartBadge) return;

//     cartBadge.textContent = cartItems.length;

//     if (cartItems.length === 0) {
//         cartItemsContainer.innerHTML = '<div class="text-center p-3 text-muted">سبد خرید شما خالی است.</div>';
//         if(totalPriceEl) totalPriceEl.textContent = '۰ تومان';
//         return;
//     }

//     let html = '';
//     let total = 0;

//     cartItems.forEach(item => {
//         total += item.price;
//         html += 
//             <div class="mini-cart-item" data-id="${item.id}">
//                 <img src="${item.img}" alt="${item.title}" class="cart-item-thumb">
//                 <div class="cart-item-details">
//                     <h4>${item.title}</h4>
//                     <span class="cart-item-price">${item.price.toLocaleString('fa-IR')} تومان</span>
//                 </div>
//                 <button class="remove-item-btn" onclick="removeFromCart(${item.id})">&times;</button>
//             </div>
//         ;
//     });

//     cartItemsContainer.innerHTML = html;
//     if(totalPriceEl) totalPriceEl.textContent = total.toLocaleString('fa-IR') + ' تومان';
// }

// // فانکشن حذف آیتم از سبد خرید
// function removeFromCart(id) {
//     cartItems = cartItems.filter(item => item.id !== id);
//     updateMiniCart();
//     // اگر در صفحه سبد خرید اصلی هم باشیم، آن را هم بروز میکنیم
//     if(typeof updateMainCartPage === 'function') {
//         updateMainCartPage();
//     }
// }

// // حذف همه آیتم‌ها
// document.querySelector('.clear-cart-text')?.addEventListener('click', () => {
//     cartItems = [];
//     updateMiniCart();
//     if(typeof updateMainCartPage === 'function') {
//         updateMainCartPage();
//     }
// });

// // اجرای اولیه هنگام لود صفحه
// document.addEventListener('DOMContentLoaded', updateMiniCart);

// {/* ادامه سبد خرید */}

// // اتصال صفحه اصلی سبد خرید به کدهای جاوااسکریپت بالا
//         function updateMainCartPage() {
//             const tableBody = document.getElementById('mainCartTableBody');
//             const subtotalPriceEl = document.getElementById('subtotalPrice');
//             const finalTotalPriceEl = document.getElementById('finalTotalPrice');

//             if(!tableBody) return;

//             if(cartItems.length === 0) {
//                 tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding: 40px 0; color:var(--text-muted);">هیچ دوره‌ای در سبد خرید شما نیست.</td></tr>';
//                 subtotalPriceEl.textContent = '۰ تومان';
//                 finalTotalPriceEl.textContent = '۰ تومان';
//                 return;
//             }

//             let html = '';
//             let total = 0;

//             cartItems.forEach(item => {
//                 total += item.price;
//                 html += 
//                     <tr>
//                         <td>
//                             <div class="cart-page-item">
//                                 <img src="${item.img}" class="cart-page-img">
//                                 <div class="cart-page-title">
//                                     <h3>${item.title}</h3>
//                                 </div>
//                             </div>
//                         </td>
//                         <td style="color: var(--primary-color); font-weight: bold;">${item.price.toLocaleString('fa-IR')} تومان</td>
//                         <td><button class="delete-row-btn" onclick="removeFromCart(${item.id})">&times;</button></td>
//                     </tr>
//                 ;
//             });

//             tableBody.innerHTML = html;
//             subtotalPriceEl.textContent = total.toLocaleString('fa-IR') + ' تومان';
//             finalTotalPriceEl.textContent = total.toLocaleString('fa-IR') + ' تومان';
//         }

//         // اجرای تابع رندر صفحه اصلی هماهنگ با مینی سبد خرید
//         document.addEventListener('DOMContentLoaded', () => {
//             updateMainCartPage();
//         });
