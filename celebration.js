document.addEventListener("DOMContentLoaded", () => {
    console.log("Celebration page loaded")
  
    const presentationView = document.getElementById("presentationView")
    const audio = document.getElementById("backgroundMusic")
    const progressBar = document.getElementById("progressBar")
    const progressFill = document.getElementById("progressFill")
  
    // Try to play audio with multiple strategies
    const playAudio = async () => {
      try {
        // Try to play using the Promise-based API
        await audio.play()
        console.log("Audio playing successfully")
      } catch (error) {
        console.log("Autoplay prevented:", error)
        // Don't show any prompt, just wait for user interaction
      }
    }
  
    // Check if user interacted on the previous page
    const userInteracted = sessionStorage.getItem("userInteracted")
    if (userInteracted) {
      // Clear the flag
      sessionStorage.removeItem("userInteracted")
      // Try to play audio immediately
      setTimeout(() => {
        playAudio()
      }, 500) // Small delay to ensure page is fully loaded
    } else {
      // Try to play audio anyway
      playAudio()
    }
  
    // Also try to play when document becomes visible if it was loaded in background
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && audio.paused) {
        playAudio()
      }
    })
  
    // Try to play on any user interaction with the page
    const tryPlayOnInteraction = () => {
      if (audio.paused) {
        audio.play().catch((err) => console.log("Play attempt failed:", err))
      }
      // Remove the event listeners after first interaction
      document.removeEventListener("click", tryPlayOnInteraction)
      document.removeEventListener("touchstart", tryPlayOnInteraction)
      document.removeEventListener("keydown", tryPlayOnInteraction)
    }
  
    document.addEventListener("click", tryPlayOnInteraction)
    document.addEventListener("touchstart", tryPlayOnInteraction)
    document.addEventListener("keydown", tryPlayOnInteraction)
  
    // Preload audio for better performance
    audio.preload = "auto"
  
    // Set default volume
    audio.volume = 0.5
  
    const slides = [
        {
            image: "A.jpg",
            text: "Happy Birthday to my sister who's like WiFi—sometimes strong, mostly annoying, and completely necessary. 📶🎉",
          },
          {
            image: "B.jpg",
            text: "Congrats on surviving another year of being my sister. Truly heroic stuff. 💪🎂",
          },
          {
            image: "C.jpg",
            text: "You’re the only person I can insult daily and still love unconditionally. That’s talent. 😎💖",
          },
          {
            image: "D.jpg",
            text: "Remember when you were young, cute, and innocent? Yeah, me neither. 😂🎈",
          },
          {
            image: "E.jpg",
            text: "Your age is just a number… a really high one now. Welcome to the 'getting old' club! 🎉👵",
          },
          {
            image: "F.jpg",
            text: "You’re the reason I believe patience is a virtue. And therapy is important. 🤯❤️",
          },
          {
            image: "G.jpg",
            text: "May your day be as fabulous as your ability to annoy me 24/7. 🎁😤",
          },
          {
            image: "H.jpg",
            text: "To my sister: proof that I can survive extreme levels of madness. 🧠🎊",
          },
          {
            image: "I.jpg",
            text: "You might be older today, but don’t worry—you’ll always be younger than your maturity level. 😜🎂",
          },
          {
            image: "J.jpg",
            text: "Wishing you a birthday as unforgettable as that weird phase you had in 2017. 🕺💃",
          },
          {
            text: `
              <div class="love-letter">
                <div class="letter-title">Dear Trouble Magnet,</div>
                <div class="letter-paragraph">On your birthday, I just wanted to say thanks... for always giving me material to roast you. 🎉🔥</div>
                <div class="letter-paragraph">You're weird, dramatic, and probably the reason for 50% of my stress—but also 100% of my laughter. 😂❤️</div>
                <div class="letter-paragraph">I hope today brings you cake, fun, and maybe a little bit of self-awareness (but no pressure). 🎂😉</div>
                <div class="letter-paragraph">You're the best sister I've never met—mostly because I haven't had to hear your sass in real life yet. Let’s keep it that way. 🤣</div>
                <div class="letter-signature">Your favorite (and clearly superior) ,<br>Arun Kunwar 😎🔥</div>
              </div>
            `,
          },
        ];
  
    let currentSlideIndex = 0
    const autoplayInterval = null
    const isAutoPlaying = false
    let autoSlideTimer = null
  
    // Update progress bar
    function updateProgressBar() {
      const progress = ((currentSlideIndex + 1) / slides.length) * 100
      progressFill.style.width = `${progress}%`
      document.getElementById("slideCounter").textContent = `${currentSlideIndex + 1}/${slides.length}`
    }
  
    function startAutoSlideshow() {
      // Clear any existing timer
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer)
      }
  
      // Start new timer to advance slides every 10 seconds
      autoSlideTimer = setInterval(() => {
        advanceSlide()
      }, 10000) // 10 seconds
    }
  
    function resetAutoSlideTimer() {
      // Reset the timer when user manually advances
      startAutoSlideshow()
    }
  
    // Start presentation immediately
    showSlide(currentSlideIndex)
    updateProgressBar()
    startAutoSlideshow()
  
    function showSlide(index) {
      presentationView.innerHTML = ""
      const slideElement = createSlideElement(slides[index])
      presentationView.appendChild(slideElement)
      slideElement.classList.add("active")
  
      // Apply text animations to the current slide
      if (slideElement.querySelector(".message-frame")) {
        animateText(slideElement.querySelector(".message-frame"))
      }
  
      // Create confetti effect when showing a new slide
      createConfettiEffect()
  
      // If it's the last slide, restart the music for the next loop
      if (index === slides.length - 1) {
        setTimeout(() => {
          // Instead of stopping, just restart from the beginning
          audio.currentTime = 0
        }, 1000)
      }
    }
  
    function createSlideElement(slide) {
      const slideElement = document.createElement("div")
      slideElement.classList.add("slide")
  
      if (slide.class) {
        slideElement.classList.add(slide.class) // Add the special class for the last slide
      }
  
      if (slide.image) {
        const img = document.createElement("img")
        img.src = slide.image
        img.alt = "Birthday Slide"
  
        // Add loading attribute for better performance
        img.loading = "lazy"
  
        // Add error handling for images
        img.onerror = function () {
          this.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' fill='%23999999'%3EImage not found%3C/text%3E%3C/svg%3E"
        }
  
        // Add double-tap to zoom functionality
        img.addEventListener("dblclick", function (e) {
          if (this.classList.contains("zoomed")) {
            this.classList.remove("zoomed")
          } else {
            this.classList.add("zoomed")
            // Calculate zoom position based on tap location
            const rect = this.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const percentX = (x / rect.width) * 100
            const percentY = (y / rect.height) * 100
            this.style.transformOrigin = `${percentX}% ${percentY}%`
          }
        })
  
        slideElement.appendChild(img)
      }
  
      const messageFrame = document.createElement("div")
      messageFrame.classList.add("message-frame", "animated-text")
  
      // If the slide contains HTML, use it directly
      if (slide.text.includes("<")) {
        messageFrame.innerHTML = slide.text
      } else {
        // Otherwise, prepare for word-by-word animation
        messageFrame.innerHTML = slide.text
      }
  
      slideElement.appendChild(messageFrame)
      return slideElement
    }
  
    // Function to animate text word by word
    function animateText(element) {
      // Skip if this is the love letter slide or already has animated elements
      if (element.querySelector(".love-letter") || element.querySelector(".animated-word")) {
        return
      }
  
      const text = element.innerHTML
  
      // Handle emoji special cases
      const emojiRegex = /(\p{Emoji}+)/gu
      const words = text.split(/\s+/)
  
      let newHtml = ""
      let delay = 0.1
  
      words.forEach((word) => {
        // Check if the word contains an emoji
        if (emojiRegex.test(word)) {
          // Split the word to separate emojis
          const parts = word.split(emojiRegex)
          parts.forEach((part) => {
            if (emojiRegex.test(part)) {
              // This is an emoji
              newHtml += `<span class="emoji" style="animation-delay: ${delay}s">${part}</span> `
            } else if (part) {
              // This is text
              newHtml += `<span class="animated-word" style="animation-delay: ${delay}s">${part}</span> `
            }
            delay += 0.1
          })
        } else {
          // Regular word
          newHtml += `<span class="animated-word" style="animation-delay: ${delay}s">${word}</span> `
          delay += 0.1
        }
      })
  
      element.innerHTML = newHtml
    }
  
    // Create confetti effect
    function createConfettiEffect() {
      const confettiContainer = document.getElementById("confetti-container")
      if (!confettiContainer) return
  
      // Clear previous confetti
      confettiContainer.innerHTML = ""
  
      const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#ff8a5b", "#a5dee5", "#ff9ff3", "#feca57", "#48dbfb"]
      const confettiCount = 100
  
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div")
        confetti.className = "confetti"
  
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = Math.random() * 10 + 5
        const translateX = Math.random() * window.innerWidth
        const translateY = -Math.random() * 100
        const rotate = Math.random() * 360
        const fallDuration = Math.random() * 3 + 2
  
        // Apply styles
        confetti.style.backgroundColor = color
        confetti.style.width = `${size}px`
        confetti.style.height = `${size}px`
        confetti.style.left = `${translateX}px`
        confetti.style.top = `${translateY}px`
        confetti.style.transform = `rotate(${rotate}deg)`
        confetti.style.animationDuration = `${fallDuration}s`
  
        confettiContainer.appendChild(confetti)
  
        // Remove confetti after animation completes
        setTimeout(() => {
          confetti.remove()
        }, fallDuration * 1000)
      }
    }
  
    // Handle both click and touch events for iOS
    presentationView.addEventListener("click", advanceSlide)
    presentationView.addEventListener("touchend", (e) => {
      // Only advance if the target is not an image with zoomed class
      if (!e.target.classList || !e.target.classList.contains("zoomed")) {
        e.preventDefault() // Prevent default behavior
        advanceSlide()
      }
    })
  
    function advanceSlide() {
      currentSlideIndex++
      if (currentSlideIndex < slides.length) {
        showSlide(currentSlideIndex)
      } else {
        currentSlideIndex = 0
        showSlide(currentSlideIndex)
      }
  
      // Update progress bar
      updateProgressBar()
  
      // Reset the auto timer when user manually advances
      resetAutoSlideTimer()
  
      // Try to play audio if it was paused
      if (audio.paused) {
        audio.play().catch((error) => console.log("Audio play failed:", error))
      }
    }
  
    // Remove the autoplay button event listener and functions
    // Remove or comment out:
  
    // Remove the previous and next button event listeners
    // Remove or comment out:
  
    // Remove the theme selector event listener
    // Remove or comment out:
  
    // Remove the fullscreen button event listener
    // Remove or comment out:
  
    // Remove the share button event listener
    // Remove or comment out:
  
    // Optimize animations for mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  
    createStars()
    createFloatingElements()
  
    // Reduce animations on mobile
    if (!isMobile) {
      createFlowers()
      createHearts()
    }
  
    createAnimatedEmojis()
  
    // Create more decorative elements periodically
    // Use fewer animations on mobile
    let floatingInterval = setInterval(createFloatingElements, isMobile ? 8000 : 5000)
    let flowersInterval, heartsInterval
  
    if (!isMobile) {
      flowersInterval = setInterval(createFlowers, 3000)
      heartsInterval = setInterval(createHearts, 4000)
    }
  
    let emojisInterval = setInterval(createAnimatedEmojis, isMobile ? 10000 : 6000)
  
    // Clean up intervals when page is hidden
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearInterval(floatingInterval)
        if (flowersInterval) clearInterval(flowersInterval)
        if (heartsInterval) clearInterval(heartsInterval)
        clearInterval(emojisInterval)
        //stopAutoplay()
  
        // Pause audio when page is hidden
        audio.pause()
  
        // Stop auto slideshow when page is hidden
        if (autoSlideTimer) {
          clearInterval(autoSlideTimer)
        }
      } else {
        // Resume intervals when page is visible again
        createFloatingElements()
        if (!isMobile) {
          createFlowers()
          createHearts()
        }
        createAnimatedEmojis()
  
        // Resume intervals
        floatingInterval = setInterval(createFloatingElements, isMobile ? 8000 : 5000)
        if (!isMobile) {
          flowersInterval = setInterval(createFlowers, 3000)
          heartsInterval = setInterval(createHearts, 4000)
        }
        emojisInterval = setInterval(createAnimatedEmojis, isMobile ? 10000 : 6000)
  
        // Resume audio when page becomes visible again
        if (audio.paused) {
          audio.play().catch((error) => console.log("Audio play failed:", error))
        }
  
        // Resume auto slideshow when page becomes visible
        startAutoSlideshow()
      }
    })
  
    function createStars() {
      const starsContainer = document.getElementById("stars")
      if (!starsContainer) return
  
      // Fewer stars on mobile
      const numberOfStars = isMobile ? 50 : 100
  
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div")
        star.classList.add("star")
        star.style.width = `${Math.random() * 3}px`
        star.style.height = star.style.width
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        star.style.animationDuration = `${Math.random() * 2 + 1}s`
        star.style.animationDelay = `${Math.random() * 2}s`
        starsContainer.appendChild(star)
      }
    }
  
    function createFloatingElements() {
      const container = document.body
      const emojis = ["❤️", "🎂", "🎁", "🎈", "🎉", "🥳", "💖", "✨", "🌟", "😘", "🤗", "💕", "💓", "💞"]
  
      // Fewer elements on mobile
      const numberOfElements = isMobile ? 3 : Math.min(10, Math.floor(window.innerWidth / 100))
  
      for (let i = 0; i < numberOfElements; i++) {
        if (Math.random() > 0.5) {
          const emoji = document.createElement("div")
          emoji.classList.add("floating-emoji")
          emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
          emoji.style.left = `${Math.random() * 100}%`
          emoji.style.animationDuration = `${Math.random() * 10 + 10}s`
          emoji.style.setProperty("--random-x", `${Math.random() * 40 - 20}px`)
          container.appendChild(emoji)
  
          // Remove after animation
          setTimeout(() => {
            emoji.remove()
          }, Number.parseFloat(emoji.style.animationDuration) * 1000)
        } else {
          const balloon = document.createElement("div")
          balloon.classList.add("balloon")
          balloon.style.left = `${Math.random() * 100}%`
          balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`
          balloon.style.animationDuration = `${Math.random() * 10 + 15}s`
          balloon.style.setProperty("--random-x", `${Math.random() * 40 - 20}px`)
          container.appendChild(balloon)
  
          // Remove after animation
          setTimeout(() => {
            balloon.remove()
          }, Number.parseFloat(balloon.style.animationDuration) * 1000)
        }
      }
    }
  
    function createFlowers() {
      const flowersContainer = document.getElementById("flowers-container")
      if (!flowersContainer) return
  
      const flowerCount = 3
      const flowerTypes = ["🌸", "🌹", "🌺", "🌻", "🌼", "🌷", "💐", "🪷", "🌱", "🌿"]
  
      for (let i = 0; i < flowerCount; i++) {
        const flower = document.createElement("div")
        flower.classList.add("flower")
        flower.style.left = `${Math.random() * 100}%`
        flower.style.animationDuration = `${Math.random() * 15 + 20}s`
        flower.style.setProperty("--random-x", `${Math.random() * 40 - 20}px`)
        flower.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)]
  
        flowersContainer.appendChild(flower)
  
        // Remove flower after animation completes
        setTimeout(() => {
          flower.remove()
        }, Number.parseFloat(flower.style.animationDuration) * 1000)
      }
    }
  
    function createHearts() {
      const heartsContainer = document.getElementById("hearts-container")
      if (!heartsContainer) return
  
      const heartCount = 3
  
      for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement("div")
        heart.classList.add("heart")
        heart.innerHTML = '<i class="fas fa-heart"></i>'
        heart.style.left = `${Math.random() * 100}%`
        heart.style.animationDuration = `${Math.random() * 10 + 15}s`
        heart.style.setProperty("--random-x", `${Math.random() * 40 - 20}px`)
        heart.style.fontSize = `${Math.random() * 15 + 15}px`
        heartsContainer.appendChild(heart)
  
        // Remove heart after animation completes
        setTimeout(() => {
          heart.remove()
        }, Number.parseFloat(heart.style.animationDuration) * 1000)
      }
    }
  
    function createAnimatedEmojis() {
      const emojisContainer = document.getElementById("emojis-container")
      if (!emojisContainer) return
  
      // Fewer emojis on mobile
      const emojiCount = isMobile ? 3 : 5
      const emojis = [
        "🎂",
        "🎁",
        "🎈",
        "🎉",
        "🥳",
        "💖",
        "✨",
        "🌟",
        "😘",
        "🤗",
        "💕",
        "💓",
        "💞",
        "🎊",
        "🎇",
        "🎆",
        "🍰",
        "🧁",
      ]
  
      for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement("div")
        emoji.classList.add("animated-emoji")
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
        emoji.style.left = `${Math.random() * 90 + 5}%`
        emoji.style.top = `${Math.random() * 90 + 5}%`
        emoji.style.animationDuration = `${Math.random() * 3 + 2}s`
        emoji.style.fontSize = `${Math.random() * 20 + 20}px`
        emojisContainer.appendChild(emoji)
  
        // Remove emoji after some time to prevent cluttering
        setTimeout(() => {
          emoji.remove()
        }, 10000)
      }
    }
  
    // Add a click event to play music if it was blocked
    document.body.addEventListener(
      "click",
      () => {
        if (audio.paused) {
          audio.play().catch((error) => {
            console.log("Audio play failed:", error)
          })
        }
      },
      { once: true },
    )
  
    // Handle iOS-specific issues
  
    // Fix for iOS orientation changes
    window.addEventListener("orientationchange", () => {
      // Small timeout to let the orientation change complete
      setTimeout(() => {
        // Force redraw
        document.body.style.display = "none"
        document.body.offsetHeight // Trigger reflow
        document.body.style.display = ""
  
        // Recreate animations after orientation change
        document
          .querySelectorAll(".floating-emoji, .balloon, .flower, .heart, .animated-emoji")
          .forEach((el) => el.remove())
        createFloatingElements()
        if (!isMobile) {
          createFlowers()
          createHearts()
        }
        createAnimatedEmojis()
      }, 300)
    })
  
    // Fix for iOS scroll bounce
    document.body.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault()
      },
      { passive: false },
    )
  
    // Fix for iOS audio issues
    document.addEventListener(
      "touchstart",
      () => {
        if (audio.paused) {
          audio.play().catch((error) => console.log("Audio play failed:", error))
        }
      },
      { once: true },
    )
  
    // Initialize keyboard controls - keep only navigation
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          advanceSlide()
          break
        case "ArrowLeft":
          currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length
          showSlide(currentSlideIndex)
          updateProgressBar()
          break
      }
    })
  
    // Initialize swipe detection
    let touchStartX = 0
    let touchEndX = 0
  
    document.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      false,
    )
  
    document.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      false,
    )
  
    function handleSwipe() {
      const swipeThreshold = 50
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        advanceSlide()
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length
        showSlide(currentSlideIndex)
        updateProgressBar()
      }
    }
  })
  