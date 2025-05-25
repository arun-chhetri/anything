document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded")

  // Single background music element for index page
  const audio = document.getElementById("backgroundMusic")

  // Try to play audio with multiple strategies
  const playAudio = async () => {
    try {
      // Set volume to a comfortable level
      audio.volume = 0.3
      // Try to play using the Promise-based API
      await audio.play()
      console.log("Happy Birthday audio playing successfully on index page")
    } catch (error) {
      console.log("Autoplay prevented on index page:", error)
      // Don't show any prompt, just wait for user interaction
    }
  }

  // Try to play audio immediately
  setTimeout(() => {
    playAudio()
  }, 1000) // Small delay to ensure page is fully loaded

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

  // Also try to play when document becomes visible if it was loaded in background
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && audio.paused) {
      playAudio()
    }
  })

  // Elements
  const date__of__birth = document.querySelector(".date__of__birth span")

  // Get the button element
  const btnLetter = document.getElementById("btn__letter")
  console.log("Button element:", btnLetter)

  // Detect device type
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  const isAndroid = /Android/i.test(navigator.userAgent)

  // Add appropriate event listeners based on device
  if (btnLetter) {
    // For iOS devices
    if (isIOS) {
      btnLetter.addEventListener("touchend", (e) => {
        e.preventDefault() // Prevent default behavior
        console.log("Button touched (iOS)")
        navigateToCelebration()
      })
    }

    // For Android devices
    if (isAndroid) {
      btnLetter.addEventListener("touchend", (e) => {
        console.log("Button touched (Android)")
        navigateToCelebration()
      })
    }

    // Keep click for all devices as fallback
    btnLetter.addEventListener("click", () => {
      console.log("Button clicked")
      navigateToCelebration()
    })
  }

  function navigateToCelebration() {
    // Add a visual feedback for the button press
    btnLetter.classList.add("pressed")

    // Fade out the current music
    if (audio && !audio.paused) {
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.1) {
          audio.volume -= 0.1
        } else {
          audio.volume = 0
          audio.pause()
          clearInterval(fadeOut)
        }
      }, 100)
    }

    // Navigate after a short delay to show the button animation
    setTimeout(() => {
      // Store a flag that user clicked the button (for music autoplay)
      sessionStorage.setItem("userInteracted", "true")
      window.location.href = "celebration.html"
    }, 300)
  }

  // Date display animation
  const datetxt = "2082 Jestha 12 "
  const charArrDate = datetxt.split("")
  let currentIndex = 0

  setTimeout(() => {
    console.log("Starting date animation")
    const timeDatetxt = setInterval(() => {
      if (currentIndex < charArrDate.length) {
        date__of__birth.textContent += charArrDate[currentIndex]
        currentIndex++
      } else {
        const i = document.createElement("i")
        i.className = "fa-solid fa-star"
        document.querySelector(".date__of__birth").prepend(i)
        document.querySelector(".date__of__birth").appendChild(i.cloneNode(true))
        clearInterval(timeDatetxt)
      }
    }, 100)
  }, 12000)

  // Fix for mobile scroll bounce
  if (isMobile) {
    document.body.addEventListener(
      "touchmove",
      (e) => {
        if (e.target === document.body) {
          e.preventDefault()
        }
      },
      { passive: false },
    )
  }

  // Fix for orientation changes
  window.addEventListener("orientationchange", () => {
    // Small timeout to let the orientation change complete
    setTimeout(() => {
      // Force redraw
      document.body.style.display = "none"
      document.body.offsetHeight // Trigger reflow
      document.body.style.display = ""
    }, 300)
  })

  // Add device-specific classes to the body
  if (isMobile) {
    document.body.classList.add("mobile-device")

    if (isIOS) {
      document.body.classList.add("ios-device")
    }

    if (isAndroid) {
      document.body.classList.add("android-device")
    }
  }

  // Optimize animations based on device capability
  if (isMobile) {
    // Reduce animations on mobile
    document.documentElement.style.setProperty("--animation-speed", "0.8")
  } else {
    // Full animations on desktop
    document.documentElement.style.setProperty("--animation-speed", "1")
  }

  // Handle visibility changes to pause animations when tab is not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.body.classList.add("page-hidden")
    } else {
      document.body.classList.remove("page-hidden")
    }
  })

  // Check if the device is a low-end device
  const isLowEndDevice = () => {
    // Check for low memory (if available)
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
      return true
    }

    // Check for low-end processors (if available)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      return true
    }

    return false
  }

  // Optimize for low-end devices
  if (isLowEndDevice()) {
    document.body.classList.add("low-end-device")

    // Reduce or disable some animations
    document.documentElement.style.setProperty("--animation-speed", "0.6")

    // Hide some decorative elements
    const decorativeElements = document.querySelectorAll(
      ".decorate_star, .decorate_flower--one, .decorate_flower--two, .decorate_flower--three",
    )
    decorativeElements.forEach((el) => {
      el.style.display = "none"
    })
  }
})
