# Just Inline
Just-inline lets you insert HTML, JavaScript, CSS, SVG into one specific file. It uses a simple approach to do it, just replacing references to another file for the content of such file and generating a new one.

## Installation
```bash
npm i just-inline --save-dev
```

## Usage

In any HTML, JS or CSS file you can point to a file that contains code you want to write inline.

To do so, write {{ file-to-insert.ext }} as comments in your file.

### Examples
#### HTML
```HTML
<!-- {{ header.html }} -->
```

```HTML
<div class="logo-icon">
  <!-- {{ icon.svg }} -->
</div>
```

#### JS
```JS
/* {{ utils.js }} */
```
just-inline will replace those references for the content of the file specified. And will create a new file with those references changed.

To let know just-inline what is the template file (the entry or input file) create an inline.config.json to set the input and output file names and paths.

```JSON
{
  "entries": [
    ["./input.html", "./output.html"]
  ]
}
```
You can set several entries:

```JSON
{
  "entries": [
    ["./input.html", "./output.html"],
    ["./input2.html", "./output2.html"]
  ]
}
```

Finally, set a new command on your package.json, and run it whenever you want to generate a new file with the specified insertions in its code.

```JSON
{
 "scripts": {
    "build": "just-inline"
 }
}
```
