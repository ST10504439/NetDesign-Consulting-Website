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

});
