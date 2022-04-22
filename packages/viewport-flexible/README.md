# `viewport-flexible`

Use viewport for mobile page compatibility

## Usage

```
// in main.ts

import setViewport from "@zeesuu-v3/viewport-flexible";

setViewport({
	// Pass any number greater than 0 will create a meta tag in the head element
	// optional default: 0
  width: 750,
	// Display scale value in the console or not.
	// optional default: false
  debug: import.meta.env.MODE === "development",
});

// ReactDOM.render
// or createApp
```

