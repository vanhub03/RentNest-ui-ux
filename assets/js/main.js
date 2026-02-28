/**
 * RentNest Main JS
 * Contains basic mock data and UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (hamburger && navbarMenu) {
        hamburger.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navbarMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // 2. Admin Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // 3. Modal Functionality
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloses = document.querySelectorAll('[data-modal-close]');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-modal-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('active');
            }
        });
    });

    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Close modal on outside click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // 4. Input Mock Validation
    const testForms = document.querySelectorAll('.needs-validation');
    testForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const inputs = form.querySelectorAll('input[required], select[required]');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('form-error')) {
                        errorMsg.style.display = 'block';
                    }
                } else {
                    input.classList.remove('is-invalid');
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('form-error')) {
                        errorMsg.style.display = 'none';
                    }
                }
            });

            if (isValid) {
                // Mock success
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check"></i> Success';
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-success');
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.add('btn-primary');
                        btn.classList.remove('btn-success');
                        btn.disabled = false;
                        form.reset();

                        // Close modal if in modal
                        const modal = form.closest('.modal-overlay');
                        if (modal) modal.classList.remove('active');
                    }, 2000);
                }, 1500);
            }
        });
    });

    // Clear validation on input
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('is-invalid');
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('form-error')) {
                errorMsg.style.display = 'none';
            }
        });
    });
});

// Mock Utilities that can be called from HTML
const RentNestUI = {
    showToast: function (message, type = 'info') {
        const toastContainer = document.getElementById('toast-container') || this.createToastContainer();

        const toast = document.createElement('div');
        toast.className = `alert alert-${type} fade-in`;
        toast.style.marginBottom = '10px';
        toast.style.boxShadow = 'var(--shadow-md)';

        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'danger') icon = 'exclamation-circle';
        if (type === 'warning') icon = 'exclamation-triangle';

        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <div>${message}</div>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    },

    createToastContainer: function () {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        container.style.minWidth = '300px';
        document.body.appendChild(container);
        return container;
    }
};

// --- Reveal on Scroll Animations ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 50; // pixels before revealing

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
// Trigger once on load
reveal();

