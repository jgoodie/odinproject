
const h1 = document.createElement("h1");
let textNode = document.createTextNode("Amish Slaw Recipe");
h1.appendChild(textNode);
document.body.appendChild(h1);

let img = document.createElement("img");
img.src = "images/amishslaw.webp";
img.width = "400";
img.height = "300";
document.body.appendChild(img);

const h3a = document.createElement("h3");
textNode = document.createTextNode("Ingredients");
h3a.appendChild(textNode);
document.body.appendChild(h3a);

textNode = document.createTextNode("Below is the list of ingredients for Lasagna");
document.body.appendChild(textNode);

let ingredients = [
    "1 medium head cabbage, cored and shredded",
    "1 medium onion, finely chopped",
    "1 cup white sugar",
    "1 cup vinegar",
    "1 teaspoon salt",
    "1 teaspoon celery seed",
    "1 teaspoon white sugar",
    "1 teaspoon prepared mustard",
    "3/4 cup vegetable oil"
];

let list = document.createElement('ul');
ingredients.forEach(function (ingredient) {
    let li = document.createElement('li');
    li.textContent = ingredient;
    list.appendChild(li);
});

document.body.appendChild(list);

const h3b = document.createElement("h3");
textNode = document.createTextNode("Directions");
h3b.appendChild(textNode);
document.body.appendChild(h3b);

let steps = [
    "In a large bowl, toss together the cabbage, onion, and 1 cup sugar. In a small saucepan, combine the vinegar, salt, celery seed, 1 teaspoon white sugar, mustard and oil. Bring to a boil, and cook for 3 minutes. Cool completely, then pour over cabbage mixture, and toss to coat. Refrigerate overnight for best flavor."
];

list = document.createElement('ol');
steps.forEach(function (step) {
    let li = document.createElement('li');
    li.textContent = step;
    list.appendChild(li);
});

document.body.appendChild(list);


const a = document.createElement("a");
let link = document.createTextNode("All Recipes");
a.appendChild(link);
a.title = "All Recipes";
a.href = "index.html";
document.body.appendChild(a);