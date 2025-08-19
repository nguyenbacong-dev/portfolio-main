      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            fontFamily: {
              sans: ["Inter", "sans-serif"],
            },
            colors: {
              "electric-blue": "#00BFFF",
              "cyan-glow": "#00FFFF",
              "purple-glow": "#8B5CF6",
              "pink-glow": "#EC4899",
              "green-glow": "#10B981",
              "orange-glow": "#F59E0B",
              "dark-bg": "#0F0F23",
              "dark-card": "#1A1A2E",
              "light-bg": "#F1F5F9",
              "light-card": "#FEFEFE",
            },
            boxShadow: {
              "neuro-dark": "8px 8px 16px #0a0a0a, -8px -8px 16px #1e1e1e",
              "neuro-light": "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
              glow: "0 0 20px rgba(0, 191, 255, 0.5)",
              "glow-strong": "0 0 30px rgba(0, 255, 255, 0.8)",
              "glow-purple": "0 0 20px rgba(139, 92, 246, 0.6)",
              "glow-pink": "0 0 20px rgba(236, 72, 153, 0.6)",
              "glow-green": "0 0 20px rgba(16, 185, 129, 0.6)",
            },
            animation: {
              typing:
                "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
              float: "float 6s ease-in-out infinite",
              "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              "bounce-slow": "bounce 3s infinite",
              "spin-slow": "spin 8s linear infinite",
              wiggle: "wiggle 1s ease-in-out infinite",
              gradient: "gradient 15s ease infinite",
              "slide-up": "slideUp 0.5s ease-out",
              "slide-in": "slideIn 0.6s ease-out",
              "scale-in": "scaleIn 0.5s ease-out",
              "fade-in": "fadeIn 0.5s ease-out",
            },
            keyframes: {
              typing: {
                from: { width: "0" },
                to: { width: "100%" },
              },
              "blink-caret": {
                "from, to": { borderColor: "transparent" },
                "50%": { borderColor: "#00BFFF" },
              },
              float: {
                "0%, 100%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-8px)" },
              },
              wiggle: {
                "0%, 100%": { transform: "rotate(-3deg)" },
                "50%": { transform: "rotate(3deg)" },
              },
              gradient: {
                "0%, 100%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
              },
              slideUp: {
                from: { transform: "translateY(100px)", opacity: "0" },
                to: { transform: "translateY(0)", opacity: "1" },
              },
              slideIn: {
                from: { transform: "translateX(-100px)", opacity: "0" },
                to: { transform: "translateX(0)", opacity: "1" },
              },
              scaleIn: {
                from: { transform: "scale(0.8)", opacity: "0" },
                to: { transform: "scale(1)", opacity: "1" },
              },
              fadeIn: {
                from: { opacity: "0" },
                to: { opacity: "1" },
              },
            },
          },
        },
      };
    


      // Wrap all JavaScript in an IIFE to avoid global scope pollution
      (function () {
        "use strict";

        // Initialize EmailJS with Public Key
        emailjs.init("MkDTippaiZtJd2cUV");

        // Global variables
        let hasAnimated = false;
        let selectedRating = 5;

        // DOM Elements
        const elements = {
          themeToggle: document.getElementById("theme-toggle"),
          html: document.documentElement,
          mobileMenuButton: document.getElementById("mobile-menu-button"),
          mobileMenu: document.getElementById("mobile-menu"),
          emailForm: document.getElementById("emailForm"),
          backToTopButton: document.getElementById("back-to-top"),
          addTestimonialBtn: document.getElementById("add-testimonial-btn"),
          testimonialModal: document.getElementById("testimonial-modal"),
          closeModal: document.getElementById("close-modal"),
          cancelTestimonial: document.getElementById("cancel-testimonial"),
          testimonialForm: document.getElementById("testimonial-form"),
          starRating: document.getElementById("star-rating"),
          testimonialsGrid: document.getElementById("testimonials-grid"),
          devName: document.getElementById("dev-name"),
          devTitle: document.getElementById("dev-title"),
          githubActivity: document.getElementById("github-activity"),
          currentYear: document.getElementById("current-year"),
        };

        // Enhanced Mobile Detection
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Email Form Handler
        if (elements.emailForm) {
          elements.emailForm.addEventListener("submit", function (event) {
            event.preventDefault();

            emailjs.sendForm("service_rw9xkqw", "template_z37v5ih", this).then(
              function (response) {
                alert("Pesan berhasil dikirim!");
                elements.emailForm.reset();
              },
              function (error) {
                alert("Terjadi kesalahan: " + error.text);
              }
            );
          });
        }

        // Enhanced Theme Toggle with Mobile Support
        if (elements.themeToggle) {
          const handleThemeToggle = (e) => {
            e.preventDefault();
            elements.html.classList.toggle("dark");
            localStorage.setItem(
              "theme",
              elements.html.classList.contains("dark") ? "dark" : "light"
            );

            elements.themeToggle.style.transform = "scale(0.8)";
            setTimeout(() => {
              elements.themeToggle.style.transform = "scale(1)";
            }, 150);
          };

          elements.themeToggle.addEventListener("click", handleThemeToggle);
          if (isTouch) {
            elements.themeToggle.addEventListener("touchend", handleThemeToggle);
          }

          // Check for saved theme preference
          if (localStorage.getItem("theme") === "light") {
            elements.html.classList.remove("dark");
          }
        }

        // Enhanced Mobile Menu Toggle
        if (elements.mobileMenuButton && elements.mobileMenu) {
          const toggleMobileMenu = (e) => {
            e.preventDefault();
            elements.mobileMenu.classList.toggle("hidden");
          };

          elements.mobileMenuButton.addEventListener("click", toggleMobileMenu);
          if (isTouch) {
            elements.mobileMenuButton.addEventListener("touchend", toggleMobileMenu);
          }
        }

        // Enhanced Active Navigation Link
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-link");

        function updateActiveNavLink() {
          let current = "";

          sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
              current = section.getAttribute("id");
            }
          });

          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
              link.classList.add("active");
            }
          });
        }

        // Enhanced scroll handling for mobile
        let ticking = false;
        function requestTick() {
          if (!ticking) {
            requestAnimationFrame(updateActiveNavLink);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
          }
        }

        window.addEventListener("scroll", requestTick, { passive: true });

        // Enhanced Typing Effect
        function typeEffect(element, text, speed = 100, delay = 0) {
          if (!element) return;

          setTimeout(() => {
            element.textContent = "";
            let i = 0;
            const timer = setInterval(() => {
              if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
              } else {
                clearInterval(timer);
              }
            }, speed);
          }, delay);
        }

        // Initialize typing effects
        typeEffect(elements.devName, "Nguyen Ba Cong", 150);
        typeEffect(
          elements.devTitle,
          "Network Administrator & Web Developer",
          100,
          2000
        );

        // Enhanced Count Up Animation
        const countUpElements = document.querySelectorAll(".count-up");

        function animateCountUp() {
          if (hasAnimated || !countUpElements.length) return;
          hasAnimated = true;

          countUpElements.forEach((element) => {
            const target = parseInt(element.getAttribute("data-target"));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
              } else {
                element.textContent = Math.floor(current);
              }
            }, 16);
          });
        }

        // Enhanced Animate Skill Bars
        function animateSkillBars() {
          const skillBars = document.querySelectorAll(".skill-level-fill");
          skillBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.classList.add("animate");
            }, index * 200);
          });
        }

        // Enhanced Intersection Observer with Mobile Optimization
        const observerOptions = {
          threshold: isMobile ? 0.1 : 0.3,
          rootMargin: isMobile ? "50px" : "0px"
        };

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                if (entry.target.id === "skills") {
                  animateCountUp();
                  animateSkillBars();
                }

                const animatedElements = entry.target.querySelectorAll(
                  ".skill-item, .project-card, .certificate-card, .testimonial-card"
                );
                animatedElements.forEach((el, index) => {
                  setTimeout(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                  }, index * (isMobile ? 50 : 100));
                });
              }
            });
          },
          observerOptions
        );

        sections.forEach((section) => {
          observer.observe(section);
        });

        // Enhanced GitHub Activity Generation - TIDAK DIUBAH
        function generateGitHubActivity() {
          if (!elements.githubActivity) return;

          const weeks = window.innerWidth < 768 ? 26 : 53;
          const daysPerWeek = 7;

          elements.githubActivity.innerHTML = "";

          for (let week = 0; week < weeks; week++) {
            for (let day = 0; day < daysPerWeek; day++) {
              const activityLevel = Math.floor(Math.random() * 5);
              const dayElement = document.createElement("div");
              dayElement.className = `activity-day activity-${activityLevel}`;
              dayElement.title = `${Math.floor(
                Math.random() * 10
              )} contributions`;
              elements.githubActivity.appendChild(dayElement);
            }
          }
        }

        // Enhanced Back to Top Button
        if (elements.backToTopButton) {
          function updateBackToTopButton() {
            if (window.pageYOffset > 300) {
              elements.backToTopButton.classList.remove(
                "opacity-0",
                "invisible"
              );
              elements.backToTopButton.classList.add("opacity-100", "visible");
            } else {
              elements.backToTopButton.classList.remove(
                "opacity-100",
                "visible"
              );
              elements.backToTopButton.classList.add("opacity-0", "invisible");
            }
          }

          window.addEventListener("scroll", updateBackToTopButton, { passive: true });

          const scrollToTop = (e) => {
            e.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          };

          elements.backToTopButton.addEventListener("click", scrollToTop);
          if (isTouch) {
            elements.backToTopButton.addEventListener("touchend", scrollToTop);
          }
        }

        // Enhanced Testimonial Modal Functionality with Touch Support
        if (elements.starRating) {
          const stars = elements.starRating.querySelectorAll(".star");

          stars.forEach((star, index) => {
            const handleStarClick = (e) => {
              e.preventDefault();
              selectedRating = index + 1;
              updateStarRating();
            };

            const handleStarHover = () => {
              if (!isTouch) {
                highlightStars(index + 1);
              }
            };

            star.addEventListener("click", handleStarClick);
            if (isTouch) {
              star.addEventListener("touchend", handleStarClick);
            } else {
              star.addEventListener("mouseover", handleStarHover);
            }
          });

          if (!isTouch) {
            elements.starRating.addEventListener("mouseleave", () => {
              updateStarRating();
            });
          }

          function highlightStars(rating) {
            stars.forEach((star, index) => {
              if (index < rating) {
                star.classList.add("active");
              } else {
                star.classList.remove("active");
              }
            });
          }

          function updateStarRating() {
            highlightStars(selectedRating);
          }

          // Initialize star rating
          updateStarRating();
        }

        // Enhanced Modal Controls with Touch Support
        function closeTestimonialModal() {
          if (elements.testimonialModal) {
            elements.testimonialModal.classList.remove("show");
            document.body.style.overflow = "auto";
            if (elements.testimonialForm) {
              elements.testimonialForm.reset();
            }
            selectedRating = 5;
            if (elements.starRating) {
              const stars = elements.starRating.querySelectorAll(".star");
              stars.forEach((star, index) => {
                if (index < selectedRating) {
                  star.classList.add("active");
                } else {
                  star.classList.remove("active");
                }
              });
            }
          }
        }

        if (elements.addTestimonialBtn) {
          const openModal = (e) => {
            e.preventDefault();
            elements.testimonialModal.classList.add("show");
            document.body.style.overflow = "hidden";
          };

          elements.addTestimonialBtn.addEventListener("click", openModal);
          if (isTouch) {
            elements.addTestimonialBtn.addEventListener("touchend", openModal);
          }
        }

        if (elements.closeModal) {
          const closeModal = (e) => {
            e.preventDefault();
            closeTestimonialModal();
          };

          elements.closeModal.addEventListener("click", closeModal);
          if (isTouch) {
            elements.closeModal.addEventListener("touchend", closeModal);
          }
        }

        if (elements.cancelTestimonial) {
          const cancelModal = (e) => {
            e.preventDefault();
            closeTestimonialModal();
          };

          elements.cancelTestimonial.addEventListener("click", cancelModal);
          if (isTouch) {
            elements.cancelTestimonial.addEventListener("touchend", cancelModal);
          }
        }

        if (elements.testimonialModal) {
          elements.testimonialModal.addEventListener("click", (e) => {
            if (e.target === elements.testimonialModal) {
              closeTestimonialModal();
            }
          });
        }

        // Enhanced Add New Testimonial
        if (elements.testimonialForm) {
          elements.testimonialForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const clientName = document.getElementById("client-name").value;
            const clientPosition =
              document.getElementById("client-position").value;
            const clientAvatar =
              document.getElementById("client-avatar").value ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
            const testimonialText =
              document.getElementById("testimonial-text").value;

            const borderColors = [
              "border-electric-blue/20",
              "border-purple-glow/20",
              "border-green-glow/20",
              "border-pink-glow/20",
              "border-orange-glow/20",
              "border-cyan-glow/20",
            ];

            const randomBorderColor =
              borderColors[Math.floor(Math.random() * borderColors.length)];
            const newTestimonial = document.createElement("div");
            newTestimonial.className = `testimonial-card rounded-xl p-4 sm:p-6 shadow-neuro-light dark:shadow-neuro-dark bg-light-card dark:bg-dark-card glass dark:glass border ${randomBorderColor}`;
            newTestimonial.style.opacity = "0";
            newTestimonial.style.transform = "translateY(30px)";

            const starsHtml = Array(selectedRating)
              .fill('<i class="fas fa-star"></i>')
              .join("");

            newTestimonial.innerHTML = `
              <div class="testimonial-content">
                  <div class="flex items-center mb-4">
                      <div class="flex text-yellow-400">
                          ${starsHtml}
                      </div>
                      <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">${selectedRating}.0</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 mb-6 italic leading-relaxed text-sm sm:text-base">
                      "${testimonialText}"
                  </p>
              </div>
              <div class="flex items-center">
                  <img src="${clientAvatar}" alt="${clientName}" class="w-12 h-12 rounded-full object-cover mr-4">
                  <div>
                      <h4 class="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">${clientName}</h4>
                      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">${clientPosition}</p>
                  </div>
              </div>
            `;

            if (elements.testimonialsGrid) {
              elements.testimonialsGrid.appendChild(newTestimonial);

              setTimeout(() => {
                newTestimonial.style.opacity = "1";
                newTestimonial.style.transform = "translateY(0)";
                newTestimonial.style.transition = "all 0.6s ease-out";
              }, 100);
            }

            closeTestimonialModal();

            const submitButton = elements.testimonialForm.querySelector(
              'button[type="submit"]'
            );
            if (submitButton) {
              const originalText = submitButton.innerHTML;
              submitButton.innerHTML =
                '<i class="fas fa-check mr-2"></i> Added Successfully!';
              submitButton.style.background =
                "linear-gradient(to right, #10B981, #059669)";

              setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = "";
              }, 2000);
            }
          });
        }

        // Enhanced smooth scrolling for navigation links with mobile support
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          const handleClick = function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
              target.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });

              if (
                elements.mobileMenu &&
                !elements.mobileMenu.classList.contains("hidden")
              ) {
                elements.mobileMenu.classList.add("hidden");
              }
            }
          };

          anchor.addEventListener("click", handleClick);
          if (isTouch) {
            anchor.addEventListener("touchend", handleClick);
          }
        });

        // Set current year in footer
        if (elements.currentYear) {
          elements.currentYear.textContent = new Date().getFullYear();
        }

        // Enhanced keyboard navigation
        document.addEventListener("keydown", (e) => {
          if (
            e.key === "Escape" &&
            elements.testimonialModal &&
            elements.testimonialModal.classList.contains("show")
          ) {
            closeTestimonialModal();
          }
        });

        // Enhanced resize handler with debouncing
        let resizeTimeout;
        function handleResize() {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            generateGitHubActivity();
          }, 250);
        }

        window.addEventListener("resize", handleResize, { passive: true });

        // Enhanced initialization
        function initializeApp() {
          generateGitHubActivity();

          // Set initial opacity for animated elements
          const animatedElements = document.querySelectorAll(
            ".skill-item, .project-card, .certificate-card, .testimonial-card"
          );
          animatedElements.forEach((el) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "all 0.6s ease-out";
          });

          // Prevent zoom on double tap for iOS
          if (isTouch) {
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function (event) {
              const now = (new Date()).getTime();
              if (now - lastTouchEnd <= 300) {
                event.preventDefault();
              }
              lastTouchEnd = now;
            }, false);
          }
        }

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initializeApp);
        } else {
          initializeApp();
        }

      })();
    

