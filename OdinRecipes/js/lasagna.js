
const h1 = document.createElement("h1");
let textNode = document.createTextNode("Lasagna Recipe");
h1.appendChild(textNode);
document.body.appendChild(h1);

let img = document.createElement("img");
img.src = "images/lasagna.jpeg";
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
    "1 (16 ounce) package lasagna noodles",
    "1 pound lean ground beef",
    "salt and pepper to taste",
    "1 (16 ounce) jar spaghetti sauce",
    "1 clove garlic, minced",
    "1/2 pound shredded mozzarella cheese",
    "1/2 pound shredded Cheddar cheese",
    "1 pint ricotta cheese"
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
    "Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain.",
    "Preheat oven to 350 degrees F (175 degrees C). In a large skillet over medium-high heat, brown beef and season with salt and pepper; drain. Stir in spaghetti sauce and garlic and simmer 5 minutes.",
    "In a medium bowl, combine mozzarella, Cheddar and ricotta; stir well. In 9x13 inch pan, alternate layers of noodles, meat mixture and cheese mixture until pan is filled.",
    "Bake in preheated oven for 30 minutes, or until cheese is melted and bubbly."
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