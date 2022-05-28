
const h1 = document.createElement("h1");
let textNode = document.createTextNode("Odin Recipes");
h1.appendChild(textNode);
document.body.appendChild(h1);

const para = document.createElement("p");
textNode = document.createTextNode("This is the site for Odin Recipes");
para.appendChild(textNode);

document.body.appendChild(para);

// const a = document.createElement("a");
// let link = document.createTextNode("Lasagna Recipe");
// a.appendChild(link);
// a.title = "Lasagna Recipe";
// a.href = "lasagna.html";
// document.body.appendChild(a);

let recipes = [
    ["Lasagna Recipe", "lasagna.html"],
    ["Apple Pie Recipe","applepie.html"],
    ["Amish Slaw Recipe","amishslaw.html"]
]

let list = document.createElement('ul');
recipes.forEach(function (recipe){
    // console.log(recipe[0] + " --> " + recipe[1])
    let a = document.createElement("a");
    let link = document.createTextNode(recipe[0]);
    a.appendChild(link);
    a.title = recipe[0];
    a.href = recipe[1];
    let li = document.createElement('li');
    li.appendChild(a)
    //li.textContent = a;
    list.appendChild(li);
})
document.body.appendChild(list);


// // Create an unordered list
// let list = document.createElement('ul');
// // Create a list item for each wizard
// // and append it to the list
// wizards.forEach(function (wizard) {
//     var li = document.createElement('li');
//     li.textContent = wizard;
//     list.appendChild(li);
// });
//
// document.body.appendChild(list);



// let textNode = document.createTextNode("Hello World");
// document.body.appendChild(textNode);


//
//
// d3.select("body").append("H1").text("Unordered List")
//
// d3.select("body")
//     .append("ul")
//     .append("li").text("foo")
//     .append("li").text("bar")
//     .append("li").text("fiz")
//     .append("li").text("baz")
//
// d3.select("body").append("H1").text("Ordered List")
// d3.select("body")
//     .append("ol")
//     .append("li").text("foo")
//     .append("li").text("bar")
//     .append("li").text("fiz")
//     .append("li").text("baz")
//
// d3.select("body")
//     .append("a")
//     .attr("href", "https://www.theodinproject.com/about")
//     .text("About the Odin Project")
//
// d3.select("body")
//     .append("br")
//
// d3.select("body")
//     .append("img")
//     .attr("src", "https://www.theodinproject.com/mstile-310x310.png")
//     .attr("alt", "The Odin Project Logo")