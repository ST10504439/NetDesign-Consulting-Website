document.addEventListener("DOMContentLoaded", () => {
const servicesData = [
    {
        title: "Web Design",
        icon: "fas fa-globe",
        description: "Modern, responsive and user-friendly websites for your business."
    }, 
    {
        title: "Network Setup",
        icon: "fas fa-network-wired",
        description: "Professional network installation and maintenance solutions."
    },
    {
        title: "Cyber Security",
        icon: "fas fa-shield-halved",
        description: "Protect your systems and business data from cyber threats."
    },
    {
        title: "Cloud Solutions",
        icon: "fas fa-cloud",
        description: "Secure cloud migration and cloud-based infrastructure services."
    }
];

const container = document.getElementById("dynamic-services-container");
const searchInput = document.getElementById("services-search");
const sortSelect = document.getElementById("services-sort");

function displayServices(data) {
    container.innerHTML = ""; 
    
    if (data.length === 0) {
        container.innerHTML = `<p style="text-align:center; grid-column: 1/-1; color: #666;">No services found matching your criteria.</p>`;
        return;
    }

    data.forEach(service => {
        const card = document.createElement("div");
        card.className = "service-card reveal-element visible"; 
        
        card.innerHTML = `
            <i class="${service.icon}"></i>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        container.appendChild(card);
    });
}

function filterAndSortServices() {
    let query = searchInput.value.toLowerCase();
    let sortValue = sortSelect.value;

    let processedData = servicesData.filter(service => {
        return service.title.toLowerCase().includes(query) || 
               service.description.toLowerCase().includes(query);
    });

    if (sortValue === "asc") {
        processedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "desc") {
        processedData.sort((a, b) => b.title.localeCompare(a.title));
    }

    displayServices(processedData);
}

searchInput.addEventListener("input", filterAndSortServices);
sortSelect.addEventListener("change", filterAndSortServices);

displayServices(servicesData);

    const cards = document.querySelectorAll(".service-card, .team-card, .about-image, .about-content");
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.classList.add("reveal-element");
        revealObserver.observe(card);
    });

    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    
    const lightboxImg = document.createElement("img");
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    const interactableImages = document.querySelectorAll(".team-card img, .about-image img");
    interactableImages.forEach(img => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden"; 
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    const contactContainer = document.querySelector(".contact-container");
    if (contactContainer) {
        const mapDiv = document.createElement("div");
        mapDiv.id = "map";
        contactContainer.after(mapDiv); 

        const lat = -26.1034; 
        const lng = 28.0935; 

        const map = L.map('map').setView([lat, lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
            .bindPopup('<b>NetDesign Consulting (Pty) Ltd</b><br>1494 Roosevelt Street')
            .openPopup();
    }
    
const clientContactForm = document.getElementById("contactForm");

if (clientContactForm) {
    clientContactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // HALT unsafe fallback pipeline defaults
        
        const inputNameField = document.getElementById("contactName").value.trim();
        const inputEmailField = document.getElementById("contactEmail").value.trim();
        const inputMessageField = document.getElementById("contactMessage").value.trim();
        
        const sanitizeInputData = (inputString) => {
            return inputString.replace(/[&<>"']/g, (matchedEntity) => {
                const entityMapping = {
                    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;'
                };
                return entityMapping[matchedEntity];
            });
        };

        const securedName = sanitizeInputData(inputNameField);
        const securedEmail = sanitizeInputData(inputEmailField);
        const securedMessage = sanitizeInputData(inputMessageField);

        if (securedName.length < 2 || securedMessage.length < 10) {
            alert("Please supply complete submission parameters prior to attempting transit routing verification.");
            return false;
        }

        console.log("Transmission parameters verified and secured payload constructed safely:", {
            clientName: securedName,
            clientRoutingPath: securedEmail,
            payloadContext: securedMessage
        });
        
        alert("Thank you. Your message has been safely processed.");
        clientContactForm.reset();
    });
}

    const invalidateField = (inputElement, errorElement, msg) => {
        inputElement.classList.add("invalid-field");
        errorElement.textContent = msg;
        return false;
    };

    const resetFieldStatus = (inputElement, errorElement) => {
        inputElement.classList.remove("invalid-field");
        errorElement.textContent = "";
    };

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Halt standard browser refresh action
            let isFormValid = true;

            const name = document.getElementById("contactName");
            const email = document.getElementById("contactEmail");
            const type = document.getElementById("messageType");
            const message = document.getElementById("contactMessage");
            const statusBox = document.getElementById("formStatus");

            if (name.value.trim().length < 2) {
                isFormValid = invalidateField(name, document.getElementById("nameError"), "Name must exceed 2 characters.");
            } else { resetFieldStatus(name, document.getElementById("nameError")); }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                isFormValid = invalidateField(email, document.getElementById("emailError"), "Please state a valid email structure.");
            } else { resetFieldStatus(email, document.getElementById("emailError")); }

            if (!type.value) {
                isFormValid = invalidateField(type, document.getElementById("typeError"), "Please categorize your message context.");
            } else { resetFieldStatus(type, document.getElementById("typeError")); }

            if (message.value.trim().length < 10) {
                isFormValid = invalidateField(message, document.getElementById("messageError"), "Messages must exceed 10 contextual characters.");
            } else { resetFieldStatus(message, document.getElementById("messageError")); }

            if (!isFormValid) return;

            statusBox.className = "form-status success";
            statusBox.textContent = "Processing transmission securely via AJAX...";
            statusBox.style.display = "block";

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok || response.status === 0) {
                    statusBox.className = "form-status success";
                    statusBox.textContent = "Success! General message compiled and routed securely via email simulation.";
                    contactForm.reset();
                } else {
                    throw new Error("Server transmission error code verified.");
                }
            } catch (err) {
                statusBox.className = "form-status error";
                statusBox.textContent = "Network Pipeline Failure: Unable to complete asynchronous submission transmission.";
            }
        });
    }

    const enquiryForm = document.getElementById("enquiryForm");
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            let isFormValid = true;

            const name = document.getElementById("enquiryName");
            const phone = document.getElementById("enquiryPhone");
            const service = document.getElementById("enquiryService");
            const date = document.getElementById("enquiryDate");
            const statusBox = document.getElementById("enquiryStatus");

            if (name.value.trim().length === 0) {
                isFormValid = invalidateField(name, document.getElementById("enqNameError"), "Identifiable entity tag required.");
            } else { resetFieldStatus(name, document.getElementById("enqNameError")); }

            const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{9,10}$/;
            if (!phoneRegex.test(phone.value.trim())) {
                isFormValid = invalidateField(phone, document.getElementById("enqPhoneError"), "Provide valid numeric contact sequence.");
            } else { resetFieldStatus(phone, document.getElementById("enqPhoneError")); }

            if (!service.value) {
                isFormValid = invalidateField(service, document.getElementById("enqServiceError"), "You must nominate a specific service solution category.");
            } else { resetFieldStatus(service, document.getElementById("enqServiceError")); }

            if (!date.value) {
                isFormValid = invalidateField(date, document.getElementById("enqDateError"), "Please specify target delivery timeframe windows.");
            } else { resetFieldStatus(date, document.getElementById("enqDateError")); }

            if (!isFormValid) return;
 
            statusBox.className = "form-status success";
            statusBox.textContent = "Calculating service availability constraints via AJAX...";
            statusBox.style.display = "block";

            try {
                const formData = new FormData(enquiryForm);
                const response = await fetch(enquiryForm.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok || response.status === 0) {
                    statusBox.className = "form-status success";
                    statusBox.textContent = `Enquiry Verified! System estimate generated: Solution allocated for availability on ${date.value}.`;
                    enquiryForm.reset();
                } else { throw new Error("Endpoint verification block failed."); }
            } catch (err) {
                statusBox.className = "form-status error";
                statusBox.textContent = "Failed to synchronize parameters with external database management array endpoints.";
            }
        });
    }
});

});
