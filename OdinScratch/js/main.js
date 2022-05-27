

d3.select("body").append("H1").text("Unordered List")
d3.select("body")
    .append("ul")
    .append("li").text("foo")
    .append("li").text("bar")
    .append("li").text("fiz")
    .append("li").text("baz")

d3.select("body").append("H1").text("Ordered List")
d3.select("body")
    .append("ol")
    .append("li").text("foo")
    .append("li").text("bar")
    .append("li").text("fiz")
    .append("li").text("baz")

d3.select("body")
    .append("a")
    .attr("href", "https://www.theodinproject.com/about")
    .text("About the Odin Project")

d3.select("body")
    .append("br")

d3.select("body")
    .append("img")
    .attr("src", "https://www.theodinproject.com/mstile-310x310.png")
    .attr("alt", "The Odin Project Logo")