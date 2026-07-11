document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* Active nav link based on current page */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href').split('#')[0];
    if (href === path || (href === 'index.html' && path === '')) {
      a.classList.add('active');
    }
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Gallery filter */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          if (cat === 'all' || item.getAttribute('data-cat') === cat) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  /* Lightbox */
  var lightbox = document.getElementById('lightbox');
  if (lightbox && galleryItems.length) {
    var lbImg = lightbox.querySelector('img');
    var lbCaption = lightbox.querySelector('.lightbox-caption');
    var visibleItems = function () {
      return Array.prototype.filter.call(galleryItems, function (i) {
        return !i.classList.contains('hidden');
      });
    };
    var currentIndex = 0;

    function openLightbox(item) {
      var items = visibleItems();
      currentIndex = items.indexOf(item);
      showCurrent(items);
      lightbox.classList.add('open');
    }
    function showCurrent(items) {
      var item = items[currentIndex];
      var img = item.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = img.alt;
    }
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () { openLightbox(item); });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () {
      var items = visibleItems();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showCurrent(items);
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () {
      var items = visibleItems();
      currentIndex = (currentIndex + 1) % items.length;
      showCurrent(items);
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') lightbox.classList.remove('open');
      if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev').click();
      if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click();
    });
  }

  /* Contact form -> mailto */
  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#f-name').value.trim();
      var company = form.querySelector('#f-company').value.trim();
      var phone = form.querySelector('#f-phone').value.trim();
      var email = form.querySelector('#f-email').value.trim();
      var product = form.querySelector('#f-product').value;
      var message = form.querySelector('#f-message').value.trim();

      var subject = 'Quote Request — ' + (product || 'General Enquiry') + (company ? ' — ' + company : '');
      var body =
        'Name: ' + name + '\n' +
        'Company: ' + company + '\n' +
        'Phone: ' + phone + '\n' +
        'Email: ' + email + '\n' +
        'Product / Requirement: ' + product + '\n\n' +
        'Details:\n' + message;

      var mailto = 'mailto:intacsystems@yahoo.co.in?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
    });
  }

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
