//#region PRE-LOADING START
const Loging = document.getElementById("Loging");

function BrnadAnimationFun(params) {
    // let BrandLine1 = document.querySelector(".logo-outline-1");
    // BrandLine1.style.width = "100%";
    // let BrandLine2 = document.querySelector(".logo-outline-2");
    // BrandLine2.style.width = "100%";
    // setTimeout(() => {
    //     BrandLine2.classList.add("active");
    //     BrandLine1.classList.add("active");
    // }, 700);
    // let BradndNmae = document.querySelector(".Brand-name");
    // BradndNmae.style.animation = "BrandLogoAni 1s forwards";
    // BradndNmae.style.animationDelay = "1.5s";
}

function LodoDoc(params) {
    setTimeout(() => {
        Loging.style.display = "none";
        // BRAND NAME ANIMATION 
        BrnadAnimationFun();
    }, 3000);
}
//#endregion PRE-LOADING END


//#region Theme toggle functionality - START
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");

    // Check current theme
    const currentTheme = body.getAttribute("data-theme");

    if (currentTheme === "light") {
        // Switch to dark theme
        body.removeAttribute("data-theme");
        themeIcon.className = "fas fa-moon";
        localStorage.setItem("theme", "dark");
    } else {
        // Switch to light theme
        body.setAttribute("data-theme", "light");
        themeIcon.className = "fas fa-sun";
        localStorage.setItem("theme", "light");
    }
}

// Load saved theme on page load
document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
    const themeIcon = document.getElementById("theme-icon");

    if (savedTheme === "light") {
        document.body.setAttribute("data-theme", "light");
        themeIcon.className = "fas fa-sun";
    } else {
        themeIcon.className = "fas fa-moon";
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

//#endregion Theme toggle functionality - END

//#region NAVBAR - START

document.addEventListener("DOMContentLoaded", () => {
    const toggler = document.querySelector(".navbar-toggler");
    const menu = document.getElementById("navMenu");
    toggler.addEventListener("click", () => {
        const expanded = toggler.getAttribute("aria-expanded") === "true";
        toggler.setAttribute("aria-expanded", String(!expanded));
        menu.classList.toggle("show");
    });

    function splitTextToSpans(link) {
        if (link.dataset.processed === "true") return;
        const text = link.textContent.trim();
        const fragment = document.createDocumentFragment();
        for (const char of [...text]) {
            const span = document.createElement("span");
            span.className = "char";
            span.textContent = char;
            fragment.appendChild(span);
        }
        link.textContent = "";
        link.appendChild(fragment);
        link.dataset.processed = "true";
    }

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
        splitTextToSpans(link);

        link.addEventListener("mouseenter", () => {
            link.classList.add("spinning");
            const chars = link.querySelectorAll("span.char");
            chars.forEach((char, i) => {
                char.style.animationDelay = `${i * 80}ms`;
            });
        });

        link.addEventListener("mouseleave", () => {
            link.classList.remove("spinning");
            const chars = link.querySelectorAll("span.char");
            chars.forEach((char) => {
                char.style.animationDelay = "";
                void char.offsetWidth;
            });
        });

        link.addEventListener("focus", () => {
            link.classList.add("spinning");
            const chars = link.querySelectorAll("span.char");
            chars.forEach((char, i) => {
                char.style.animationDelay = `${i * 80}ms`;
            });
        });
        link.addEventListener("blur", () => {
            link.classList.remove("spinning");
            const chars = link.querySelectorAll("span.char");
            chars.forEach((char) => {
                char.style.animationDelay = "";
                void char.offsetWidth;
            });
        });
    });
});
//#endregion NAVBAR - END


//#region PROJECT SECTION - START
// Function to create project cards
function createProjectCard(project) {
    const techChips = project.techStack
        .map((tech) => `<span class="tech-chip">${tech}</span>`)
        .join("");
    const projectLinks = `
                    <div class="project-link-container" role="region">
                    <a href="${project.githubLink}" class="chip" role="link">
                        <i class="fas fa-code"></i>
                        Source Code
                    </a>
                    <a href="${project.liveLink}" class="chip" role="link">
                        <i class="fas fa-globe"></i>
                        Live Demo
                    </a>
                    </div>
    `;
    return `
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="project-card">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="tech-label">Technologies Used:</div>
                        <div class="tech-stack">
                            ${techChips}
                        </div>
                        ${projectLinks}
                    </div>
                </div>
            `;
}

// Function to render all projects
function renderProjects() {
    const container = document.getElementById("projectsContainer");
    container.innerHTML = projects
        .map((project) => createProjectCard(project))
        .join("");
}

// Initialize projects when page loads
document.addEventListener("DOMContentLoaded", function () {
    renderProjects();
});
//#endregion END


//#region SOSIAL LINK - START
const socialLinks = [
    {
        href: "https://github.com/nareshsuthardev/",
        class: "github",
        title: "GitHub",
        iconClass: "fab fa-github"
    },
    {
        href: "https://www.linkedin.com/in/naresh-suthar-dev/",
        class: "linkedin",
        title: "LinkedIn",
        iconClass: "fab fa-linkedin-in"
    },
    //   {
    //     href: "#",
    //     class: "twitter",
    //     title: "Twitter",
    //     iconClass: "fab fa-twitter"
    //   },
    {
        href: "#",
        class: "instagram",
        title: "Instagram",
        iconClass: "fab fa-instagram"
    },
    {
        href: "#",
        class: "email",
        title: "Email",
        iconClass: "fas fa-envelope"
    }
];

const container = document.querySelector('.footer-right');

socialLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.className = `social-link ${link.class}`;
    a.title = link.title;

    const icon = document.createElement('i');
    icon.className = link.iconClass;

    a.appendChild(icon);
    container.appendChild(a);
});

//#endregion SOSIAL LINK - END



//#region SKILL - START

const webTechSkills = [
    { name: "JavaScript", iconClass: "fab fa-js-square", skillClass: "js" },
    { name: "Angular", iconClass: "fab fa-angular", skillClass: "angular" },
    { name: ".Net Core", src: "./image/Skill/dotnet.svg", iconClass: "dotnet", skillClass: "dotnet" },
    { name: "React", iconClass: "fab fa-react", skillClass: "react" },
    { name: "C#", src: "./image/Skill/CSharp.svg", iconClass: "CSharp", skillClass: "CSharp" },
    { name: "C++", src: "./image/Skill/CPlusPlus.svg", iconClass: "Ionic", skillClass: "CPlusPlus" },
    { name: "PHP", iconClass: "fab fa-php", skillClass: "php" },
    { name: "HTML5", iconClass: "fab fa-html5", skillClass: "html" },
    { name: "CSS3", iconClass: "fab fa-css3-alt", skillClass: "css" },
    { name: "Bootstrap", iconClass: "fab fa-bootstrap", skillClass: "bootstrap" }
];

const webTechSkillsGrid = document.querySelector('.web-tech-grid');

webTechSkills.forEach(skill => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';

    let icon;
    if (skill.src) {
        icon = document.createElement('img');
        icon.src = skill.src;
        icon.alt = skill.name;
        icon.className = 'SkillImg';
    } else {
        icon = document.createElement('i');
        icon.className = `${skill.iconClass} skill-icon ${skill.skillClass}`;
    }

    const name = document.createElement('div');
    name.className = 'skill-name';
    name.textContent = skill.name;

    skillItem.appendChild(icon);
    skillItem.appendChild(name);
    webTechSkillsGrid.appendChild(skillItem);
});


//#region MOBILE TECH SKILLS SECTION - START
const MobileTechs = [
    { name: "Ionic", src: "./image/Skill/ionic.svg", iconClass: "Ionic", skillClass: "Ionic" },
    { name: "React Native", iconClass: "fab fa-react", skillClass: "react-native" },
    { name: "Capacitor", src: "./image/Skill/Capacitor.svg", iconClass: "Ionic", skillClass: "Capacitor" },
    { name: "Redux", src: "./image/Skill/Redux.svg", iconClass: "Redux", skillClass: "Redux" },
    { name: "Android Studio", src: "./image/Skill/AndroidStudio.svg", iconClass: "AndroidStudio", skillClass: "AndroidStudio" },
    // { name: "Xcode", src: "./image/Skill/Xcode.svg", iconClass: "Xcode", skillClass: "Xcode" },
    { name: "Java", iconClass: "fab fa-java", skillClass: "java" }
];

const MobileTechGrid = document.querySelector('.mobile-tech-grid');

MobileTechs.forEach(skill => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';

    let icon;
    if (skill.src) {
        icon = document.createElement('img');
        icon.src = skill.src;
        icon.alt = skill.name;
        icon.className = 'SkillImg';
    } else {
        icon = document.createElement('i');
        icon.className = `${skill.iconClass} skill-icon ${skill.skillClass}`;
    }

    const name = document.createElement('div');
    name.className = 'skill-name';
    name.textContent = skill.name;

    skillItem.appendChild(icon);
    skillItem.appendChild(name);
    MobileTechGrid.appendChild(skillItem);
});
//#endregion MOBILE TECH SKILLS SECTION - END


//#region OTHERS TECH SKILLS SECTION - START
const OtherTechsSkills = [
    { iconClass: "fab fa-git-alt", skillClass: "git", name: "Git" },
    { iconClass: "fas fa-fire", skillClass: "firebase", name: "Firebase" },
    { iconClass: "fas fa-leaf", skillClass: "mongodb", name: "MongoDB" },
    { iconClass: "fas fa-database", skillClass: "mysql", name: "SQL" },
    { name: "Node.js", iconClass: "fab fa-node-js", skillClass: "node" },
    { iconClass: "fab fa-python", skillClass: "python", name: "Python" },
    { iconClass: "fab fa-docker", skillClass: "docker", name: "Docker" },
];

const OtherTechsSkillsGrid = document.querySelector('.other-tech-grid');

OtherTechsSkills.forEach(skill => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';

    const icon = document.createElement('i');
    icon.className = `${skill.iconClass} skill-icon ${skill.skillClass}`;

    const name = document.createElement('div');
    name.className = 'skill-name';
    name.textContent = skill.name;

    skillItem.appendChild(icon);
    skillItem.appendChild(name);
    OtherTechsSkillsGrid.appendChild(skillItem);
});
//#endregion OTHER TECH SKILLS SECTION - END

//#endregion SKILL - END

let buttonToggle = () => {
    const button = document.getElementById("menu-button").classList,
        isopened = "is-opened";
    let isOpen = button.contains(isopened);
    if (isOpen) {
        button.remove(isopened);
    }
    else {
        button.add(isopened);
    }
}










