  let audioCtx = null;
    const visualizer = document.getElementById("visualizer"); 

    let currentTimeout = null;

    const array = generateRandomArray(40);
    generateBars(array, visualizer);

    function generateRandomArray(size) {
      const arr = new Array(size);
      for (let i = 0; i < size; i++) {
        arr[i] = Math.random();
      }
      return arr;
    }

    function generateBars(array, container) {
      container.innerHTML = "";
      for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * 100 + "%";
        container.appendChild(bar);
      }
    }

    function playNote(freq){
      if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const dur = 0.1;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      gain.gain.value = 0.1;
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
      osc.frequency.value = freq;
      osc.start();
      osc.stop(audioCtx.currentTime + dur);
    }

    function swapHeights([i, j], container) {
      const bars = container.children;
      const temp = bars[i].style.height;
      bars[i].style.height = bars[j].style.height;
      bars[j].style.height = temp;

      for (const bar of bars) bar.style.backgroundColor = "#3498db";
      bars[i].style.backgroundColor = "red";
      bars[j].style.backgroundColor = "red";
    }

    function animate(swaps, arr) {
      if (swaps.length === 0) return;
      const indices = swaps.shift();
      swapHeights(indices, visualizer);

      const [i, j] = indices;
      playNote(200 + arr[i] * 500); 
      playNote(200 + arr[j] * 500);

      currentTimeout = setTimeout(() => animate(swaps, arr), 50);
    }

    function bubbleSort(array) {
      const swaps = [];
      let somethingChanged;
      do {
        somethingChanged = false;
        for (let i = 1; i < array.length; i++) {
          if (array[i - 1] > array[i]) {
            [array[i - 1], array[i]] = [array[i], array[i - 1]];
            swaps.push([i - 1, i]);
            somethingChanged = true;
          }
        }
      } while (somethingChanged);
      return swaps;
    }

    function insertionSort(array) {
      const swaps = [];
      for (let i = 1; i < array.length; i++) {
        let j = i;
        while (j > 0 && array[j - 1] > array[j]) {
          [array[j - 1], array[j]] = [array[j], array[j - 1]];
          swaps.push([j - 1, j]);
          j--;
        }
      }
      return swaps;
    }

  
    function resetAnimation() {
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }
}

    document.getElementById("bubbleBtn").addEventListener("click", () => {
       resetAnimation();
      const arrCopy = array.slice();
      generateBars(arrCopy, visualizer);
      const swaps = bubbleSort(arrCopy.slice());
      animate(swaps, arrCopy);
    });

    document.getElementById("insertionBtn").addEventListener("click", () => {
       resetAnimation();
      const arrCopy = array.slice();
      generateBars(arrCopy, visualizer);
      const swaps = insertionSort(arrCopy.slice());
      animate(swaps, arrCopy);
    });