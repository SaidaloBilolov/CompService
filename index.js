document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM to'liq yuklandi va tahlil qilindi.");

    // ----- CHATBOT UCHUN ELEMENTLAR -----
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const chatbotWindow = document.querySelector(".chatbot");
    const closeChatbotBtn = document.querySelector(".chatbot header span.close-chatbot-btn");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span#send-btn");
    const chatbox = document.querySelector(".chatbox");

    console.log("Chatbot Toggler Element:", chatbotToggler);
    console.log("Chatbot Element:", chatbotWindow);

    // ----- CHATBOT UCHUN HODISALAR -----
    if (chatbotToggler) {
        chatbotToggler.addEventListener("click", () => {
            console.log("Chatbot toggler bosildi!");
            document.body.classList.toggle("show-chatbot");
            console.log("body klasslari:", document.body.className);
        });
    } else {
        console.error("Xatolik: Chatbot ochish/yopish tugmasi (.chatbot-toggler) topilmadi!");
    }

    if (closeChatbotBtn) {
        closeChatbotBtn.addEventListener("click", () => {
            console.log("Chatbot yopish tugmasi (headerdagi) bosildi!");
            document.body.classList.remove("show-chatbot");
            console.log("body klasslari (yopishdan keyin):", document.body.className);
        });
    } else {
        console.warn("Ogohlantirish: Chatbot headeridagi yopish tugmasi topilmadi.");
    }

    // ----- CHATBOT UCHUN FUNKSIYALAR -----
    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        let chatContent = "";
        if (className === "outgoing") {
            chatContent = `<p>${message}</p>`;
        } else {
            chatContent = `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
        }
        chatLi.innerHTML = chatContent;
        return chatLi;
    };

    // ----- KENGAYTIRILGAN JAVOBLAR BILAN getSimpleBotResponse FUNKSIYASI -----
    const getSimpleBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase().trim();

        if (message.includes("salom") || message.includes("assalomu alaykum") || message.includes("privet")) {
            return "Salom! Kompyuter xizmatlari bo'yicha sizga qanday yordam bera olaman?";
        } else if (message.includes("xayr") || message.includes("ko'rishguncha") || message.includes("poka")) {
            return "Xayr! Yaxshi qoling. Muammo bo'lsa, yana murojaat qiling!";
        } else if (message.includes("qanday ishlar") || message.includes("nima gap") || message.includes("ahvollar qanday")) {
            return "Hammasi joyida, rahmat! Sizning kompyuteringizda muammolar yo'qligiga umid qilaman. Agar bo'lsa, yordamga tayyorman!";
        } else if (message.includes("yordam") || message.includes("savol")) {
            return "Albatta, savolingizni yoki muammoingizni ayting. Qo'limdan kelgancha yordam beraman.";
        } else if (message.includes("rahmat") || message.includes("tashakkur") || message.includes("spasibo")) {
            return "Arzimaydi! Yana yordamim kerak bo'lsa, tortinmang.";
        } else if (message.includes("isming nima") || message.includes("sen kimsan")) {
            return "Men sizning virtual yordamchingizman, kompyuter xizmatlari bo'yicha savollaringizga javob berish uchun yaratilganman.";
        }

        // Xizmatlar haqida umumiy savol
        else if (message.includes("xizmatlar") || message.includes("servislar") || message.includes("nima ish qilasizlar")) {
            return "Biz quyidagi xizmatlarni taklif etamiz: <br>1. Kompyuter va noutbuklarni ta'mirlash <br>2. Dasturiy ta'minot o'rnatish va sozlash (Windows, Antivirus va hk.) <br>3. Viruslardan tozalash <br>4. Ma'lumotlarni tiklash <br>5. Kompyuter qismlarini almashtirish va modernizatsiya qilish <br>6. Internet va tarmoq sozlamalari. <br>Qaysi biri haqida batafsil ma'lumot kerak?";
        }

        // Muayyan xizmatlar haqida
        else if (message.includes("kompyuter tuzatish") || message.includes("remont") || message.includes("kompyuterim buzildi")) {
            return "Kompyuteringizda qanday muammo yuzaga keldi? Masalan, yonmayaptimi, qotib qolyaptimi, g'alati ovoz chiqaryaptimi yoki boshqa biror narsami? Muammoni batafsilroq aytsangiz, aniqroq yordam bera olaman.";
        } else if (message.includes("noutbuk tuzatish") || message.includes("noutbuk remont")) {
            return "Noutbukingiz bilan bog'liq muammo nimada? Ekran, klaviatura, batareya yoki boshqa biror qismidami? Iltimos, batafsilroq ma'lumot bering.";
        } else if (message.includes("dastur o'rnatish") || message.includes("programma o'rnatish") || message.includes("windows o'rnatish") || message.includes("antivirus o'rnatish")) {
            if (message.includes("windows")) {
                return "Windows operatsion tizimini o'rnatish yoki qayta o'rnatish xizmatimiz mavjud. Litsenziyalangan dasturlardan foydalanishni tavsiya etamiz. Qaysi versiyasini o'rnatmoqchisiz?";
            } else if (message.includes("antivirus")) {
                return "Kompyuteringizni viruslardan himoya qilish uchun antivirus dasturini o'rnatib beramiz. Sizda biror bir tanlagan antivirus bormi yoki tavsiyamiz kerakmi?";
            }
            return "Qanday dasturiy ta'minot o'rnatmoqchisiz? Biz ofis dasturlari, dizayn dasturlari, antiviruslar va boshqa ko'plab dasturlarni o'rnatishda yordam bera olamiz.";
        } else if (message.includes("virus") || message.includes("virus tozalash")) {
            return "Kompyuteringizga virus tushganidan shubhalanayapsizmi yoki sekin ishlayaptimi? Biz kompyuteringizni viruslardan tozalash va himoya choralarini ko'rishga yordam beramiz.";
        } else if (message.includes("ma'lumotlarni tiklash") || message.includes("fayllarim o'chib ketdi") || message.includes("fleshka ochilmayapti")) {
            return "Ma'lumotlaringiz o'chib ketdimi yoki qurilmangiz (fleshka, qattiq disk) ochilmayaptimi? Ma'lumotlarni tiklash imkoniyati bor, lekin bu holatga bog'liq. Qurilmangizni bizga olib kelishingiz kerak bo'ladi.";
        } else if (message.includes("kompyuter qotib qolyapti") || message.includes("komp sekin ishlayapti")) {
            return "Kompyuterning qotib qolishi yoki sekin ishlashiga bir nechta sabablar bo'lishi mumkin: viruslar, keraksiz fayllar, operativ xotira yetishmasligi yoki qattiq diskdagi muammolar. Diagnostika qilish uchun bizga murojaat qilishingiz mumkin.";
        } else if (message.includes("internet ishlamayapti") || message.includes("internetga ulanolmayapman")) {
            return "Internet ishlamayotgan bo'lsa, avvalo modem/router qurilmangizni qayta yoqib ko'ring. Agar bu yordam bermasa, bizga murojaat qiling, sozlamalarni tekshirib beramiz yoki provayderingiz bilan bog'lanishda yordam beramiz.";
        }

        // Narxlar haqida
        else if (message.includes("narx") || message.includes("qancha turadi") || message.includes("stoimost") || message.includes("narxi qancha")) {
            if (message.includes("diagnostika") || message.includes("tekshirish")) {
                return "Kompyuterni dastlabki diagnostika qilish (muammoni aniqlash) bizda odatda [Diagnostika Narxini Shu Yerga Yozing, masalan: BEPUL yoki 50,000 so'm]. Keyingi ta'mirlash ishlari narxi muammoga qarab belgilanadi.";
            }
            return "Xizmatlar narxi muammoning murakkabligiga va kerak bo'ladigan ehtiyot qismlarga qarab o'zgaradi. Aniq narxni bilish uchun, iltimos, muammoingizni batafsilroq tushuntiring yoki kompyuteringizni diagnostikaga olib keling. Biz bilan bog'laning: [Telefon Raqamingizni Shu Yerga Yozing].";
        }

        // Manzil va ish vaqti
        else if (message.includes("manzil") || message.includes("adres") || message.includes("qayerda joylashgansizlar")) {
            return "Bizning manzilimiz: [Sizning To'liq Manzilingizni Shu Yerga Yozing]. Google Xaritalarda bizni [Kompaniyangiz Nomini Shu Yerga Yozing] deb qidirsangiz topasiz.";
        } else if (message.includes("ish vaqti") || message.includes("qachon ishlaysizlar") || message.includes("ish tartibi")) {
            return "Bizning ish vaqtimiz: Dushanbadan Shanbagacha, soat [Boshlanish Vaqtini Shu Yerga Yozing] dan [Tugash Vaqtini Shu Yerga Yozing] gacha. Yakshanba - dam olish kuni. Telefon orqali maslahat olish uchun: [Telefon Raqamingizni Shu Yerga Yozing].";
        } else if (message.includes("telefon raqam") || message.includes("aloqa") || message.includes("bog'lanish")) {
            return "Biz bilan bog'lanish uchun telefon raqamimiz: [Telefon Raqamingizni Shu Yerga Yozing]. Telegram orqali yozishingiz ham mumkin: [Telegram Manzilingiz yoki Telefon Raqamingizni Shu Yerga Yozing].";
        }

        // Kichik maslahatlar (ehtiyotkorlik bilan)
        else if (message.includes("kompyuter qizib ketyapti") || message.includes("noutbuk qiziyapti")) {
            return "Kompyuterning qizib ketishi chang to'planishi yoki sovutish tizimidagi nosozlikdan bo'lishi mumkin. Vaqti-vaqti bilan tozalab turish kerak. Agar o'zingiz tozalay olmasangiz, biz yordam beramiz.";
        } else if (message.includes("ekran ko'rsatmayapti") || message.includes("monitor ishlamayapti")) {
            return "Ekran ko'rsatmayotgan bo'lsa, avvalo kabel ulanishlarini tekshiring. Agar stol kompyuteri bo'lsa, monitorning o'zi yoqilganligiga va kompyuterga to'g'ri ulanganligiga ishonch hosil qiling. Muammo davom etsa, bizga olib keling.";
        }

        // Hazil yoki boshqa narsalar
        else if (message.includes("hazil ayt") || message.includes("latifa")) {
            const jokes = [
                "Bir programmistdan so'rashibdi: Sizga qancha programmist kerak bitta lampochkani almashtirish uchun? Javob: Hech qancha, bu apparat ta'minoti muammosi!",
                "Nega kompyuter sovuq qotdi? Chunki u Windows (derazalar) ni ochiq qoldirgandi!",
                "Ikki bit suhbatlashyapti. Bittasi ikkinchisiga: 'Menda sal bit bor edi, shuni almashtirib berolmaysanmi?'"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }

        // Agar hech qanday shartga mos kelmasa
        else {
            return "Kechirasiz, bu savolingizga hozircha javob bera olmayman. Iltimos, savolingizni boshqacha tarzda bering yoki to'g'ridan-to'g'ri biz bilan bog'laning: [Telefon Raqamingizni Shu Yerga Yozing].";
        }
    };
    // ----- getSimpleBotResponse FUNKSIYASI TUGADI -----


    const handleChat = () => {
        if (!chatInput || !chatbox) {
            console.error("Chat input yoki chatbox topilmadi!");
            return;
        }
        const userMessageText = chatInput.value.trim();
        if (!userMessageText) return;

        const outgoingChatLi = createChatLi(userMessageText, "outgoing");
        chatbox.appendChild(outgoingChatLi);
        chatbox.scrollTop = chatbox.scrollHeight;

        chatInput.value = "";
        chatInput.style.height = "auto"; // Reset height

        setTimeout(() => {
            const botMessageText = getSimpleBotResponse(userMessageText);
            const incomingChatLi = createChatLi(botMessageText, "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTop = chatbox.scrollHeight;
        }, 600);
    };

    if (sendChatBtn) {
        sendChatBtn.addEventListener("click", handleChat);
    } else {
        console.warn("Ogohlantirish: Xabar yuborish tugmasi (span#send-btn) topilmadi.");
    }

    if (chatInput) {
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleChat();
            }
        });
        chatInput.addEventListener("input", () => {
            chatInput.style.height = "auto";
            chatInput.style.height = `${chatInput.scrollHeight}px`;
            if (sendChatBtn) {
                if (chatInput.value.trim() !== "") {
                    sendChatBtn.style.visibility = "visible";
                } else {
                    sendChatBtn.style.visibility = "hidden";
                }
            }
        });
        // Sahifa yuklanganda yuborish tugmasining ko'rinishini o'rnating
        if (sendChatBtn) { // Bu yerda ham tekshiruv
            if (chatInput.value.trim() === "") {
                sendChatBtn.style.visibility = "hidden";
            } else {
                sendChatBtn.style.visibility = "visible";
            }
        }
    } else {
        console.error("Xatolik: Xabar kiritish maydoni (textarea) topilmadi!");
    }

    // ----- GAMBURGER MENYU UCHUN YANGI KOD -----
    const hamburgerBtn = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");
    const hamburgerIcon = hamburgerBtn ? hamburgerBtn.querySelector(".hamburger-icon") : null;
    const closeMenuIcon = hamburgerBtn ? hamburgerBtn.querySelector(".close-icon") : null;

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", () => {
            const isActive = navLinks.classList.toggle("active");
            hamburgerBtn.setAttribute('aria-expanded', isActive);

            if (isActive) {
                if (hamburgerIcon) hamburgerIcon.style.display = "none";
                if (closeMenuIcon) closeMenuIcon.style.display = "block";
            } else {
                if (hamburgerIcon) hamburgerIcon.style.display = "block";
                if (closeMenuIcon) closeMenuIcon.style.display = "none";
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    if (hamburgerIcon) hamburgerIcon.style.display = "block";
                    if (closeMenuIcon) closeMenuIcon.style.display = "none";
                }
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnHamburger = hamburgerBtn.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                if (hamburgerIcon) hamburgerIcon.style.display = "block";
                if (closeMenuIcon) closeMenuIcon.style.display = "none";
            }
        });

    } else {
        if (!hamburgerBtn) console.warn("Gamburger tugmasi (.hamburger-menu) topilmadi.");
        if (!navLinks) console.warn("Navigatsiya havolalari konteyneri (.nav-links) topilmadi.");
    }
    // ----- GAMBURGER MENYU UCHUN KOD TUGADI -----
});