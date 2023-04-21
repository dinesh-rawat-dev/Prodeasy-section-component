import { fabric } from "fabric";
import "./styles.css";

const el = document.getElementById("canvas");
const canvas = (window.canvas = new fabric.Canvas(el));
canvas.setDimensions({
  width: 1000,
  height: 1000
});

canvas.uniformScaling = false;
canvas.preserveObjectStacking = true;

fabric.charWidthsCache = {};
fabric.Object.prototype.borderScaleFactor = 1;
fabric.Object.prototype.strokeDashArray = null;
fabric.textureSize = 2048;
fabric.Object.prototype.objectCaching = false;
fabric.Object.prototype.strokeWidth = 0;
// fabric.Object.prototype.noScaleCache = true;
// fabric.Object.prototype.lockScalingFlip = true;
fabric.Object.prototype.uniformScaling = false;
fabric.Textbox.prototype.setControlsVisibility({
  mr: false,
  mt: false,
  ml: false,
  mb: false
});
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = "#FFFFFF";
fabric.Object.prototype.cornerStrokeColor = "transparent";
fabric.Object.prototype.cornerSize = 10;

fabric.Object.prototype.cornerStrokeColor = "#573DF4";
fabric.Object.prototype.borderColor = "#573DF4";
fabric.Object.prototype.fill = "#FFFFFF";
fabric.Object.prototype.cornerStyle = "circle";
fabric.Object.prototype.cornerRadius = 8;
fabric.Object.prototype.borderOpacityWhenMoving = 0.3;
fabric.Object.prototype.snapAngle = 90;
fabric.Object.prototype.snapThreshold = 5;
fabric.Object.prototype.charWidthsCache = {};
fabric.Object.prototype.strokeUniform = true;
fabric.Object.prototype.diffY = 0;
fabric.Object.prototype.diffX = 0;
fabric.Line.prototype.diffY = 0;
fabric.Line.prototype.diffX = 0;
fabric.Object.prototype.intersectsWithFrame = false;
fabric.Text.prototype.intersectsWithFrame = false;
fabric.Triangle.prototype.diffY = 0;
fabric.Triangle.prototype.diffX = 0;
fabric.Textbox.prototype.diffY = 0;
fabric.Textbox.prototype.diffX = 0;
fabric.Textbox.prototype.strokeUniform = true;
fabric.Textbox.prototype.editingBorderColor = "#573DF4";
fabric.Textbox.prototype.cursorColor = "#573DF4";

fabric.Textbox.prototype.fontSize = 24;
fabric.Textbox.prototype.padding = 1;

fabric.Textbox.prototype.isWrapping = true;

fabric.Object.prototype.NUM_FRACTION_DIGITS = 10;
fabric.Object.prototype.preserveObjectStacking = true;
fabric.Textbox.prototype.cursorWidth = 2;
fabric.TextboxWithPadding = fabric.util.createClass(fabric.Textbox, {
  type: "textbox",
  strokeWidth: 5, // Define stroke width
  strokeColor: "#ffb64f", // Define stroke color
  splitByGrapheme: true,
  rx: 0, // Define rx value for rounded corners on x-axis
  ry: 0, // Define ry value for rounded corners on y-axis
  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      backgroundColor: this.get("backgroundColor"),
      padding: this.get("padding"),
      splitByGrapheme: this.get("splitByGrapheme"),
      rx: this.get("rx"),
      ry: this.get("ry")
    });
  },

  _renderBackground: function (ctx) {
    if (!this.backgroundColor) {
      return;
    }
    var dim = this._getNonTransformedDimensions();
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(
      -dim.x / 2 - this.padding,
      -dim.y / 2 - this.padding,
      dim.x + this.padding * 2,
      dim.y + this.padding * 2
    );
    // Add stroke only at the top
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.strokeWidth;
    ctx.beginPath();
    ctx.moveTo(-dim.x / 2 - this.padding, -dim.y / 2 - this.padding);
    ctx.lineTo(-dim.x / 2 - this.padding, dim.y / 2 + this.padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 0.2; // Set line width to 1
    ctx.lineTo(dim.x / 2 + this.padding, -dim.y / 2 - this.padding + 1);
    ctx.lineTo(dim.x / 2 + this.padding, dim.y / 2 + this.padding - 1);
    ctx.strokeStyle = "#9181fc";

    ctx.lineWidth = 0.2; // Set line width to 1
    ctx.lineTo(dim.x / 2 + this.padding - 1, dim.y / 2 + this.padding);
    ctx.lineTo(-dim.x / 2 - this.padding + 1, dim.y / 2 + this.padding);
    ctx.strokeStyle = "#9181fc";

    ctx.lineWidth = 0.2; // Set line width to 1
    ctx.lineTo(-dim.x / 2 - this.padding, dim.y / 2 + this.padding - 1);
    ctx.lineTo(-dim.x / 2 - this.padding, -dim.y / 2 - this.padding + 1);
    ctx.closePath();

    ctx.stroke();

    // if there is background color no other shadows
    // should be casted
    this._removeShadow(ctx);
  }
});

let rectHeight = 200;
var rect = new fabric.Rect({
  left: 50,
  top: 100,
  fill: "#F8F8F8",
  width: 300,
  height: rectHeight,
  stroke: "black",
  strokeWidth: 1,
  originX: "left",
  originY: "top",
  id: Date.now()
});

var textbox = new fabric.TextboxWithPadding("Input field", {
  left: rect.left + 15,
  top: rect.top + 30,
  width: rect.width - 35,
  height: 30,
  fontSize: 16,
  fill: "black",
  backgroundColor: "#ffffff",
  borderColor: "#9181fc",
  //@ts-ignore
  originalWidth: rect.width - 35,
  originalTop: rect.top + 30,
  padding: 5,
  id: Date.now()
});
canvas.add(rect);
canvas.add(textbox);
textbox.setControlsVisibility({
  mtr: false,
  tr: false,
  tl: false,
  bl: false,
  br: false
});

textbox.set({
  //@ts-ignore
  originalWidth: rect.width,
  originalHeight: 30,
  originalTop: 110
});
var addButton = new fabric.Rect({
  left: rect.left,
  top: rect.top + rect.getScaledHeight() + 30,
  fill: "#E7E7E7",
  width: 60,
  height: 30,
  stroke: "black",
  strokeWidth: 0,
  corneradius: 5,
  className: "addButton"
});

var addText = new fabric.Text("+ Add", {
  left: addButton.left + addButton.getScaledWidth() / 2,
  top: addButton.top + addButton.getScaledHeight() / 2,
  fontSize: 14,
  fill: "#000000",
  originX: "center",
  originY: "center",
  //@ts-ignore
  id: Date.now()
});

var group = new fabric.Group([addButton, addText], {
  left: rect.left,
  top: rect.top + rect.getScaledHeight() + 30,
  originX: "left",
  originY: "center",
  subTargetCheck: true,
  lockMovementX: true,
  lockMovementY: true,
  lockScalingX: true,
  lockScalingY: true,
  hasControls: false,
  hasBorders: false,
  hoverCursor: "pointer",
  //@ts-ignore
  id: Date.now()
});

canvas.add(group);

var lastTextboxY = textbox.top + textbox.getScaledHeight() + 30;

function showControls() {
  const obj = canvas.getActiveObject();
  if (obj && obj.type === "textbox") {
    if (rect.intersectsWithObject(obj, true, true)) {
      console.log("I am here....22");
      obj.setControlsVisibility({
        mtr: false,
        tr: false,
        tl: false,
        bl: false,
        br: false
      });
      obj.set({
        borderColor: "#9181fc"
      });
      obj.setCoords();
      canvas.requestRenderAll();
      return obj;
    } else {
      obj.setControlsVisibility({
        mtr: true,
        tr: true,
        tl: true,
        bl: true,
        br: true
      });
      obj.set({
        borderColor: "#cccccc"
      });
      obj.setCoords();
      canvas.requestRenderAll();
    }
  }
}
function repositionSectionTextboxes() {
  showControls();
  // Get all the textboxes on the canvas
  const textboxes = canvas
    .getObjects()
    .filter(
      (obj) =>
        obj.type === "textbox" && rect.intersectsWithObject(obj, true, true)
    );

  // Sort the textboxes by their top position
  textboxes.sort(function (a, b) {
    return a.top - b.top;
  });

  // Set the top position of each textbox to create an equal gap between them
  let topPosition = rect.top + 30;

  textboxes.forEach(function (obj) {
    obj.top = topPosition;
    obj.left = rect.left + 15;
    topPosition += obj.getScaledHeight() + 30;
    obj.setCoords();

    obj.set({
      shadow: null,
      angle: 0,
      width: rect.getScaledWidth() - 35,
      scaleX: 1,
      scaleY: 1
    });
    obj.setCoords();
  });
  // update the lastTextboxY variable based on the new position of the last textbox
  let lastTextbox = canvas
    .getObjects()
    .filter((obj) => obj.type === "textbox")
    .pop();
  lastTextboxY = lastTextbox.top + lastTextbox.getScaledHeight() + 30;

  // Re-render the canvas
  canvas.renderAll();
}

canvas.on("mouse:down", function (options) {
  if (options.target && options.target === group) {
    repositionSectionTextboxes();

    // Check if the group contains a child with an ID of 'addButton'
    var addButton = group.getObjects().find(function (obj) {
      return obj.className === "addButton";
    });

    if (addButton && options.target === group) {
      var newTextbox = new fabric.TextboxWithPadding("Input field", {
        left: rect.left + 15,
        width: rect.getScaledWidth() - 35,
        top: lastTextboxY,
        height: textbox.getScaledHeight() || 30,
        fontSize: 16,
        // hasControls: false,
        originalTop: lastTextboxY,
        padding: 5,
        fill: "black",
        backgroundColor: "#ffffff",
        borderColor: "#9181fc",
        id: Date.now()
      });
      // Check if the new textbox will overlap with any existing textbox
      var overlapping = group.getObjects().some(function (obj) {
        return obj !== addButton && obj.intersectsWithObject(newTextbox);
      });

      if (!overlapping) {
        canvas.add(newTextbox);
        newTextbox
          .set({
            //@ts-ignore
            originalWidth: rect.width,
            originalHeight: 30,
            originalTop: lastTextboxY,
            opacity: 0 // Set opacity to 0 for fade in effect
          })
          .setCoords();

        // Animate the object to fade in
        newTextbox.animate("opacity", 1, {
          duration: 200, // Set the duration of animation (in milliseconds)
          onChange: canvas.renderAll.bind(canvas), // Re-render the canvas on each frame of animation
          onComplete: function () {
            newTextbox.setCoords(); // Set the final position of the object after animation
          },
          easing: fabric.util.ease.easeInOutCubic
        });

        newTextbox.setControlsVisibility({
          mtr: false,
          tr: false,
          tl: false,
          bl: false,
          br: false
        });
        // Calculate the required height for the rect based on the total height of all the textboxes
        var totalHeight =
          lastTextboxY + newTextbox.getScaledHeight() - rect.top + 30;
        rectHeight = rect.getScaledHeight();
        if (totalHeight > rectHeight) {
          rect
            .set({
              height: totalHeight / rect.scaleY
            })
            .setCoords();

          canvas.renderAll();
        }

        // Set the top position of the group based on the total height of the group
        group.set({
          top: rect.top + rect.getScaledHeight() + 30
        });

        group.setCoords();
        group.setCoords();

        canvas.renderAll();
        lastTextboxY = newTextbox.top + newTextbox.getScaledHeight() + 30;
      }
    }
  }
  if (options.target && options.target.type === "textbox") {
    let showControls = false;

    if (!rect.intersectsWithObject(options.target, true, true)) {
      showControls = true;
      options.target.hasBorders = true;
    }

    options.target.setControlsVisibility({
      mtr: showControls,
      tr: showControls,
      tl: showControls,
      bl: showControls,
      br: showControls
    });
    options.target.setCoords();
    canvas.requestRenderAll();
  }
});

canvas.on("object:scaling", function (options) {
  var scaledObject = options.target;
  scaledObject.setCoords();
  const isText = scaledObject.type === "textbox";
  if (isText || scaledObject.type === "image") {
    canvas.uniformScaling = true;
  } else {
    //@ts-ignore
    if (
      ["bl", "br", "tr", "tl"].indexOf(scaledObject.transform.corner) !== -1
    ) {
      canvas.uniformScaling = false;
    }
  }
  if (scaledObject === rect) {
    let width = rect.getScaledWidth() - 25;
    let totalHeight = 0;
    let count = 0;

    canvas.forEachObject(function (obj) {
      if (obj.type === "textbox") {
        totalHeight += obj.getScaledHeight() + 30;
        ++count;
      }
    });

    let averageHeight = totalHeight / count;
    let index = 0;
    canvas.forEachObject(function (obj) {
      if (obj.type === "textbox") {
        obj
          .set({
            width: width,
            top: rect.top + index * averageHeight + 30
          })
          .setCoords();
        obj.scaleToWidth(width);

        ++index;
      }
    });

    // update the lastTextboxY variable based on the new position of the last textbox
    let lastTextbox = canvas
      .getObjects()
      .filter((obj) => obj.type === "textbox")
      .pop();
    lastTextboxY = lastTextbox.top + lastTextbox.getScaledHeight() + 30;
  }

  repositionSectionTextboxes();

  let newTop = rect.top + rect.getScaledHeight() + 30;
  if (lastTextboxY > newTop) {
    newTop = lastTextboxY + 30;
  }

  // Set the top position of the group based on the total height of the group
  group
    .set({
      top: newTop
    })
    .setCoords();
  canvas.renderAll();
});

canvas.on("object:moving", function (options) {
  var movedObject = options.target;
  movedObject.setCoords();
  var shadow = new fabric.Shadow({
    color: "rgba(0, 0, 0, 0.2)",
    offsetX: 0,
    offsetY: 0.3,
    blur: 3
  });

  // Add shadow to the moving object
  movedObject.set({
    shadow
  });
  if (movedObject === rect) {
    const lastLeft = movedObject.get("lastLeft") || movedObject.left;
    const lastTop = movedObject.get("lastTop") || movedObject.top;

    var deltaX = movedObject.left - lastLeft;
    var deltaY = movedObject.top - lastTop;

    canvas.forEachObject(function (obj) {
      if (
        obj.type === "textbox" &&
        obj.intersectsWithObject(movedObject, true, true)
      ) {
        obj
          .set({
            left: obj.left + deltaX,
            top: obj.top + deltaY
          })
          .setCoords();
      }
    });

    var addButton = group.getObjects().find(function (obj) {
      return obj.className === "addButton";
    });

    if (addButton) {
      group
        .set({
          left: movedObject.left,
          top: movedObject.top + movedObject.getScaledHeight() + 30
        })
        .setCoords();
    }

    movedObject.set({
      lastLeft: movedObject.left,
      lastTop: movedObject.top
    });

    var lastTextbox = canvas
      .getObjects()
      .filter(function (obj) {
        return obj.type === "textbox";
      })
      .pop();

    if (lastTextbox) {
      lastTextboxY = lastTextbox.top + lastTextbox.getScaledHeight() + 30;
    }
  }

  // Check if the moving object is a textbox
  if (movedObject.type === "textbox") {
    var movingBounds = movedObject.getBoundingRect();
    // Loop through all objects on the canvas
    canvas.forEachObject(function (obj) {
      if (obj === movedObject) {
        return;
      }
      // Check if the object is a textbox and if it's overlapping with the moving object
      if (obj.type === "textbox" && movedObject.intersectsWithObject(obj)) {
        // Check if the overlapping object was moved down previously
        var objBounds = obj.getBoundingRect();
        let top = movingBounds.top + objBounds.height + 2;
        if (objBounds.top > movingBounds.top) {
          // Move the overlapping object back up to its original position
          top = movingBounds.top - objBounds.height;
        }
        if (top < rect.top) {
          top = rect.top;
        }
        obj.top = top;

        // Set the new position of the object and re-render the canvas
        obj.setCoords();
        canvas.renderAll();
      }
    });
  }
});

canvas.on("mouse:up", function () {
  repositionSectionTextboxes();
});

canvas.on("text:changed", function (options) {
  var textbox = options.target;
  textbox.bringToFront();
  canvas.renderAll();
});

let clipboard = [];
let copyIndex = -1;
let copyObject = {};
// Add event listener for copy and paste
document.addEventListener("keydown", function (e) {
  if (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) {
    // Ctrl + C or Command + C pressed
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      return true;
    }

    copyIndex = canvas
      .getObjects()
      .findIndex((object) => object === activeObject); // Get the index of obj in getObjects()

    copyObject = activeObject;
    clipboard =
      activeObject && activeObject.getObjects
        ? activeObject.getObjects()
        : [activeObject];
  } else if (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) {
    clipboard.forEach((object) => {
      if (object.type !== "textbox") {
        return true;
      }

      var newTextbox = new fabric.TextboxWithPadding(object.text, {
        left: rect.left + 15,
        width: rect.getScaledWidth() - 35,
        top: copyObject.top + 30,
        height: textbox.getScaledHeight() || 30,
        fontSize: 16,
        // hasControls: false,
        originalTop: lastTextboxY,
        padding: 5,
        fill: "black",
        backgroundColor: "#ffffff",
        borderColor: "#9181fc"
        // id: Date.now()
      });
      // Check if the new textbox will overlap with any existing textbox
      var overlapping = group.getObjects().some(function (obj) {
        return obj !== addButton && obj.intersectsWithObject(newTextbox);
      });

      if (!overlapping) {
        canvas.add(newTextbox);
        // insert new object at index position 2
        canvas.getObjects().splice(copyIndex, 0, newTextbox);

        newTextbox
          .set({
            //@ts-ignore
            originalWidth: rect.width,
            originalHeight: 30,
            originalTop: lastTextboxY,
            opacity: 0 // Set opacity to 0 for fade in effect
          })
          .setCoords();

        // Animate the object to fade in
        newTextbox.animate("opacity", 1, {
          duration: 200, // Set the duration of animation (in milliseconds)
          onChange: canvas.renderAll.bind(canvas), // Re-render the canvas on each frame of animation
          onComplete: function () {
            newTextbox.setCoords(); // Set the final position of the object after animation
          },
          easing: fabric.util.ease.easeInOutCubic
        });
        newTextbox.setControlsVisibility({
          mtr: false,
          tr: false,
          tl: false,
          bl: false,
          br: false
        });

        var topmostTextbox = canvas
          .getObjects()
          .filter(function (obj) {
            return obj.type === "textbox";
          })
          .sort(function (a, b) {
            return b.top - a.top;
          })[0];

        let top = topmostTextbox.top;
        if (!topmostTextbox.id || topmostTextbox.id === copyObject.id) {
          top -= 30;
        }
        newTextbox.set({
          id: Date.now()
        });
        rect
          .set({
            height: top
          })
          .setCoords();

        canvas.renderAll();
        // Set the top position of the group based on the total height of the group
        group.set({
          top: rect.top + rect.getScaledHeight() + 30
        });

        group.setCoords();
        canvas.renderAll();

        canvas.setActiveObject(newTextbox);
      }
      repositionSectionTextboxes();
    });
    clipboard = [];
    copyIndex = -1;
    copyObject = {};
    // update the lastTextboxY variable based on the new position of the last textbox
    let lastTextbox = canvas
      .getObjects()
      .filter((obj) => obj.type === "textbox")
      .pop();
    lastTextboxY = lastTextbox.top + lastTextbox.getScaledHeight();

    canvas.requestRenderAll();
    // console.log(
    //   canvas.getObjects().filter((object) => object.type === "textbox")
    // );
  }
});
