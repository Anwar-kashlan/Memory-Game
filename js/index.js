document.querySelector(".control-btn span").onclick = function () {
  document.querySelector("#backSound").play();
  let yourName = prompt("What is your name");
  if (yourName == null || yourName == "") {
    document.querySelector(".info-contaner .name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".info-contaner .name span").innerHTML = yourName;
  }
  document.querySelector(".control-btn").remove();
};

let duration = 1000;

let boxsContenar = document.querySelector(".imgs-contenar");

let boxs = Array.from(boxsContenar.children);

let orderRang = [...Array(boxs.length).keys()];

shuffle(orderRang);

function flippedInStart(block) {
  block.classList.add("flipped");
  setTimeout(() => {
    block.classList.remove("flipped");
  }, 7000);
}

boxs.forEach((box, index) => {
  box.style.order = orderRang[index];
  flippedInStart(boxs[index]);
  box.addEventListener("click", function () {
    addFlipped(box);
  });
});

function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function addFlipped(selected) {
  selected.classList.add("flipped");
  let allFlippedBox = boxs.filter((flippedBox) =>
    flippedBox.classList.contains("flipped")
  );
  if (allFlippedBox.length === 2) {
    stopClicking();
    checkMatch(allFlippedBox[0], allFlippedBox[1]);
  }
}

function stopClicking() {
  boxsContenar.classList.add("stop-clicking");

  setTimeout(() => {
    boxsContenar.classList.remove("stop-clicking");
  }, duration);
}

function checkMatch(first, second) {
  let tries = document.querySelector(".info-contaner .tries span");

  if (first.dataset.teq === second.dataset.teq) {
    document.querySelector("#winSound").play();
    first.classList.remove("flipped");
    second.classList.remove("flipped");
    first.classList.add("match");
    second.classList.add("match");
  } else {
    document.querySelector("#failSound").play();
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
    }, duration);
  }
}
