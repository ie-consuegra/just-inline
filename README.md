# Just Inline
Just inline combine HTML, CSS and JS files into a single one.

## Installation
```bash
npm i just-inline --save-dev
```

## Usage

In any HTML, JS or CSS file you can point to a file that contains code you want to write inline.

To do so write inline:"filepath.ext" within comment tags.

HTML
```HTML
<!-- inline:"header.html" -->
```

JS
```JS
/* inline:"header.html" */
```
just-inline will replace any of those references for the content of the file specified. And will create a new file with those references changed.

To let it know just-inline what is the template file (the entry or input file) create an inline.config.json to set the input and output file names and paths.

```
{
  "entries": [
    ["./input.html", "./output.html"]
  ]
}
```
You can set several entries:

```
{
  "entries": [
    ["./input.html", "./output.html"],
    ["./input2.html", "./output2.html"]
  ]
}
```
