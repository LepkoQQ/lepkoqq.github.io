// rotate characters on hover
(async function () {
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

// scroll text rows
(async function () {
  const characters = "01";
  const element = document.querySelector(".scroll-rows");

  function fillRows() {
    const height = Number.parseInt(window.getComputedStyle(element).height, 10);
    const maxRows = (height / (11 * 1.5)) * 0.7;
    element.innerText = "";

    for (let i = 0; i < maxRows; i++) {
      const row = document.createElement("div");
      row.innerText = "c"
        .repeat(50)
        .split("")
        .map((c) => characters[Math.floor(Math.random() * characters.length)])
        .join("");
      element.appendChild(row);
    }
  }

  fillRows();
  window.addEventListener("resize", () => {
    fillRows();
  });

  setInterval(() => {
    element.appendChild(element.firstElementChild);
  }, 120);
})();
