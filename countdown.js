document.addEventListener("DOMContentLoaded", () => {
  console.log("Countdown script loaded")

  // Target date: May 26, 2025 at 12:00 AM (midnight)
  const targetDate = new Date("2026-03-11T00:00:00").getTime()

  // Get countdown elements
  const countdownContainer = document.getElementById("countdown-container")
  const mainWebsite = document.getElementById("main-website")
  const daysElement = document.getElementById("days")
  const hoursElement = document.getElementById("hours")
  const minutesElement = document.getElementById("minutes")
  const secondsElement = document.getElementById("seconds")

  // Check if target date has passed
  function checkTargetDate() {
    const now = new Date().getTime()
    const timeRemaining = targetDate - now

    if (timeRemaining <= 0) {
      // Target date has passed, show main website
      showMainWebsite()
      return false
    }
    return true
  }

  // Show main website
  function showMainWebsite() {
    console.log("Target date reached! Showing main website...")
    document.body.classList.add("countdown-complete")
    document.body.classList.remove("countdown-active")

    // Start the main website script
    if (typeof window.initMainWebsite === "function") {
      window.initMainWebsite()
    }
  }

  // Update countdown timer
  function updateCountdown() {
    const now = new Date().getTime()
    const timeRemaining = targetDate - now

    if (timeRemaining <= 0) {
      showMainWebsite()
      return
    }

    // Calculate time units
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

    // Update display with leading zeros
    daysElement.textContent = days.toString().padStart(3, "0")
    hoursElement.textContent = hours.toString().padStart(2, "0")
    minutesElement.textContent = minutes.toString().padStart(2, "0")
    secondsElement.textContent = seconds.toString().padStart(2, "0")

    // Add special effects when getting close
    if (days === 0 && hours === 0 && minutes < 10) {
      document.querySelector(".countdown-timer").style.animation = "pulse 0.5s infinite"
    }

    if (days === 0 && hours === 0 && minutes === 0 && seconds <= 10) {
      document.querySelector(".countdown-content").style.animation = "shake 0.5s infinite"
    }
  }

  // Add shake animation for final countdown
  const style = document.createElement("style")
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
  `
  document.head.appendChild(style)

  // Initialize
  if (checkTargetDate()) {
    // Show countdown
    document.body.classList.add("countdown-active")
    document.body.classList.remove("countdown-complete")

    // Update countdown immediately
    updateCountdown()

    // Update countdown every second
    const countdownInterval = setInterval(() => {
      updateCountdown()

      // Check if we should stop the countdown
      if (!checkTargetDate()) {
        clearInterval(countdownInterval)
      }
    }, 1000)

    console.log("Countdown active until May 26, 2025 12:00 AM")
  } else {
    // Target date has passed, show main website immediately
    showMainWebsite()
  }

  // Add floating hearts periodically
  function createFloatingHeart() {
    const heart = document.createElement("div")
    heart.innerHTML = "💖"
    heart.style.position = "absolute"
    heart.style.fontSize = "1.5rem"
    heart.style.left = Math.random() * 100 + "%"
    heart.style.bottom = "-50px"
    heart.style.animation = "floatHeart 8s linear forwards"
    heart.style.pointerEvents = "none"
    heart.style.zIndex = "1"

    document.querySelector(".floating-hearts").appendChild(heart)

    // Remove heart after animation
    setTimeout(() => {
      heart.remove()
    }, 8000)
  }

  // Create floating hearts periodically
  if (document.body.classList.contains("countdown-active")) {
    setInterval(createFloatingHeart, 3000)
  }

  // Add some confetti effect for the countdown
  function createConfetti() {
    const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#ff8a5b", "#a5dee5"]
    const confettiContainer = document.querySelector(".countdown-background")

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div")
      confetti.style.position = "absolute"
      confetti.style.width = "10px"
      confetti.style.height = "10px"
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.left = Math.random() * 100 + "%"
      confetti.style.top = "-10px"
      confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`
      confetti.style.opacity = "0.8"

      confettiContainer.appendChild(confetti)

      setTimeout(() => {
        confetti.remove()
      }, 5000)
    }
  }

  // Add confetti fall animation
  const confettiStyle = document.createElement("style")
  confettiStyle.textContent = `
    @keyframes confettiFall {
      0% {
        transform: translateY(0) rotate(0deg);
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
      }
    }
  `
  document.head.appendChild(confettiStyle)

  // Create confetti every 10 seconds during countdown
  if (document.body.classList.contains("countdown-active")) {
    setInterval(createConfetti, 10000)
    // Create initial confetti
    setTimeout(createConfetti, 2000)
  }

  // Debug: Add a way to test the website (remove in production)
  // Uncomment the line below to bypass countdown for testing
  // showMainWebsite()
})
