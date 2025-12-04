// components.js
class CustomHeader extends HTMLElement {
    constructor() {
        super();
        this.handleScroll = this.handleScroll.bind(this);
        this.staticHeader = null;
        this.fixedHeader = null;
        this.staticHeaderHeight = 0;
    }

    connectedCallback() {
        this.render();
        this.cacheElements();
        this.calculateHeights();
        this.addEventListeners();
        this.handleScroll();
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }

    cacheElements() {
        this.staticHeader = this.querySelector('.header-static');
        this.fixedHeader = this.querySelector('.header-fixed');
    }

    calculateHeights() {
        if (this.staticHeader) {
            this.staticHeaderHeight = this.staticHeader.offsetHeight;
        }
    }

    handleScroll() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > this.staticHeaderHeight) {
            this.fixedHeader.classList.add('visible');
        } else {
            this.fixedHeader.classList.remove('visible');
        }
    }

    handleResize = () => {
        this.calculateHeights();
    }

    addEventListeners() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        window.addEventListener('resize', this.handleResize);
    }

    render() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                .header-static {
                    position: static;
                    top: 0;
                    left: 0;
                    width: 100dvw;
                    background-color: var(--secondary-color-opacity85);
                    padding: 1rem 0;
                    z-index: 1000;
                    transition: opacity 0.3s ease;
                }
                
                .header-fixed {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background-color: var(--secondary-color-opacity85);
                    padding: 0.5rem 0;
                    z-index: 1001;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .header-fixed.visible {
                    transform: translateY(0);
                    opacity: 1;
                }
                
                .container {
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: var(--text-color);
                    text-decoration: none;
                }
                
                .logo span {
                    color: var(--secondary-color-opacity85);
                    text-shadow: 
                        1px 1px 0 var(--highlight-color),
                        -1px 1px 0 var(--highlight-color),
                        1px -1px 0 var(--highlight-color),
                        -1px -1px 0 var(--highlight-color),
                        0px 1px 0 var(--highlight-color),
                        0px -1px 0 var(--highlight-color),
                        1px 0px 0 var(--highlight-color),
                        -1px 0px 0 var(--highlight-color);
                }
                
                .nav-links {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                
                .nav-links li {
                    margin-left: 2rem;
                }
                
                .nav-links a {
                    color: var(--text-color);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s;
                    position: relative;
                }
                
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -5px;
                    left: 0;
                    background-color: var(--highlight-color);
                    transition: width 0.3s ease;
                }
                
                .nav-links a:hover::after {
                    width: 100%;
                }
                
                .mobile-menu {
                    display: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--text-color);
                    background: none;
                    border: none;
                }

                .header-fixed .logo {
                    font-size: 1.5rem;
                }
                
                .header-fixed .nav-links li {
                    margin-left: 1.5rem;
                }

                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                    .mobile-menu {
                        display: block;
                    }
                    
                    .header-static {
                        padding: 0.8rem 0;
                    }
                    
                    .header-fixed {
                        padding: 0.4rem 0;
                    }
                }
            </style>
            
            <header class="header-static">
                <div class="container nav-container">
                    <a href="/" class="logo">Isaque<span>Santos</span></a>
                    <ul class="nav-links">
                        <li><a href="/#portfolio">Portfólio</a></li>
                        <li><a href="about.html">Sobre</a></li>
                        <li><a href="#contact">Contato</a></li>
                    </ul>
                    <button class="mobile-menu">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </header>
            
            <header class="header-fixed">
                <div class="container nav-container">
                    <a href="/" class="logo">Isaque<span>Santos</span></a>
                    <ul class="nav-links">
                        <li><a href="/#portfolio">Portfólio</a></li>
                        <li><a href="about.html">Sobre</a></li>
                        <li><a href="#contact">Contato</a></li>
                    </ul>
                    <button class="mobile-menu">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </header>
        `;
    }
}

class CustomCategoryCard extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>
                .category {
                    position: relative;
                }
                .category-content {
                    padding: 4rem calc(100dvw/12*1);
                    text-align: left;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: calc(100dvw/12*1);
                    .category-title {
                        font-size: 2.5rem;
                        font-weight: normal;
                        text-transform: uppercase;
                        margin-bottom: 1rem;
                        font-family: var(--font-title);
                    }
                    
                    .category-description {
                        font-size: 1.25rem;
                        color: var(--light-gray);
                        font-family: var(--font-text);
                        text-transform: normal;
                        line-height: 1.5rem;
                    }
                    
                    .arrow {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        width: 3rem;
                        height: 3rem;
                        color: var(--text-color);
                    }

                    .arrow-left {
                        left: calc(100dvw/12*1 - 3.5rem);
                    }

                    .arrow-right {
                        right: calc(100dvw/12*1 - 3.5rem);
                    }

                    img {
                        background-color: var(--highlight-color);
                        width: calc(100dvw/12*4);
                        aspect-ratio: 16/9;
                        object-fit: cover;
                        border-radius: 8px;
                    }
                }
                .category-content:hover {
                    padding-right: calc(100dvw/12*1);
                    transition: transform 0.3s ease;
                    .arrow {
                        opacity: 1;
                    }

                    .arrow-left {
                        animation: bouncex 2s infinite;
                    }

                    .arrow-right {
                        animation: bouncexreverse 2s infinite;
                    }

                    a {
                        text-decoration: none;
                        border-radius: 8px;
                        aspect-ratio: 16/9;
                        align-items: center;
                        justify-content: center;
                    }

                }
            </style>
            <div class="category">
                <div class="line"></div>
                <div class="category-content">
                    <div class="category-text">
                        <p class="category-title">${this.getAttribute('data-title')}</p>
                        <p class="category-description">${this.getAttribute('data-description')}</p>
                    </div>
                    <a href=${this.getAttribute('data-link')}><img src=${this.getAttribute('data-image')} alt=""></a>
                    <svg class="arrow arrow-right" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M96 160C78.3 160 64 174.3 64 192C64 209.7 78.3 224 96 224L304 224L304 160L96 160zM256 352C238.3 352 224 366.3 224 384C224 401.7 238.3 416 256 416L320 416C337.7 416 352 401.7 352 384C352 366.3 337.7 352 320 352L256 352zM192 288C192 305.7 206.3 320 224 320L272 320C289.7 320 304 305.7 304 288C304 270.3 289.7 256 272 256L224 256C206.3 256 192 270.3 192 288zM288 448C270.3 448 256 462.3 256 480C256 497.7 270.3 512 288 512L352 512C369.7 512 384 497.7 384 480C384 462.3 369.7 448 352 448L288 448zM376 352L375.4 352C380.8 361.4 384 372.3 384 384C384 397.2 380 409.4 373.2 419.6C398.1 428.3 416 452.1 416 480C416 491.7 412.9 502.6 407.4 512L416 512C504.4 512 576 440.4 576 352L576 290.3C576 247.9 559.1 207.2 529.1 177.2L517.5 165.6C493.5 141.5 460.9 128 427 128L400 128C364.7 128 336 156.7 336 192L336 280C336 302.1 353.9 320 376 320C398.1 320 416 302.1 416 280L416 224C416 215.2 423.2 208 432 208C440.8 208 448 215.2 448 224L448 280C448 319.8 415.8 352 376 352z"/></svg>
                </div>
            </div>
        `;
    }
}

class CustomContact extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>
                .contact {
                    padding: 3rem 0;
                    background-color: var(--primary-color);
                    font-family: var(--font-text);
                }

                .section-title {
                    text-align: center;
                    font-size: 5rem;
                    margin-bottom: 2rem;
                    text-transform: uppercase;
                    font-family: var(--font-title);
                    line-height: 5.5rem;
                }

                .contact-content {
                    display: flex;
                    gap: 3rem;
                }

                .contact-info {
                    flex: 1;
                }

                .contact-info h3 {
                    font-size: 1.8rem;
                    margin-bottom: 1.5rem;
                }

                .contact-info p {
                    margin-bottom: 1.5rem;
                    color: var(--light-gray);
                }

                .contact-details {
                    margin-top: 2rem;
                    text-align: center;
                }

                .social-links {
                    display: flex;
                    justify-content: center;
                }

                .social-link {
                    color: var(--text-color);
                    font-size: 4rem;
                    margin-right: 1rem;
                    transition: color 0.3s;
                    text-decoration: none;
                }
            </style>
            <section class="contact" id="contact">
                <div class="container">
                    <div class="contact-content">
                        <div class="contact-info">
                            <h2 class="section-title">Entre em <br/> Contato</h2>
                            <div class="contact-details">
                                <div class="social-links">
                                    <a href="#" class="social-link"><i class="fa-brands fa-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                footer {
                    background-color: var(--primary-color);
                    padding: 0 0;
                    text-align: center;
                    position: relative;
                    z-index: 100;
                }
                .copyright {
                    color: var(--light-gray);
                    font-size: 0.9rem;
                }
            </style>
            <footer>
                <div class="container">
                    <p class="copyright">&copy; por Giovana Hatten em 2025. Todos os direitos reservados.</p>
                </div>
            </footer>
        `;
    }
}

class CustomCategory extends HTMLElement {
    static get observedAttributes() { return ['video-list']; }

    connectedCallback() {
        this.render();
        this.setupScrollTopButton();
        this.setActiveButton();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'video-list' && oldValue !== newValue) this.render();
    }

    render() {
        let videos = [];
        try {
            videos = JSON.parse(this.getAttribute('video-list') || '[]');
        } catch (e) {
            videos = [];
            console.error('Error parsing video list:', e);
        }

        this.innerHTML = `
            <style>
                .bg-draw, .bg-draw-inner { pointer-events: none; }
                .category-head { user-select: text; -webkit-user-select: text; -moz-user-select: text; }
                .category-head h1, .category-head .text { user-select: text; -webkit-user-select: text; -moz-user-select: text; }
                
                .quicknav-container {
                    text-align: center;
                    margin-top: 2rem;
                    p {
                    font-weight: bold;
                    }
                }

                .quicknav-section {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1.5rem;
                    margin: 3rem 0;
                    padding: 0 2rem;
                    flex-wrap: wrap;
                }

                .nav-button {
                    padding: 1rem 2.5rem;
                    background-color: transparent;
                    color: var(--text-color);
                    border: 2px solid var(--secondary-color);
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                    font-family: var(--font-text);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    position: relative;
                    overflow: hidden;
                    white-space: nowrap;
                    width: auto;
                    min-width: fit-content;
                }

                .nav-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background-color: var(--highlight-color);
                    transition: left 0.3s ease;
                    z-index: -1;
                }

                .nav-button:hover::before {
                    left: 0;
                }

                .nav-button:hover {
                    border-color: var(--highlight-color);
                    transform: translateY(-3px);
                    box-shadow: 0 5px 20px rgba(255, 107, 53, 0.3);
                }

                .nav-button.active {
                    background-color: var(--highlight-color);
                    border-color: var(--highlight-color);
                    pointer-events: none;
                }

                .scroll-top-container {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: 1000;
                }

                .scroll-top-button {
                    width: 60px;
                    height: 60px;
                    background-color: var(--secondary-color);
                    border: 2px solid var(--highlight-color);
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    opacity: 0;
                    pointer-events: none;
                    transform: translateY(20px);
                }

                .scroll-top-button.visible {
                    opacity: 1;
                    pointer-events: all;
                    transform: translateY(0);
                }

                .scroll-top-button:hover {
                    background-color: var(--highlight-color);
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
                }

                .scroll-top-button svg {
                    width: 28px;
                    height: 28px;
                    fill: var(--text-color);
                }

                @media (max-width: 768px) {
                    .quicknav-section {
                        flex-wrap: wrap;
                        gap: 1rem;
                        margin: 2rem 0;
                    }

                    .nav-button {
                        padding: 0.75rem 1.5rem;
                        font-size: 0.9rem;
                    }

                    .scroll-top-button {
                        width: 50px;
                        height: 50px;
                        bottom: 1.5rem;
                        right: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .quicknav-section {
                        flex-direction: column;
                        width: 100%;
                    }

                    .nav-button {
                        width: 100%;
                        text-align: center;
                    }
                }
            </style>

            <div class="category-section-vertical portfolio">
                <div class="bg-draw">
                    <div class="bg-draw-inner">
                    </div>
                </div>
                <div class="category-head">
                    <h1>${this.getAttribute('categoryTitle')}</h1>
                    <p class="text">${this.getAttribute('text')}</p>
                </div>
                <div class="quicknav-container">
                    <p>Veja meus outros projetos!!!</p>
                    <div class="quicknav-section">
                        ${this.generateNavButtons()}
                    </div>
                </div>

                <div class="video-list-container">
                    <div class="video-grid">
                        ${this.generateVideoGrid()}
                    </div>
                </div>

                <div class="scroll-top-container">
                    <button class="scroll-top-button" id="scrollTopBtn">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 4l-8 8h5v8h6v-8h5z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    generateNavButtons() {
        let pages = [];
        try {
            pages = JSON.parse(this.getAttribute('pages') || '[]');
        } catch (e) {
            return '';
        }

        return pages.map(page => `
            <a href="${page.url}" class="nav-button ${this.isCurrentPage(page.url) ? 'active' : ''}">
                ${page.label}
            </a>
        `).join('');
    }

    isCurrentPage(url) {
        const currentPath = window.location.pathname;
        const pagePath = url.split('/').pop();
        return currentPath.endsWith(pagePath) || (currentPath === '/' && url === 'index.html');
    }

    setActiveButton() {
        setTimeout(() => {
            const buttons = this.querySelectorAll('.nav-button');
            buttons.forEach(button => {
                if (button.classList.contains('active')) {
                    button.style.cursor = 'default';
                }
            });
        }, 100);
    }

    setupScrollTopButton() {
        setTimeout(() => {
            const scrollTopBtn = this.querySelector('#scrollTopBtn');
            if (!scrollTopBtn) return;

            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });

            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }, 100);
    }

    generateVideoGrid() {
        let videos = [];
        try {
            videos = JSON.parse(this.getAttribute('video-list') || '[]');
        } catch (e) {
            videos = [];
            console.error('Error parsing video list:', e);
        }

        return videos.map(video => {
            const isHorizontal = String((video.orientation || '')).toLowerCase() === 'horizontal';
            let src = video.videoUrl || '';
            return `
                <div class="video-card${isHorizontal ? ' horizontal-card' : ''}">
                    <div class="video-thumbnail-wrapper">
                        <div class="video-thumbnail ${isHorizontal ? 'horizontal' : 'vertical'}">
                            ${video.videoUrl ? `<iframe title="vimeo-player" src="${src}" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>` : ''}
                            ${video.onGoingImg ? `<img class="video-ongoing-img" src="${video.onGoingImg}" alt="Ongoing">` : ''}
                        </div>
                    </div>
                    <div class="video-content">
                        <h3 class="video-title">${video.title || ''}</h3>
                        <p class="video-role">${(video.roles || []).join(', ')}</p>
                        <p class="video-year">${video.year || ''}</p>
                    </div>
                </div>
            `;
        }).join('');
    }
}

customElements.define('custom-contact', CustomContact);
customElements.define('custom-header', CustomHeader);
customElements.define('custom-footer', CustomFooter);
customElements.define('custom-category-card', CustomCategoryCard);
customElements.define('custom-category', CustomCategory);