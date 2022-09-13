# Date Picker

![This is an image](/src/images/Date-picker.png)

## How to use

1. **CDN**

   - Pass https://cdn.jsdelivr.net/npm/aray-cdn-datepicker@1.0.4/ary-date-picker.js into your script tag src attribute. Then you can use the &lt;aray-datepicker&gt;&lt;/aray-datepicker> tag in your HTML document.

2. **CLI**

   - Run npm i aray-datepicker in your CLI. You can now import the createDatePicker Function by passing `import { createDatePicker } from 'aray-datepicker';` in your JS file. Then call `createDatePicker('date-picker')`. You can now use the &lt;date-picker>&lt;/date-picker> tag in your HTML document.

### Links :-

- #### View at [StackBlitz](https://stackblitz.com/edit/js-vksjbe?file=index.html,style.css)
- #### View at [CodePen](https://codepen.io/raheemscorp/details/OJZXRWR)

## Attributes

<dl>
  <dt>value</dt>
  <dd>
    Used in specifying the default input value. In this form
    value="YYYY-MM-DD"
  </dd>
  <dt>open</dt>
  <dd>Used in specifying the date picker visibility.</dd>
  <dt>theme</dt>
  <dd>
    Used to determine the theme color of the web component, accepts
    eighter an hex code or RGB color code.
  </dd>
  <dt>min</dt>
  <dd>
    Used in specifying the minimum date. In this form min="YYYY-MM-DD"
  </dd>
  <dt>max</dt>
  <dd>
    Used in specifying the maximum date. In this form value="YYYY-MM-DD"
  </dd>
  <dt>format</dt>
  <dd>
    Used in specifying the input date format. Accepts DD/MM/YYYY ,
    MM/DD/YYYY or YYYY/MM/DD e.g format="MM/DD/YYYY"
  </dd>
  <dt>icon</dt>
  <dd>
    Used in pointing to the icon in your custom input. Where your icon has
    the aria-label attribute containing the same value specified.
  </dd>
</dl>
