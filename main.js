(async function main() {
  const characters = "abcdefghijklmnopqrstuvwxyz!#$%&/()=?€@[]{}§";
  const elements = Array.from(document.querySelectorAll(".rotate-characters"));

  function rotateCharacters(event) {
    const element = event.currentTarget;
    if (!element.dataset.originalText) {
      element.dataset.originalText = element.innerText;
    }
    if (element.__rotate_characters_tid) {
      clearInterval(element.__rotate_characters_tid);
    }

    const originalText = element.dataset.originalText;
    let count = -1;

    element.__rotate_characters_tid = setTimeout(function func() {
      element.innerText = element.innerText
        .split("")
        .map((letter, index) => {
          if (index < count) {
            return originalText[index];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");

      count += 1 / 3;

      if (count < originalText.length) {
        setTimeout(func, 40);
      }
    }, 40);
  }

  elements.forEach((element) => {
    element.addEventListener("mouseover", rotateCharacters);
  });
})();
