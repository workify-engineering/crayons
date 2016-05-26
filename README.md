# Crayons

## What is Crayons?

crayon `/ˈkrāˌän,ˈkrāən/`

*noun*

plural noun: **crayons**

1. a pencil or stick of colored chalk or wax, used for drawing.
2. a JavaScript library used to pick optimal colors from a gradient based on a set palette of colors using XYZ color space... or something like that.

## Why Crayons?

While we *can* draw on the web, sometimes we like to style text and numbers by applying colors and typefaces. Rather than predetermining colors that we'd want to use to style our data, text, and numbers, we wanted to use some mathematics.

Crayons takes advantage of the Lab color space:

> Unlike the RGB and CMYK color models, Lab color is designed to approximate human vision. It aspires to perceptual uniformity, and its L component closely matches human perception of lightness.

> https://en.wikipedia.org/wiki/Lab_color_space

Originally we developed this internally, but we liked it so much that we decided to share it with you.

## How to use Crayons

Crayons is still in its infancy, but you can use crayons to build a "box" (your gradient) like this:

```javascript
var box = crayons.box([
  { r: 251, g: 229, b: 127 },
  { r: 250, g: 177, b: 113 },
  { r: 119, g: 221, b: 133 },
  { r: 240, g: 116, b: 100 },
  { r:  39, g: 173, b:  66 }
]);

var percentage = 0.40;
var color = box.pick(percentage); // color == '#87cd81'
```

The five colors above will be translated into Lab colors, which are optimized for human vision. When a percentage value (0.0 to 1.0) is requested, a computed color is returned from that Lab color gradient.
