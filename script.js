// Создать игру:

// Есть поле field, является экземпляром класса Field(width, height), предпочитаемые размеры 10 на 10.

// Есть герой person, класс Person(name, XPosition, YPosition)

// Поле являет собой двумерный массив, который состоит из нулей. Там где находится наш герой - стоит 1.

// Field имеет такие методы:
//     * renderField() - выводит поле в document, устанавливает разделители `<hr />` сверху и снизу
//     * clearField() - убирает героя с доски
//     * changeSize(newX, newY) - меняет размер поля

// Person имеет такие методы:
//     * start() - герой появляется на доске
//     * go(direction, step) - движение по переданом параметру (direction может быть: 'left', 'right', 'top', 'bottom') и с шагом step
//     * resetPosition() - перенос в начальную позицию
// Нужно самим решить какие методы получают аргументы, какие нет. Организовывать код можно любым образом.

// Вызов методов происходит из консоли.

// Суть такая:

// field.renderField();
// person.start();
// person.go('left', 2);
// person.go('top', 1);
// field.renderField();
// последовательно вызываются команды, renderField - отображает новую доску в document.
// В результате мы должны увидеть 2 нарисованных состояния поля.

function Field(width, height) {
  this.width = width;
  this.height = height;

  this.arr = new Array(this.width);
  for (let i = 0; i < this.width; i++) {
    this.arr[i] = new Array(this.height);
    for (let j = 0; j < this.arr[i].length; j++) {
      this.arr[i][j] = 0;
    }
  }
}
let field = new Field(10, 10);

Field.prototype.renderField = function () {
  document.write("<hr />");

  for (let i = 0; i < this.arr.length; i++) {
    for (let j = 0; j < this.arr[i].length; j++) {
      document.write(this.arr[i][j] + " ");
    }
    document.write("</br>");
  }

  document.write("<hr />");
};

Field.prototype.clearField = function () {
  for (let i = 0; i < this.arr.length; i++) {
    for (let j = 0; j < this.arr[i].length; j++) {
      this.arr[i][j] = 0;
    }
  }
  this.renderField();
};

Field.prototype.changeSize = function (newWidth, newHeight) {
  this.width = newWidth;
  this.height = newHeight;
  let arr = new Array(this.height);
  for (let i = 0; i < this.height; i++) {
    arr[i] = new Array(this.width);
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  this.arr = arr;
  this.renderField();
};

function Person(name, XPosition, YPosition) {
  this.name = name;
  this.XPosition = XPosition || 0;
  this.YPosition = YPosition || 0;
}

Person.prototype = Object.create(Field.prototype);

Person.prototype.start = function () {
  field.arr[this.XPosition][this.YPosition] = 1;
};

Person.prototype.go = function (direction, step) {
  field.arr[this.XPosition][this.YPosition] = 0;
  if (direction === "top") {
    this.YPosition -= step;
  } else if (direction === "bottom") {
    this.YPosition += step;
  } else if (direction === "left") {
    this.XPosition -= step;
  } else if (direction === "right") {
    this.XPosition += step;
  }

  field.arr[this.XPosition][this.YPosition] = 1;
  return this;
};

Person.prototype.resetPosition = function () {
  field.arr[this.XPosition][this.YPosition] = 0;
  this.XPosition = 0;
  this.YPosition = 0;
  field.arr[this.XPosition][this.YPosition] = 1;
};

let person = new Person("Mila", 7, 7);

// field.renderField();
// person.start();
// person.go("left", 2);
// person.go("top", 1);
// field.renderField();
// field.changeSize(15, 15);
// person.resetPosition();
// field.renderField();
