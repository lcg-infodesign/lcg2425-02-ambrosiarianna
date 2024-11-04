function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  const message =
    "This is a template repository\nfor the course Laboratorio di Computergrafica\nCommunication Design, Politecnico di Milano";
  textAlign(CENTER, CENTER);
  textSize(16);
  text(message, width / 2, height / 2);
}

function draw() {
  background(255, 255, 0); // sfondo giallo

  // calcola le dimensioni della griglia in base allo schermo
  let gridSizeX = floor(width / 80); // Numero di colonne, basato sulla larghezza
  let gridSizeY = floor(height / 80); // Numero di righe, basato sull'altezza
  let cellSize = min(width / gridSizeX, height / gridSizeY); // dimensione delle celle

  // calcola l'offset (distanza aggiuntiva che serve a spostare la griglia al centro ) per centrarla, anzichè farla partire da in alto a sinistra
  let xOffset = (width - cellSize * gridSizeX) / 2; // sposta la griglia in orizzontale
  let yOffset = (height - cellSize * gridSizeY) / 2; // sposta la griglia in verticale

  // ciclo per creare la griglia
  for (let i = 0; i < gridSizeX; i++) {
    for (let j = 0; j < gridSizeY; j++) {
      push(); // salva la trasformazione 
      translate(i * cellSize + xOffset + cellSize / 2, j * cellSize + yOffset + cellSize / 2); // posiziona il centro di ciascuna cella
      rotate(random(TWO_PI)); // rotazione casuale

      // Genera un colore casuale per ogni glifo
      let glyphColor = color(random(255), random(255), random(255));
      stroke(glyphColor); // imposta colore del contorno

      drawGlyph(cellSize * random(0.4, 0.7)); //disegna il glifo con una dimensione casuale compresa tra 80 * 0.4 = 32 pixel e 80 * 0.7 = 56 pixel
      pop(); // ripristina la trasformazione precedente
    }
  }
}

function drawGlyph(size) {
  let numSquares = int(random(1, 3)); // determina casualmente quanti quadrati verranno disegnati per ogni glifo (1 o 2)

  for (let i = 0; i < numSquares; i++) {
    let squareSize = size * random(0.3, 0.5); // dimensione casuale del quadrato
    let offsetX = random(-size / 4, size / 4); // spostamento casuale lungo l'asse x
    let offsetY = random(-size / 4, size / 4); // spostamento casuale lungo l'asse y
    
    // scelta casuale dei lati da disegnare
    // ogni variabile (drawLeft, drawRight, drawTop, drawBottom) rappresenta uno dei lati del quadrato
    //se il numero generato casualmente è > 0.5, è true e il lato verrà disegnato
    //se il numero generato casualmente è < o = 0.5, è false e il lato NON verrà disegnato
    let drawLeft = random() > 0.5;
    let drawRight = random() > 0.5;
    let drawTop = random() > 0.5;
    let drawBottom = random() > 0.5;

    strokeWeight(2); // Imposta lo spessore del contorno
    noFill(); // no riempimento quadrato 

    //disegna i lati del quadrato in base alle scelte casuali ottenute in precedenza 
    if (drawLeft) { //se drawLeft è risultato vero
      line(offsetX - squareSize / 2, offsetY - squareSize / 2, offsetX - squareSize / 2, offsetY + squareSize / 2); // disegna il lato sinistro
      // offsetX e offsetY posizionano la linea nella giusta area della cella (x,y)
      // squareSize / 2 disegna ogni lato del quadrato lungo metà della cella
    }
    if (drawRight) {
      line(offsetX + squareSize / 2, offsetY - squareSize / 2, offsetX + squareSize / 2, offsetY + squareSize / 2); // disegna il lato destro
    }
    if (drawTop) {
      line(offsetX - squareSize / 2, offsetY - squareSize / 2, offsetX + squareSize / 2, offsetY - squareSize / 2); // disegna il lato superiore
    }
    if (drawBottom) {
      line(offsetX - squareSize / 2, offsetY + squareSize / 2, offsetX + squareSize / 2, offsetY + squareSize / 2); // disegna il lato inferiore
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // ridimensiona la tela quando cambia la finestra
  redraw(); // ridisegna la griglia dopo il ridimensionamento
}

