
const div1 = document.createElement('div');
let textNode = document.createTextNode("Hello, World! Div1");
div1.appendChild(textNode);
document.body.appendChild(div1);

const div2 = document.createElement('div');
textNode = document.createTextNode("Hello, World! Div2");
div2.appendChild(textNode);
document.body.appendChild(div2);

const para = document.createElement("p");
textNode = document.createTextNode("This is a paragraph element");
para.appendChild(textNode);
document.body.appendChild(para);

const div3 = document.createElement('div');
textNode = document.createTextNode("Hello, World! Div3");
div3.appendChild(textNode);
document.body.appendChild(div3);

const div4 = document.createElement('div');
textNode = document.createTextNode("Alert: Hello, World! Div4");
div4.className = "alert-text";
div4.appendChild(textNode);
document.body.appendChild(div4);

const div5 = document.createElement('div');
textNode = document.createTextNode("My Awesome 90's Page");
div5.id = "title";
div5.appendChild(textNode);
document.body.appendChild(div5);


// <div>
//     <div className="subsection header">Latest Posts</div>
//     <p className="subsection" id="preview">This is where a preview for a post might go.</p>
// </div>

const div6 = document.createElement('div');
const div7 = document.createElement('div');
let p = document.createElement("p");
textNode = document.createTextNode("Latest Posts");
div7.appendChild(textNode);
div7.className = "subsection header"
textNode = document.createTextNode("This is where a preview for a post might go.");
p.appendChild(textNode);
p.className = "subsection"
p.id = "preview"
div6.appendChild(div7)
div6.appendChild(p)
document.body.appendChild(div6);

var img = document.createElement("img");
img.src = "images/The_Satanic_Temple_Logo.jpeg";
document.body.appendChild(img);


