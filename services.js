document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed.");

    // ----- HAMBURGER MENU -----
    const hamburgerBtn = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links"); // This matches your HTML
    const hamburgerIcon = hamburgerBtn ? hamburgerBtn.querySelector(".hamburger-icon") : null;
    const closeMenuIcon = hamburgerBtn ? hamburgerBtn.querySelector(".close-icon") : null;

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", () => {
            const isActive = navLinks.classList.toggle("active");
            hamburgerBtn.setAttribute('aria-expanded', isActive.toString());

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
        if (!hamburgerBtn) console.warn("Warning: Hamburger button (.hamburger-menu) not found.");
        if (!navLinks) console.warn("Warning: Navigation links container (.nav-links) not found.");
    }

    // ----- CHATBOT -----
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const chatbotWindow = document.querySelector(".chatbot");
    const closeChatbotBtn = chatbotWindow ? chatbotWindow.querySelector(".chatbot header .close-chatbot-btn") : null; // Corrected selector based on my HTML
    const chatInput = chatbotWindow ? chatbotWindow.querySelector(".chat-input textarea") : null;
    const sendChatBtn = chatbotWindow ? chatbotWindow.querySelector(".chat-input span#send-btn") : null;
    const chatbox = chatbotWindow ? chatbotWindow.querySelector(".chatbox") : null;

    if (chatbotToggler) {
        chatbotToggler.addEventListener("click", () => {
            document.body.classList.toggle("show-chatbot");
        });
    } else {
        console.warn("Warning: Chatbot toggler (.chatbot-toggler) not found.");
    }

    if (closeChatbotBtn) {
        closeChatbotBtn.addEventListener("click", () => {
            document.body.classList.remove("show-chatbot");
        });
    }

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        let chatContent = (className === "outgoing") ?
            `<p>${message}</p>` :
            `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
        chatLi.innerHTML = chatContent;
        return chatLi;
    };

    const getComputerServiceBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase().trim();

        // Greetings and Basic Interaction
        if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
            return "Hello! How can I help you with our computer repair services today?";
        } else if (message.includes("bye") || message.includes("goodbye")) {
            return "Goodbye! Feel free to contact us if you need anything.";
        } else if (message.includes("help") || message.includes("support") || message.includes("problem")) {
            return "I can help with that. Could you please describe the issue you're having with your computer?";
        } else if (message.includes("thank you") || message.includes("thanks")) {
            return "You're welcome! Is there anything else I can assist you with?";
        }

        // Service Inquiries
        else if (message.includes("services") || message.includes("what do you do") || message.includes("repair options")) {
            return "We offer virus removal, data recovery, hardware repairs, OS installation, laptop screen replacements, network setup, custom PC builds, and remote IT support. Which service are you interested in?";
        } else if (message.includes("virus removal") || message.includes("malware")) {
            return "We can perform a thorough scan and removal of viruses and malware to secure your system. Would you like to know more or book this service?";
        } else if (message.includes("data recovery") || message.includes("lost files")) {
            return "We have a high success rate in recovering lost data. It's best to bring your device for an assessment. Where are you located?";
        } else if (message.includes("slow computer") || message.includes("pc tune-up") || message.includes("speed up")) {
            return "A PC tune-up can significantly improve performance. We'll optimize settings, remove junk files, and check for issues. Interested?";
        } else if (message.includes("hardware repair") || message.includes("broken part") || message.includes("upgrade hardware")) {
            return "We repair and upgrade various hardware components like motherboards, RAM, hard drives, and graphics cards. What part are you having trouble with or looking to upgrade?";
        } else if (message.includes("windows problem") || message.includes("os issue") || message.includes("operating system")) {
            return "We can help with Windows, macOS, or Linux issues, including installations and troubleshooting. What problem are you facing?";
        } else if (message.includes("laptop screen") || message.includes("screen broken")) {
            return "Yes, we replace laptop screens. Please provide your laptop model for a more accurate quote or bring it in for our technicians to look at.";
        }

        // Pricing, Location, Hours
        else if (message.includes("price") || message.includes("cost") || message.includes("how much")) {
            return "Our repair costs depend on the specific issue and parts needed. We offer a free initial diagnosis. You can get a more detailed quote by describing your problem or bringing your device to us. Our contact details are in the footer.";
        } else if (message.includes("location") || message.includes("address") || message.includes("where are you")) {
            return "You can find our address and a map link in the 'Contact Us' section of our footer. We are located at [Your Placeholder Address].";
        } else if (message.includes("hours") || message.includes("open")) {
            return "Our business hours are Monday to Saturday, 9 AM to 6 PM. We are closed on Sundays. You can find more details in the footer or contact us.";
        }
        else {
            return "I'm sorry, I'm not sure how to answer that. Could you try rephrasing? For specific issues, it's best to contact us directly or visit our service center.";
        }
    };

    const handleChat = () => {
        if (!chatInput || !chatbox) { return; }
        const userMessageText = chatInput.value.trim();
        if (!userMessageText) return;

        const outgoingChatLi = createChatLi(userMessageText, "outgoing");
        chatbox.appendChild(outgoingChatLi);
        chatbox.scrollTop = chatbox.scrollHeight;

        chatInput.value = "";
        chatInput.style.height = "auto";

        setTimeout(() => {
            const botMessageText = getComputerServiceBotResponse(userMessageText); // Using computer service responses
            const incomingChatLi = createChatLi(botMessageText, "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTop = chatbox.scrollHeight;
        }, 600);
    };

    if (sendChatBtn && chatInput && chatbox) {
        sendChatBtn.addEventListener("click", handleChat);

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
                sendChatBtn.style.visibility = (chatInput.value.trim() !== "") ? "visible" : "hidden";
            }
        });
        if (sendChatBtn) {
            sendChatBtn.style.visibility = (chatInput && chatInput.value.trim() !== "") ? "visible" : "hidden";
        }
    } else {
        if (!sendChatBtn) console.warn("Warning: Chatbot send button not found.");
        if (!chatInput) console.warn("Warning: Chatbot input textarea not found.");
        if (!chatbox) console.warn("Warning: Chatbot chatbox ul element not found.");
    }
});