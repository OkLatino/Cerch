// Category Filtering
const categoryBtns = document.querySelectorAll('.category-btn');
const blogPosts = document.querySelectorAll('.blog-post');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // Filter posts
        blogPosts.forEach(post => {
            if (category === 'all' || post.dataset.category === category) {
                post.classList.remove('hidden');
                setTimeout(() => {
                    post.style.opacity = '1';
                    post.style.transform = 'translateY(0)';
                }, 10);
            } else {
                post.style.opacity = '0';
                post.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    post.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Blog Search
function searchBlog() {
    const searchInput = document.getElementById('blog-search');
    const searchTerm = searchInput.value.toLowerCase();
    
    if (!searchTerm) {
        showNotification('Por favor ingresa un término de búsqueda', 'info');
        return;
    }
    
    let foundPosts = 0;
    
    blogPosts.forEach(post => {
        const title = post.querySelector('.blog-post__title').textContent.toLowerCase();
        const excerpt = post.querySelector('.blog-post__excerpt').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            post.classList.remove('hidden');
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
            foundPosts++;
        } else {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            setTimeout(() => {
                post.classList.add('hidden');
            }, 300);
        }
    });
    
    if (foundPosts === 0) {
        showNotification('No se encontraron artículos con ese término', 'info');
    } else {
        showNotification(`Se encontraron ${foundPosts} artículo(s)`, 'success');
    }
    
    // Reset category filter
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.category-btn[data-category="all"]').classList.add('active');
}

// Search on Enter key
document.getElementById('blog-search')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBlog();
    }
});

// Load More Posts
let postsPerPage = 6;
let currentlyShowing = postsPerPage;

function loadMorePosts() {
    const allPosts = Array.from(blogPosts);
    const nextPosts = allPosts.slice(currentlyShowing, currentlyShowing + postsPerPage);
    
    if (nextPosts.length === 0) {
        showNotification('No hay más artículos para mostrar', 'info');
        return;
    }
    
    nextPosts.forEach((post, index) => {
        setTimeout(() => {
            post.classList.remove('hidden');
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    currentlyShowing += nextPosts.length;
    
    if (currentlyShowing >= allPosts.length) {
        const loadMoreBtn = document.querySelector('.blog-load-more button');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        const submitBtn = newsletterForm.querySelector('button');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Suscribiendo...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('¡Suscripción exitosa! Recibirás nuestros artículos en tu correo.', 'success');
            newsletterForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
        
        // In production, replace with actual API endpoint
    });
}

// Share functionality
function shareArticle(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).then(() => {
            console.log('Artículo compartido exitosamente');
        }).catch((error) => {
            console.log('Error al compartir:', error);
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Enlace copiado al portapapeles', 'success');
        });
    }
}

// Reading time calculation
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min`;
}

// Add reading time to posts if not present
document.addEventListener('DOMContentLoaded', () => {
    blogPosts.forEach(post => {
        const metaSection = post.querySelector('.blog-post__meta');
        const hasReadingTime = Array.from(metaSection.children).some(span => 
            span.querySelector('svg circle')
        );
        
        if (!hasReadingTime) {
            const excerpt = post.querySelector('.blog-post__excerpt')?.textContent || '';
            const readingTime = calculateReadingTime(excerpt + ' '.repeat(500)); // Estimate
            
            const timeSpan = document.createElement('span');
            timeSpan.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                ${readingTime}
            `;
            
            if (metaSection) {
                metaSection.appendChild(timeSpan);
            }
        }
    });
});

// Track blog interactions
document.querySelectorAll('.blog-post__link').forEach(link => {
    link.addEventListener('click', (e) => {
        const post = e.target.closest('.blog-post');
        const title = post.querySelector('.blog-post__title').textContent;
        const category = post.dataset.category;
        
        if (typeof trackEvent === 'function') {
            trackEvent('Blog', 'Article Click', `${category} - ${title}`);
        }
    });
});

console.log('Blog scripts loaded successfully');
