const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
  }

  get field() {
    return this._field;
  }

  print() {
    for (let i = 0; i < this._field.length; i++) {
      console.log(this._field[i].join(""));
    }
  }
  //*,░,O░,O,░░,^,░

  //*░O
  //░O░
  //░^░

  fieldOutside(i, j, end_loop) {
    if (i < 0 || j < 0) {
      console.log("The game is over because you are out of the field.");
      end_loop = 1;
      return end_loop;
    }
    return 0;
  }

  setField(i, j, end_loop) {
    if (this._field[i][j] === hole) {
      console.log("Sorry, you fell into the hole");
      end_loop = 1;
      return end_loop;
    } else if (this._field[i][j] === hat) {
      console.log("Congrat! you found your hat");
      end_loop = 1;
      return end_loop;
    }
    this._field[i][j] = "*";
  }

  play() {
    let end_loop = 0;
    let i = 0;
    let j = 0;
    while (end_loop != 1) {
      const insert = prompt("Which way? ");

      switch (insert) {
        case "u":
          i--;
          end_loop = this.fieldOutside(i, j, end_loop);
          break;
        case "d":
          i++;
          end_loop = this.fieldOutside(i, j, end_loop);
          break;
        case "l":
          j--;
          end_loop = this.fieldOutside(i, j, end_loop);
          break;
        case "r":
          j++;
          end_loop = this.fieldOutside(i, j, end_loop);
          break;
        default:
          console.log("Only u, d, l and r keys can be entered.");
          end_loop = 1;
      }

      if (i >= 0 && j >= 0) {
        end_loop = this.setField(i, j, end_loop);
      }

      if (end_loop != 1) {
        this.print();
      }
    }
  }
  //incomplete generateField
  static generateField(rows, columns, percentage) {
    let arr = new Array(rows);
    let holeCount = Math.floor(rows * columns * (percentage / 100));
    console.log(holeCount);

    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(columns).fill(fieldCharacter);
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 1; j < columns; j++) {
        arr[i][j] = hole;
        holeCount--;
        if (holeCount <= 0) {
          break;
        }
      }
      if (holeCount <= 0) {
        break;
      }
    }

    arr.sort(() => Math.random() - 0.5);
    arr[rows - 1][columns - 1] = hat;
    arr[0][0] = pathCharacter;
    return arr;
  }
}

const myField = new Field([
  [pathCharacter, fieldCharacter, hole],
  [fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, hat, fieldCharacter],
]);

//const arr = Field.generateField(5, 3, 30);
//console.log(arr);
myField.print();
myField.play();
