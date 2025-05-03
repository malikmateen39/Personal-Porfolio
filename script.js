 // DOM Elements
 const menuToggle = document.getElementById('menu-toggle');
 const navigation = document.getElementById('navigation');
 const themeToggle = document.getElementById('theme-toggle');
 const moonIcon = document.getElementById('moon-icon');
 const sunIcon = document.getElementById('sun-icon');
 const contactForm = document.getElementById('contact-form');
 const submitBtn = document.getElementById('submit-btn');
 const toast = document.getElementById('toast');
 const currentYear = document.getElementById('current-year');
 const sections = document.querySelectorAll('section');
 const navLinks = document.querySelectorAll('.nav-link');

 // Set current year in footer
 currentYear.textContent = new Date().getFullYear();

 // Theme Handling
 function initializeTheme() {
   const savedTheme = localStorage.getItem('theme');
   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
   
   if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
     document.documentElement.classList.add('dark');
     moonIcon.classList.add('hidden');
     sunIcon.classList.remove('hidden');
   } else {
     moonIcon.classList.remove('hidden');
     sunIcon.classList.add('hidden');
   }
 }

 function toggleTheme() {
   const isDark = document.documentElement.classList.toggle('dark');
   
   if (isDark) {
     localStorage.setItem('theme', 'dark');
     moonIcon.classList.add('hidden');
     sunIcon.classList.remove('hidden');
   } else {
     localStorage.setItem('theme', 'light');
     moonIcon.classList.remove('hidden');
     sunIcon.classList.add('hidden');
   }
 }

 // Mobile Menu Toggle
 function toggleMenu() {
   navigation.classList.toggle('active');
 }

 // Form submission handling
 function handleFormSubmit(e) {
   e.preventDefault();
   
   const formData = new FormData(contactForm);
   const name = formData.get('name');
   const email = formData.get('email');
   const message = formData.get('message');
   
   if (!name || !email || !message) {
     return;
   }
   
   // Show loading state
   submitBtn.disabled = true;
   submitBtn.textContent = 'Sending...';
   
   // Simulate form submission with timeout
   setTimeout(() => {
     // Reset form
     contactForm.reset();
     submitBtn.disabled = false;
     submitBtn.textContent = 'Send Message';
     
     // Show toast notification
     showToast('Message sent successfully!');
     
     // Console log the form data (for demo purposes)
     console.log({name, email, message});
   }, 1500);
 }

 // Show toast notification
 function showToast(message) {
   toast.textContent = message;
   toast.classList.remove('hidden');
   
   // Auto hide toast after 3 seconds
   setTimeout(() => {
     toast.classList.add('hidden');
   }, 3000);
 }

 // Smooth scrolling for navigation links
 function setupSmoothScrolling() {
   const links = document.querySelectorAll('a[href^="#"]');
   
   links.forEach(link => {
     link.addEventListener('click', (e) => {
       if (navigation.classList.contains('active')) {
         navigation.classList.remove('active');
       }
       
       const href = link.getAttribute('href');
       if (href === '#') return;
       
       const targetSection = document.querySelector(href);
       if (!targetSection) return;
       
       e.preventDefault();
       
       window.scrollTo({
         top: targetSection.offsetTop - 64, // Adjust for header height
         behavior: 'smooth'
       });
     });
   });
 }

 // Highlight active section in navigation
 function handleScroll() {
   const scrollPosition = window.scrollY + 200; // Add offset for better UX
   
   sections.forEach(section => {
     const sectionTop = section.offsetTop;
     const sectionHeight = section.offsetHeight;
     const sectionId = section.getAttribute('id');
     
     if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
       navLinks.forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href') === `#${sectionId}`) {
           link.classList.add('active');
         }
       });
     }
   });
 }

 // Animation on scroll
 function setupScrollAnimations() {
   const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add('animate-slide-in');
       }
     });
   }, { threshold: 0.1 });
   
   // Elements to animate
   const animateElements = document.querySelectorAll('.section > .container');
   animateElements.forEach(el => {
     observer.observe(el);
   });
 }

 // Event listeners
 document.addEventListener('DOMContentLoaded', () => {
   initializeTheme();
   setupSmoothScrolling();
   setupScrollAnimations();
   
   menuToggle.addEventListener('click', toggleMenu);
   themeToggle.addEventListener('click', toggleTheme);
   contactForm.addEventListener('submit', handleFormSubmit);
   window.addEventListener('scroll', handleScroll);
 });

 