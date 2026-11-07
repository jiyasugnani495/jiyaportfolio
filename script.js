// =============================
// LOAD PORTFOLIO DATA
// =============================

document.addEventListener("DOMContentLoaded", function () {

    loadPortfolioData();

});


// =============================
// FETCH JSON DATA
// =============================

async function loadPortfolioData() {

    const loading = document.getElementById("loading");
    const errorMessage = document.getElementById("errorMessage");
    const portfolioContent = document.getElementById("portfolioContent");

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Unable to fetch JSON data");
        }

        const data = await response.json();

        // Render all sections
        displayPersonalInfo(data.personal);
        displayAbout(data.about);
        displaySkills(data.skills);
        displayProjects(data.projects);
        displayEducation(data.education);
        displayCertifications(data.certifications);
        displaySocialLinks(data.social);

        // Hide loading and show website
        loading.classList.add("d-none");
        portfolioContent.classList.remove("d-none");

        // Contact form
        setupContactForm(data.personal.email);

    }

    catch (error) {

        console.error("Error:", error);

        loading.classList.add("d-none");
        errorMessage.classList.remove("d-none");

    }

}


// =============================
// PERSONAL INFORMATION
// =============================

function displayPersonalInfo(personal) {

    document.getElementById("logo").innerHTML =
        `${escapeHTML(personal.name)}<span>.</span>`;

    document.getElementById("studentName").textContent =
        personal.name;

    document.getElementById("studentTitle").textContent =
        personal.title;

    document.getElementById("introduction").textContent =
        personal.introduction;

    document.getElementById("careerGoal").textContent =
        personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("aboutImage").src =
        personal.profileImage;

    document.getElementById("aboutEmail").textContent =
        personal.email;

    document.getElementById("aboutPhone").textContent =
        personal.phone;

    document.getElementById("resumeBtn").href =
        personal.resume;

    document.getElementById("footerName").textContent =
        personal.name;

    document.getElementById("copyright").textContent =
        `© ${new Date().getFullYear()} ${personal.name}. All Rights Reserved.`;

}


// =============================
// ABOUT ME
// =============================

function displayAbout(about) {

    document.getElementById("aboutTitle").textContent =
        about.title;

    document.getElementById("aboutDescription").textContent =
        about.description;

    document.getElementById("aboutCourse").textContent =
        about.course;

}


// =============================
// SKILLS
// =============================

function displaySkills(skills) {

    const container = document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(skill => {

        const percentage = Math.min(
            100,
            Math.max(0, Number(skill.level) || 0)
        );

        const skillCard = document.createElement("div");

        skillCard.className = "col-md-6 col-lg-4";

        skillCard.innerHTML = `

            <div class="skill-card">

                <div class="skill-icon">
                    <i class="${escapeHTML(skill.icon)}"></i>
                </div>

                <h4>${escapeHTML(skill.name)}</h4>

                <div class="skill-level">

                    <div class="skill-progress"
                        style="width: ${percentage}%">
                    </div>

                </div>

                <span class="skill-percentage">
                    ${percentage}% 
                </span>

            </div>

        `;

        container.appendChild(skillCard);

    });

}


// =============================
// PROJECTS
// =============================

function displayProjects(projects) {

    const container = document.getElementById("projectsContainer");

    container.innerHTML = "";

    projects.forEach(project => {

        const projectCard = document.createElement("div");

        projectCard.className = "col-md-6 col-lg-4";

        const technologies = project.technologies.map(tech => {

            return `
                <span class="tech-badge">
                    ${escapeHTML(tech)}
                </span>
            `;

        }).join("");

        projectCard.innerHTML = `

            <div class="project-card">

                <img src="${escapeHTML(project.image)}"
                    alt="${escapeHTML(project.name)}"
                    loading="lazy">

                <div class="project-body">

                    <h4>${escapeHTML(project.name)}</h4>

                    <p>${escapeHTML(project.description)}</p>

                    <div>
                        ${technologies}
                    </div>

                    <a href="${safeURL(project.link)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-link">

                        View Project
                        <i class="bi bi-arrow-up-right"></i>

                    </a>

                </div>

            </div>

        `;

        container.appendChild(projectCard);

    });

}


// =============================
// EDUCATION
// =============================

function displayEducation(education) {

    const container = document.getElementById("educationContainer");

    container.innerHTML = "";

    education.forEach(item => {

        const educationCard = document.createElement("div");

        educationCard.className = "education-card";

        educationCard.innerHTML = `

            <h4>${escapeHTML(item.course)}</h4>

            <p>
                <i class="bi bi-building"></i>
                ${escapeHTML(item.college)}
            </p>

            <p>
                <i class="bi bi-calendar"></i>
                ${escapeHTML(item.duration)}
            </p>

            <p>
                <i class="bi bi-book"></i>
                ${escapeHTML(item.semester)}
            </p>

            <p>
                <strong>Academic Details:</strong>
                ${escapeHTML(item.details)}
            </p>

        `;

        container.appendChild(educationCard);

    });

}


// =============================
// CERTIFICATIONS
// =============================

function displayCertifications(certifications) {

    const container = document.getElementById("certificationsContainer");

    container.innerHTML = "";

    certifications.forEach(certificate => {

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `

            <div class="certificate-card">

                <i class="bi bi-award-fill"></i>

                <h5>${escapeHTML(certificate.name)}</h5>

                <p>
                    Issued By:
                    ${escapeHTML(certificate.issuer)}
                </p>

                <p>
                    Year:
                    ${escapeHTML(certificate.year)}
                </p>

            </div>

        `;

        container.appendChild(card);

    });

}


// =============================
// SOCIAL MEDIA LINKS
// =============================

function displaySocialLinks(social) {

    const container = document.getElementById("socialLinks");

    container.innerHTML = "";

    social.forEach(item => {

        const link = document.createElement("a");

        link.href = safeURL(item.link);

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.setAttribute("aria-label", item.name);

        link.innerHTML = `
            <i class="${escapeHTML(item.icon)}"></i>
        `;

        container.appendChild(link);

    });

}


// =============================
// CONTACT FORM VALIDATION
// =============================

function setupContactForm(receiverEmail) {

    const form = document.getElementById("contactForm");

    const formMessage = document.getElementById("formMessage");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const subject = document.getElementById("contactSubject").value.trim();

        const message = document.getElementById("contactMessage").value.trim();

        // Check empty fields
        if (!name || !email || !subject || !message) {

            showFormMessage("Please fill in all fields.", "red");

            return;

        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showFormMessage("Please enter a valid email address.", "red");

            return;

        }

        // Basic length validation
        if (name.length > 100 || subject.length > 150 ||
            message.length > 2000) {

            showFormMessage("Please shorten your input.", "red");

            return;

        }

        // Open email application with message
        const mailSubject = encodeURIComponent(subject);

        const mailBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        const mailLink =
            `mailto:${receiverEmail}?subject=${mailSubject}&body=${mailBody}`;

        showFormMessage(
            "Your email application will open to send the message.",
            "lightgreen"
        );

        window.location.href = mailLink;

        form.reset();

    });

}


// =============================
// FORM MESSAGE
// =============================

function showFormMessage(message, color) {

    const formMessage = document.getElementById("formMessage");

    formMessage.textContent = message;

    formMessage.style.color = color;

}


// =============================
// HTML ESCAPING
// =============================

function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, character => {

        const entities = {

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"

        };

        return entities[character];

    });

}


// =============================
// SAFE URL VALIDATION
// =============================

function safeURL(value) {

    try {

        const url = new URL(value, window.location.href);

        if (["http:", "https:", "mailto:"].includes(url.protocol)) {

            return url.href;

        }

    } catch (error) {

        console.error("Invalid URL:", value);

    }

    return "#";

}