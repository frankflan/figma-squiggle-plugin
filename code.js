// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "create-rectangles") {
    const nodes = [];
    const r = (msg.red/255)
    console.log(msg.red)
    for (let i = 0; i < msg.count; i++) {
      const vector = figma.createVector();
      const multiplier = 100;
      const random1 = Math.random() * multiplier;
      const random2 = Math.random() * multiplier;
      const random4 = Math.random() * multiplier;
      vector.y = i * 300;
      vector.opacity = Math.random();
      vector.strokes = [
        { type: "SOLID", color: { r: 1, g: 0.196, b: 0.635 } }
      ];
      vector.strokeWeight = Math.random() * 10;
      figma.currentPage.appendChild(vector);
      vector.vectorPaths = [
        {
          windingRule: "EVENODD",
          // data: "M 0 100 L 100 100 L 50 0 Z"
          data:
            "M 3 " +
            random1 +
            " C 16.3333 93 62 3 138 3 C 233 3 " +
            random2 +
            " 97.5 434 " +
            random4 +
            ""
        }
      ];
      nodes.push(vector);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};