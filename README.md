# Date Picker

![This is an image](/src/images/Date-picker.png)

## How to use

1. **CDN**

   - Pass https://cdn.jsdelivr.net/npm/aray-cdn-datepicker@1.0.4/ary-date-picker.js into your script tag src attribute. Then you can use the &lt;aray-datepicker&gt;&lt;/aray-datepicker> tag in your HTML document.

2. **CLI**

   - Run npm i aray-datepicker in your CLI. You can now import the createDatePicker Function by passing

   ```js
   import { createDatePicker } from 'aray-datepicker';
   ```

   in your JS file. Then call

   ```js
   createDatePicker('date-picker');
   ```

   You can now use the &lt;date-picker>&lt;/date-picker> tag in your HTML document.

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

##### Note -

> Pass this commented HTML below in between the component opening and closing tag to test your custom input. Style it to your taste. the slot attribute containing value of `input` is compulsory. An Icon is not necessary. If you use an icon connect it to the date picker tag passing the same value the the icon aria-label attribute to the date picker icon attribute

```html
<div class="input" slot="input">
  <input type="text" />
  <div aria-label="picker-icon" class="icon">
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.75 4.71874H35.6562V1.90624C35.6565 1.53328 35.5086 1.1755 35.245 0.911598C34.9815 0.647699 34.6239 0.499303 34.2509 0.499054C33.878 0.498806 33.5202 0.646725 33.2563 0.910272C32.9924 1.17382 32.844 1.53141 32.8438 1.90437V4.71874H24.4062V1.90624C24.4064 1.72157 24.3701 1.53868 24.2996 1.36802C24.229 1.19736 24.1255 1.04227 23.995 0.911598C23.8645 0.780929 23.7096 0.677242 23.539 0.606457C23.3684 0.535673 23.1856 0.499177 23.0009 0.499054C22.628 0.498806 22.2702 0.646725 22.0063 0.910272C21.7424 1.17382 21.594 1.53141 21.5938 1.90437V4.71874H13.1562V1.90624C13.1564 1.72157 13.1201 1.53868 13.0496 1.36802C12.979 1.19736 12.8755 1.04227 12.745 0.911598C12.6145 0.780929 12.4596 0.677242 12.289 0.606457C12.1184 0.535673 11.9356 0.499177 11.7509 0.499054C11.378 0.498806 11.0202 0.646725 10.7563 0.910272C10.4924 1.17382 10.344 1.53141 10.3438 1.90437V4.71874H4.25C3.25576 4.71874 2.30222 5.11357 1.59901 5.81643C0.895805 6.51928 0.500497 7.47263 0.5 8.46687V41.7481C0.5 42.7427 0.895088 43.6965 1.59835 44.3998C2.30161 45.103 3.25544 45.4981 4.25 45.4981H41.75C42.7446 45.4981 43.6984 45.103 44.4016 44.3998C45.1049 43.6965 45.5 42.7427 45.5 41.7481V8.46687C45.4995 7.47263 45.1042 6.51928 44.401 5.81643C43.6978 5.11357 42.7442 4.71874 41.75 4.71874ZM42.6875 41.75C42.6875 41.9983 42.589 42.2365 42.4136 42.4122C42.2382 42.588 42.0002 42.687 41.7519 42.6875H4.25C4.00136 42.6875 3.7629 42.5887 3.58709 42.4129C3.41127 42.2371 3.3125 41.9986 3.3125 41.75V8.46874C3.313 8.22043 3.41199 7.98245 3.58775 7.80704C3.76351 7.63163 4.00168 7.53312 4.25 7.53312H10.3438V10.3456C10.3435 10.7186 10.4914 11.0764 10.755 11.3403C11.0185 11.6042 11.3761 11.7526 11.7491 11.7528C12.122 11.7531 12.4798 11.6051 12.7437 11.3416C13.0076 11.078 13.156 10.7205 13.1562 10.3475V7.53312H21.5938V10.3456C21.5935 10.7186 21.7414 11.0764 22.005 11.3403C22.2685 11.6042 22.6261 11.7526 22.9991 11.7528C23.372 11.7531 23.7298 11.6051 23.9937 11.3416C24.2576 11.078 24.406 10.7205 24.4062 10.3475V7.53312H32.8438V10.3456C32.8435 10.7186 32.9914 11.0764 33.255 11.3403C33.5185 11.6042 33.8761 11.7526 34.2491 11.7528C34.622 11.7531 34.9798 11.6051 35.2437 11.3416C35.5076 11.078 35.656 10.7205 35.6562 10.3475V7.53312H41.75C41.998 7.53361 42.2357 7.63235 42.411 7.8077C42.5864 7.98306 42.6851 8.22075 42.6856 8.46874L42.6875 41.75Z"
        fill="black"
      />
      <path
        d="M10.3438 17.375H15.9688V21.5938H10.3438V17.375ZM10.3438 24.4062H15.9688V28.625H10.3438V24.4062ZM10.3438 31.4375H15.9688V35.6562H10.3438V31.4375ZM20.1875 31.4375H25.8125V35.6562H20.1875V31.4375ZM20.1875 24.4062H25.8125V28.625H20.1875V24.4062ZM20.1875 17.375H25.8125V21.5938H20.1875V17.375ZM30.0312 31.4375H35.6562V35.6562H30.0312V31.4375ZM30.0312 24.4062H35.6562V28.625H30.0312V24.4062ZM30.0312 17.375H35.6562V21.5938H30.0312V17.375Z"
        fill="black"
      />
    </svg>
  </div>
</div>
```
