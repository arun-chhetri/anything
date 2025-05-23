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
  
    const slides = [
      {
        image: "A.jpg",
        text: "Today is special because it's the day the world was blessed with the person who owns my heart! Happy Birthday, my love. 🌟",
      },
      { image: "B.jpg", text: "Happy birthday, my love! 💖 Your smile lights up my world every day. 🌟" },
      {
        image: "C.jpg",
        text: "With every passing year,💖 your beauty, wisdom, and love grow even more. I'm so blessed to have you in my life. 🌟",
      },
      {
        image: "D.jpg",
        text: "This day feels incomplete without you 💖, but my love is always whole. On your birthday, I wish all your dreams come true and that we reunite soon. 🌟",
      },
      {
        image: "E.jpg",
        text: "Happy Birthday, my love! Even though we're far apart, my heart 💖is always with you. Your smile and happiness are the greatest gifts to me. 🌟",
      },
      {
        image: "F.jpg",
        text: "The biggest gift I have for you on your birthday is my love, which no distance can ever diminish 🌟",
      },
      {
        image: "O.jpg",
        text: "Wherever you go, my love 😘 is always with you. The day you smile while looking into my eyes will always be my happiest day. Happy Birthday, my love. 🎈🎁",
      },
      {
        image: "H.jpg",
        text: "you are the sweetest song😘, the most beautiful poem, and the dearest dream of my life. Today is your birthday, but for me, you are special every single day. 🎈🎁",
      },
      {
        image: "G.jpg",
        text: "You are like the moon—no matter how far😘 , my eyes are always searching for you. May your smile shine as brightly as the moon tonight! Happy Birthday, my love. 🎈🎁",
      },
      {
        image: "J.jpg",
        text: "Happy Birthday, my beautiful 😘You're officially a year older, but don't worry—I'm already old, so now we look like the perfect couple 🎈🎁",
      },
      {
        image: "K.jpg",
        text: "Happy Birthday, my love 😘 As you grow older, you somehow look even more beautiful. Want to know a secret? One day, I might get old, but in my eyes, you'll always be 18 🎈🎁",
      },
      { image: "L.jpg", text: "You're not just a year older, but a year more wonderful. Happy birthday! 🎊🥳" },
      {
        image: "M.jpg",
        text: "Your birthday is here, yet I can't hold your hand or look into your eyes to say 'Happy Birthday.' Even though we're apart, my heart beats only for you. Today, I celebrate you by loving you even more from afar.",
      },
      {
        image: "N.jpg",
        text: "No matter how far I am, my love 💖 is always right beside you. My biggest wish on your birthday is to hold your hand and celebrate together, and I know that day will come soon 💖",
      },
      {
        image: "I.jpg",
        text: "Happy Birthday 😘, my sexy beauty! You shine like the moon and burn like fire—you drive me crazy.",
      },
      { image: "P.jpg", text: "Wishing you a day filled with joy, laughter, and unforgettable moments. 🎈🎁" },
      {
        image: "Q.jpg",
        text: "Today is your birthday 💖, but for me, it's both the happiest and the saddest day—happy because this day gave the world someone as precious as you, and sad because I can't be there to celebrate it with you 🎈🎁",
      },
      {
        text: `
          <div class="love-letter">
            <div class="letter-title">My Dearest Rajani babe,</div>
            <div class="letter-paragraph">On this special day, I want to pour my heart out to you. <span class="heart-text">💖</span> From the moment you entered my life, everything became brighter, more colorful, and filled with joy. <span class="highlight">🌈✨</span></div>
            <div class="letter-paragraph">Your love is the greatest gift I could ever ask for. Your smile warms my heart, your laughter is my favorite melody, and your presence makes every day feel like a celebration. <span class="highlight">🎉🥰</span></div>
            <div class="letter-paragraph">As you blow out the candles on your cake today, know that my wish is for all of your dreams to come true. You deserve the world, and I promise to be by your side, supporting you, loving you, and cherishing every moment we share. <span class="highlight">🎂💫</span></div>
            <div class="letter-paragraph">Happy Birthday, my love. Here's to another year of adventures, laughter, and endless love. <span class="highlight">🥂💑</span></div>
            <div class="letter-signature">Forever yours,<br>Arun Kunwar <span class="heart-text">❤️</span></div>
          </div>
        `,
      },
    ]
  
    let currentSlideIndex = 0
    let autoplayInterval = null
    let isAutoPlaying = false
  
    // Update progress bar
    function updateProgressBar() {
      const progress = ((currentSlideIndex + 1) / slides.length) * 100
      progressFill.style.width = `${progress}%`
      document.getElementById("slideCounter").textContent = `${currentSlideIndex + 1}/${slides.length}`
    }
  
    // Start presentation immediately
    showSlide(currentSlideIndex)
    updateProgressBar()
  
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
  
      // Stop music if it's the last slide
      if (index === slides.length - 1) {
        setTimeout(() => {
          audio.pause() // Stop the music
          audio.currentTime = 0 // Reset music to the beginning
        }, 1000) // Wait for the slide transition to complete
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
  
      // Try to play audio if it was paused
      if (audio.paused) {
        audio.play().catch((error) => console.log("Audio play failed:", error))
      }
    }
  
    // Toggle autoplay
    document.getElementById("autoplayBtn").addEventListener("click", function () {
      if (isAutoPlaying) {
        stopAutoplay()
        this.innerHTML = '<i class="fas fa-play"></i>'
        this.classList.remove("active")
      } else {
        startAutoplay()
        this.innerHTML = '<i class="fas fa-pause"></i>'
        this.classList.add("active")
      }
    })
  
    function startAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval)
      autoplayInterval = setInterval(advanceSlide, 5000) // Change slide every 5 seconds
      isAutoPlaying = true
    }
  
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval)
        autoplayInterval = null
      }
      isAutoPlaying = false
    }
  
    // Previous slide button
    document.getElementById("prevBtn").addEventListener("click", () => {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length
      showSlide(currentSlideIndex)
      updateProgressBar()
    })
  
    // Next slide button
    document.getElementById("nextBtn").addEventListener("click", () => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length
      showSlide(currentSlideIndex)
      updateProgressBar()
    })
  
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
        stopAutoplay()
  
        // Pause audio when page is hidden
        audio.pause()
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
  
    // Initialize volume control
    const volumeControl = document.getElementById("volumeControl")
    volumeControl.addEventListener("input", function () {
      audio.volume = this.value / 100
  
      // Update volume icon
      const volumeIcon = document.getElementById("volumeIcon")
      if (this.value == 0) {
        volumeIcon.className = "fas fa-volume-mute"
      } else if (this.value < 50) {
        volumeIcon.className = "fas fa-volume-down"
      } else {
        volumeIcon.className = "fas fa-volume-up"
      }
    })
  
    // Initialize music selection
    const musicSelector = document.getElementById("musicSelector")
    musicSelector.addEventListener("change", function () {
      const selectedMusic = this.value
      audio.src = selectedMusic
      audio.play().catch((error) => console.log("Audio play failed:", error))
    })
  
    // Initialize theme selection
    const themeSelector = document.getElementById("themeSelector")
    themeSelector.addEventListener("change", function () {
      document.body.className = ""
      document.body.classList.add(this.value)
    })
  
    // Initialize text-to-speech
    const speakButton = document.getElementById("speakBtn")
    speakButton.addEventListener("click", () => {
      const currentSlide = slides[currentSlideIndex]
      let textToSpeak = ""
  
      if (currentSlide.text.includes("<")) {
        // Extract text from HTML
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = currentSlide.text
        textToSpeak = tempDiv.textContent
      } else {
        textToSpeak = currentSlide.text
      }
  
      // Stop any current speech
      window.speechSynthesis.cancel()
  
      // Create speech
      const speech = new SpeechSynthesisUtterance(textToSpeak)
      speech.lang = "en-US"
      speech.volume = audio.volume // Match audio volume
      speech.rate = 1
      speech.pitch = 1
  
      // Speak
      window.speechSynthesis.speak(speech)
    })
  
    // Initialize fullscreen toggle
    const fullscreenBtn = document.getElementById("fullscreenBtn")
    fullscreenBtn.addEventListener("click", function () {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.log(`Error attempting to enable fullscreen: ${err.message}`)
        })
        this.innerHTML = '<i class="fas fa-compress"></i>'
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
          this.innerHTML = '<i class="fas fa-expand"></i>'
        }
      }
    })
  
    // Initialize share functionality
    const shareBtn = document.getElementById("shareBtn")
    if (navigator.share) {
      shareBtn.style.display = "block"
      shareBtn.addEventListener("click", async () => {
        try {
          await navigator.share({
            title: "Happy Birthday!",
            text: "Check out this special birthday message I made for you!",
            url: window.location.href,
          })
          console.log("Content shared successfully")
        } catch (err) {
          console.log("Error sharing: ", err)
        }
      })
    } else {
      shareBtn.style.display = "none"
    }
  
    // Initialize keyboard controls
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
        case "f":
          fullscreenBtn.click()
          break
        case "p":
          document.getElementById("autoplayBtn").click()
          break
        case "m":
          const vol = volumeControl.value > 0 ? 0 : 50
          volumeControl.value = vol
          audio.volume = vol / 100
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
  