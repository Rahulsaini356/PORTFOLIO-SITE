// Portfolio JavaScript - Ultra Futuristic Hi-Tech

// EmailJS Configuration - ADDED FOR EMAIL FUNCTIONALITY

// Portfolio JavaScript - Ultra Futuristic Hi-Tech

// ✅ EmailJS Configuration
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_6vj14le',
    TEMPLATE_ID: 'template_ua3p7vg',
    PUBLIC_KEY: '_Drc-QHIIMitkVImi',
};

// ✅ Initialize all components on load
document.addEventListener('DOMContentLoaded', function() {
    initCursor();
    initParticles();
    initLoader();
    initScrollAnimations();
    initHero3D();
    initDashboard3D();
    initFormInteractions();
    initNavigation();
    console.log('🚀 Rahul Saini Portfolio - Initialized');
});

// ================== EMAILJS FUNCTIONS ==================

// Initialize EmailJS
function initEmailJS() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('📧 EmailJS initialized');
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('span').textContent;

    // Prepare data
    const formData = {
        from_name: form.name.value,
        reply_to: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
        to_name: 'Rahul Saini'
    };

    // Validate form
    if (!validateForm(formData)) {
        showNotification('Please fill all fields correctly ⚠️', 'error');
        return;
    }

    try {
        setButtonLoading(submitBtn, true);

        // ✅ Send using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            formData,
            EMAILJS_CONFIG.PUBLIC_KEY
        );

        console.log('✅ Email sent successfully:', response);
        showSuccessAnimation();
        showNotification('Message sent successfully! 🚀', 'success');
        form.reset();

        // Reset UI lines
        document.querySelectorAll('.form-group').forEach(group => {
            const inputLine = group.querySelector('.input-line');
            if (inputLine) {
                gsap.to(inputLine, { width: '0%', duration: 0.3, ease: 'power2.out' });
            }
        });
    } catch (error) {
        console.error('❌ Email send failed:', error);
        showNotification('Failed to send message. Please try again.', 'error');
        showErrorAnimation();
    } finally {
        setButtonLoading(submitBtn, false, originalText);
    }
}

// Bind form events
function initFormInteractions() {
    initEmailJS();
    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll('.form-input');
    if (!form) return;
    form.addEventListener('submit', handleFormSubmit);

    // Input animations
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input.parentElement.querySelector('.input-line'), { width: '100%', duration: 0.3, ease: 'power2.out' });
            gsap.to(input, { boxShadow: '0 0 20px var(--primary-color), 0 0 40px var(--primary-color)', duration: 0.3, ease: 'power2.out' });
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                gsap.to(input.parentElement.querySelector('.input-line'), { width: '0%', duration: 0.3, ease: 'power2.out' });
            }
            gsap.to(input, { boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)', duration: 0.3, ease: 'power2.out' });
        });
    });
}


// Custom Cursor with Magnetic Effect
function initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0,
        mouseY = 0;
    let cursorX = 0,
        cursorY = 0;

    // Mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.1;
        cursorY += dy * 0.1;

        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Magnetic effect on interactive elements
    const magneticElements = document.querySelectorAll('button, a, .project-card, .glass-card');

    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursorGlow.style.opacity = '1';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursorGlow.style.opacity = '0.7';
        });
    });
}

// Particle Background System
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;
    const particles = [];

    class Particle {
        constructor() {
            this.element = document.createElement('div');
            this.reset();
            this.setupElement();
            container.appendChild(this.element);
        }

        reset() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.hue = Math.random() * 60 + 180; // Blue to cyan range
        }

        setupElement() {
            this.element.style.position = 'absolute';
            this.element.style.width = this.size + 'px';
            this.element.style.height = this.size + 'px';
            this.element.style.backgroundColor = `hsl(${this.hue}, 100%, 50%)`;
            this.element.style.borderRadius = '50%';
            this.element.style.pointerEvents = 'none';
            this.element.style.boxShadow = `0 0 ${this.size * 2}px hsl(${this.hue}, 100%, 50%)`;
            this.element.style.opacity = this.opacity;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around screen
            if (this.x < 0) this.x = window.innerWidth;
            if (this.x > window.innerWidth) this.x = 0;
            if (this.y < 0) this.y = window.innerHeight;
            if (this.y > window.innerHeight) this.y = 0;

            // Update position
            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;

            // Pulsing effect
            const pulse = Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.3 + 0.7;
            this.element.style.opacity = this.opacity * pulse;
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animateParticles() {
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Resize handler
    window.addEventListener('resize', () => {
        particles.forEach(particle => {
            if (particle.x > window.innerWidth) particle.x = window.innerWidth;
            if (particle.y > window.innerHeight) particle.y = window.innerHeight;
        });
    });
}

// Loading Screen Animation
function initLoader() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    const messages = ['INITIALIZING...', 'LOADING ASSETS...', 'CONNECTING...', 'ALMOST READY...'];
    let messageIndex = 0;

    // Animate progress bar
    setTimeout(() => {
        loadingProgress.style.width = '100%';
    }, 500);

    // Change loading messages
    const messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        loadingText.textContent = messages[messageIndex];
    }, 750);

    // Hide loading screen
    setTimeout(() => {
        clearInterval(messageInterval);
        loadingScreen.classList.add('hidden');

        // Start hero animations
        gsap.from('.hero-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });

        gsap.from('.hero-subtitle', {
            duration: 1.2,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 1
        });

        gsap.from('.hero-3d-container', {
            duration: 2,
            scale: 0,
            rotation: 180,
            opacity: 0,
            ease: 'back.out(1.7)',
            delay: 1.2
        });
    }, 3000);
}

// GSAP Scroll Animations
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Section fade-ins
    gsap.utils.toArray('section:not(.hero)').forEach((section, i) => {
        gsap.from(section, {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Skills animation
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        gsap.to(bar, {
            width: targetWidth,
            duration: 2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Project cards stagger animation
    gsap.from('.project-card', {
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Timeline animation
    gsap.from('.timeline-item', {
        duration: 0.8,
        x: -100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Interest chips animation
    gsap.from('.interest-chip', {
        duration: 0.6,
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.interests-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Parallax effect for background elements
    gsap.to('#particles-container', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Hero 3D Scene with Three.js
function initHero3D() {
    const container = document.getElementById('hero-3d-scene');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create holographic cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const edges = new THREE.EdgesGeometry(geometry);

    // Wireframe material with glow effect
    const material = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.8
    });
    const wireframeCube = new THREE.LineSegments(edges, material);
    scene.add(wireframeCube);

    // Add inner rotating elements
    const innerGeometry = new THREE.OctahedronGeometry(1, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0x8a2be2,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const innerShape = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerShape);

    // Particle system inside cube
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 4;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00ffff,
        size: 0.05,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0,
        mouseY = 0;
    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouseX = (event.clientX - rect.left - rect.width / 2) / rect.width;
        mouseY = (event.clientY - rect.top - rect.height / 2) / rect.height;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate objects
        wireframeCube.rotation.x += 0.01;
        wireframeCube.rotation.y += 0.01;
        innerShape.rotation.x -= 0.02;
        innerShape.rotation.y -= 0.01;
        particles.rotation.y += 0.005;

        // Mouse interaction
        wireframeCube.rotation.y += mouseX * 0.01;
        wireframeCube.rotation.x += mouseY * 0.01;

        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Dashboard 3D Scene - Premium Animation
function initDashboard3D() {
    const container = document.getElementById('dashboard-3d-scene');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create holographic Earth/Sphere
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);

    // Create wireframe sphere
    const wireframeGeometry = new THREE.WireframeGeometry(sphereGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.6
    });
    const wireframeSphere = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeSphere);

    // Create rotating rings
    const ringGeometry = new THREE.RingGeometry(2.5, 2.7, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x8a2be2,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
    });

    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    const ring3 = new THREE.Mesh(ringGeometry, ringMaterial.clone());

    ring1.rotation.x = Math.PI / 2;
    ring2.rotation.y = Math.PI / 3;
    ring3.rotation.z = Math.PI / 4;

    scene.add(ring1);
    scene.add(ring2);
    scene.add(ring3);

    // Data nodes floating around
    const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const nodes = [];

    for (let i = 0; i < 20; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
        const angle = (i / 20) * Math.PI * 2;
        const radius = 4 + Math.random() * 2;

        node.position.x = Math.cos(angle) * radius;
        node.position.y = (Math.random() - 0.5) * 4;
        node.position.z = Math.sin(angle) * radius;

        nodes.push({ mesh: node, angle: angle, radius: radius, speed: 0.01 + Math.random() * 0.02 });
        scene.add(node);
    }

    // Central energy core
    const coreGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    camera.position.z = 8;
    camera.position.y = 2;

    // Mouse interaction
    let mouseX = 0,
        mouseY = 0;
    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouseX = (event.clientX - rect.left - rect.width / 2) / rect.width;
        mouseY = (event.clientY - rect.top - rect.height / 2) / rect.height;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Rotate main sphere
        wireframeSphere.rotation.x += 0.005;
        wireframeSphere.rotation.y += 0.008;

        // Rotate rings at different speeds
        ring1.rotation.z += 0.01;
        ring2.rotation.x += 0.015;
        ring3.rotation.y += 0.012;

        // Animate floating nodes
        nodes.forEach((nodeData, index) => {
            nodeData.angle += nodeData.speed;
            nodeData.mesh.position.x = Math.cos(nodeData.angle) * nodeData.radius;
            nodeData.mesh.position.z = Math.sin(nodeData.angle) * nodeData.radius;
            nodeData.mesh.position.y += Math.sin(time * 2 + index) * 0.01;

            // Pulsing effect
            const scale = 1 + Math.sin(time * 3 + index) * 0.3;
            nodeData.mesh.scale.setScalar(scale);
        });

        // Pulsing core
        const coreScale = 1 + Math.sin(time * 4) * 0.2;
        core.scale.setScalar(coreScale);
        core.material.opacity = 0.7 + Math.sin(time * 5) * 0.2;

        // Camera movement based on mouse
        camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 4 - camera.position.y + 2) * 0.05;
        camera.lookAt(scene.position);

        // Auto-rotation when not interacting
        if (Math.abs(mouseX) < 0.01 && Math.abs(mouseY) < 0.01) {
            camera.position.x = Math.cos(time * 0.2) * 8;
            camera.position.z = Math.sin(time * 0.2) * 8;
        }

        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// ENHANCED Form Interactions with EmailJS - UPDATED FUNCTION
function initFormInteractions() {
    // Initialize EmailJS first
    initEmailJS();

    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll('.form-input');

    if (!form) return;

    // Form submission with EmailJS
    form.addEventListener('submit', handleFormSubmit);

    // Input focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input.parentElement.querySelector('.input-line'), {
                width: '100%',
                duration: 0.3,
                ease: 'power2.out'
            });

            // Enhanced neon glow effect
            gsap.to(input, {
                boxShadow: '0 0 20px var(--primary-color), 0 0 40px var(--primary-color)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                gsap.to(input.parentElement.querySelector('.input-line'), {
                    width: '0%',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            // Remove glow animation
            gsap.to(input, {
                boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// EmailJS INITIALIZATION - NEW FUNCTION
function initEmailJS() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('📧 EmailJS initialized with your credentials');
}

// FORM SUBMISSION HANDLER WITH EMAILJS - NEW FUNCTION
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('span').textContent;

    // Get form data
    const formData = {
        from_name: form.name.value,
        from_email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
        to_name: 'Rahul Saini'
    };

    // Validate form
    if (!validateForm(formData)) {
        showNotification('Please fill all fields correctly ⚠️', 'error');
        return;
    }

    try {
        // Show loading state
        setButtonLoading(submitBtn, true);

        // Send email using YOUR EmailJS configuration
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            formData,
            EMAILJS_CONFIG.PUBLIC_KEY
        );


        console.log('✅ Email sent successfully:', response);

        // Show success animation
        showSuccessAnimation();
        showNotification('Message sent successfully! 🚀', 'success');

        // Reset form
        form.reset();
        document.querySelectorAll('.form-group').forEach(group => {
            const inputLine = group.querySelector('.input-line');
            if (inputLine) {
                gsap.to(inputLine, {
                    width: '0%',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

    } catch (error) {
        console.error('❌ Email send failed:', error);
        showNotification('Failed to send message. Please try again.', 'error');
        showErrorAnimation();

    } finally {
        setButtonLoading(submitBtn, false, originalText);
    }
}

// FORM VALIDATION - NEW FUNCTION
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.from_name.trim()) {
        highlightError(document.querySelector('[name="name"]'));
        return false;
    }

    if (!emailRegex.test(data.from_email)) {
        highlightError(document.querySelector('[name="email"]'));
        return false;
    }

    if (!data.subject.trim()) {
        highlightError(document.querySelector('[name="subject"]'));
        return false;
    }

    if (!data.message.trim()) {
        highlightError(document.querySelector('[name="message"]'));
        return false;
    }

    return true;
}

// HIGHLIGHT FORM ERRORS - NEW FUNCTION
function highlightError(input) {
    gsap.fromTo(input, { x: 0 }, {
        x: [-10, 10, -5, 5, 0],
        duration: 0.5,
        ease: 'power2.out'
    });

    gsap.to(input, {
        borderColor: '#ff4444',
        boxShadow: '0 0 15px rgba(255, 68, 68, 0.5)',
        duration: 0.3
    });

    setTimeout(() => {
        gsap.to(input, {
            borderColor: 'rgba(255, 255, 255, 0.3)',
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)',
            duration: 0.3
        });
    }, 3000);
}

// BUTTON LOADING STATE - NEW FUNCTION
function setButtonLoading(button, loading, originalText = 'Send Message') {
    if (loading) {
        button.innerHTML = `
            <div class="loading-spinner"></div>
            <span>Sending...</span>
            <div class="btn-glow"></div>
        `;
        button.disabled = true;
        button.style.opacity = '0.7';

        gsap.to(button.querySelector('.loading-spinner'), {
            rotation: 360,
            duration: 1,
            repeat: -1,
            ease: 'none'
        });

    } else {
        button.innerHTML = `
            <span>${originalText}</span>
            <div class="btn-glow"></div>
        `;
        button.disabled = false;
        button.style.opacity = '1';
    }
}

// SUCCESS ANIMATION - NEW FUNCTION
function showSuccessAnimation() {
    createSuccessParticles();

    const form = document.getElementById('contact-form');
    gsap.to(form, {
        boxShadow: '0 0 50px rgba(0, 255, 0, 0.3), 0 0 100px rgba(0, 255, 0, 0.1)',
        duration: 1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
    });
}

// ERROR ANIMATION - NEW FUNCTION
function showErrorAnimation() {
    const form = document.getElementById('contact-form');

    gsap.fromTo(form, { x: 0 }, {
        x: [-15, 15, -10, 10, -5, 5, 0],
        duration: 0.6,
        ease: 'power2.out'
    });

    gsap.to(form, {
        boxShadow: '0 0 30px rgba(255, 68, 68, 0.4)',
        duration: 0.3,
        yoyo: true,
        repeat: 1
    });
}

// SUCCESS PARTICLES - NEW FUNCTION
function createSuccessParticles() {
    const form = document.getElementById('contact-form');
    const rect = form.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'success-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00ff00;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 10px #00ff00;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
        `;

        document.body.appendChild(particle);

        gsap.to(particle, {
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: 0,
            scale: 0,
            duration: 2,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
}

// NOTIFICATION SYSTEM - NEW FUNCTION
function showNotification(message, type = 'info') {
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 
                    type === 'error' ? 'rgba(255, 68, 68, 0.1)' : 
                    'rgba(0, 212, 255, 0.1)'};
        border: 1px solid ${type === 'success' ? '#00ff00' : 
                           type === 'error' ? '#ff4444' : 
                           '#00d4ff'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        font-family: 'Orbitron', monospace;
    `;

    document.body.appendChild(notification);

    gsap.to(notification, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    });

    setTimeout(() => {
        gsap.to(notification, {
            x: '100%',
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, 5000);
}

// Navigation
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: targetSection,
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Hide/show nav on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            gsap.to(nav, { y: -100, duration: 0.3 });
        } else {
            // Scrolling up
            gsap.to(nav, { y: 0, duration: 0.3 });
        }

        lastScrollTop = scrollTop;
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize performance monitoring
console.log('🎮 Performance Mode: Activated');
console.log('⚡ 60fps Target: Locked');
console.log('🚀 All Systems: GO!');