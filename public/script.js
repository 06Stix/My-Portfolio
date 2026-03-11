console.log('script loaded')
console.log(document.getElementById('modal-title'))
console.log(document.getElementById('modal-overlay'))

const projects = {
  skycast: {
    title: 'Skycast',
    images: ['SkyCast0.png', 'SkyCast1.png', 'SkyCast2.png', 'SkyCast3.png']
  }
}

const overlay    = document.getElementById('modal-overlay')
const modalTitle = document.getElementById('modal-title')
const modalImgs  = document.getElementById('modal-images')
const modalDots  = document.getElementById('modal-dots')
const closeBtn   = document.getElementById('modal-close')
const lightbox      = document.getElementById('lightbox')
const lightboxImg   = document.getElementById('lightbox-img')
const lightboxClose = document.getElementById('lightbox-close')

let currentSlide = 0

//functions//

function openModal(projectKey) {
  console.log('ProjectKey:', projectKey)
  const project = projects[projectKey]
  currentSlide = 0

  modalTitle.textContent = project.title

  modalImgs.innerHTML = ''
  project.images.forEach(function(src) {
    if (src) {
      const el = document.createElement('img')
      el.className = 'modal-image'
      el.src = src
      el.alt = ''
      el.style.cursor = 'zoom-in'
      el.addEventListener('click', function() {
        openLightbox(el.src)
      })
      modalImgs.appendChild(el)
    } else {
      const el = document.createElement('div')
      el.className = 'modal-image-placeholder'
      modalImgs.appendChild(el)
    }
  })

  modalDots.innerHTML = ''
  overlay.classList.add('open')
}

function goToSlide(index) {
  const images = modalImgs.querySelectorAll('.modal-image, .modal-image-placeholder')
  const dots   = modalDots.querySelectorAll('.modal-dot')

  images[currentSlide].classList.remove('active')
  dots[currentSlide].classList.remove('active')

  currentSlide = index

  images[currentSlide].classList.add('active')
  dots[currentSlide].classList.add('active')
}

function closeModal() {
  overlay.classList.remove('open')
}


overlay.addEventListener('click', function(event) {
  if (event.target === overlay) closeModal()
})


closeBtn.addEventListener('click', closeModal)


document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') closeModal()
})


document.querySelectorAll('.project-card').forEach(function(card) {
  card.addEventListener('click', function() {
    const key = card.dataset.project
    openModal(key)
  })
})
function openLightbox(src) {
  lightboxImg.src = src
  lightbox.classList.add('open')
}

function closeLightbox() {
  lightbox.classList.remove('open')
}

lightboxClose.addEventListener('click', closeLightbox)

lightbox.addEventListener('click', function(event) {
  if (event.target === lightbox) closeLightbox()
})

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeLightbox()
    closeModal()
  }
})
