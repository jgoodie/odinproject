
const h1 = document.createElement("h1");
let textNode = document.createTextNode("Apple Pie Recipe");
h1.appendChild(textNode);
document.body.appendChild(h1);

let img = document.createElement("img");
img.src = "images/applepie.jpeg";
img.width = "400";
img.height = "300";
document.body.appendChild(img);

const h3a = document.createElement("h3");
textNode = document.createTextNode("Ingredients");
h3a.appendChild(textNode);
document.body.appendChild(h3a);

let ingredients = [
    "3/4 cup white sugar",
    "2 tablespoons all-purpose flour",
    "1/2 teaspoon ground cinnamon",
    "1/4 teaspoon ground nutmeg",
    "1/2 teaspoon lemon zest",
    "7 cups thinly sliced apples",
    "2 teaspoons lemon juice",
    "1 tablespoon butter",
    "1 recipe pastry for a 9 inch double crust pie",
    "4 tablespoons milk (Optional)"
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
    "Preheat oven to 425 degrees F (220 degrees C).",
    "Mix together the sugar, flour, cinnamon, nutmeg and lemon peel.",
    "Line one crust in a 9-inch deep-dish pie pan. Layer 1/3 of apples into pie crust. Sprinkle with sugar mixture and repeat until done. Sprinkle with lemon juice and dot with butter.",
    "Place second pie crust on top of filling and flute the edges. Cut vents in top crust and brush with milk for a glazed appearance if desired.",
    "Bake at 425 degrees F (220 degrees C) for 40 to 50 minutes."
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