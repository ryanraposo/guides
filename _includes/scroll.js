document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a[href^='#']");
    const sections = document.querySelectorAll("h1, h2, h3");

    // Create Floating TOC
    const toc = document.createElement("div");
    toc.id = "floating-toc";
    document.body.appendChild(toc);

    sections.forEach((section) => {
        if (section.id) {
            let link = document.createElement("a");
            link.href = `#${section.id}`;
            link.innerText = section.innerText;
            link.classList.add("toc-link");
            toc.appendChild(link);
        }
    });

    // Smooth Scrolling
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight Active Section
    window.addEventListener("scroll", () => {
        let fromTop = window.scrollY + 50;

        sections.forEach(section => {
            let link = toc.querySelector(`[href="#${section.id}"]`);
            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });
});
