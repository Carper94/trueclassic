# JS Components

## toaster
_Flexible toast controllers. You can create multiple toasters with unique configs._

To instantiate a toaster, import the factory `import toaster from 'COMPONENTS/toaster';` and create a new instance as such (`options` object is optional): 
```JavaScript
const newToaster = toaster(targetElement, options);
```

The default options are:
```JavaScript
const options = {
  activeClassName: 'active', // The class name that gets added to the toast
  enableAriaAlert: true, // Automatically adds role="alert" to the toast
  triggerOnScroll: false, // Trigger based on scroll (using intersectionObserver)
  scrollTarget: null, // Target for scroll trigger
  triggerOnTime: false, // Trigger after a specified amount of time
  timeDelay: 0, // The delay (in milliseconds) to wait before toasting
  triggerOnEvent: false, // Trigger based on any event (click, hover, etc.) for a given element
  eventName: 'click', // Which event to listen for
  eventTarget: null, // Which element to listen for events on 
  preventDefault: false, // Prevent the default action for that event
  closeButton: null, // Pass a DOM element (button) or selector to use for closing the toast
  destroyOnClose: false, // Destroy the toaster when .close is called
  callback: null, // Optional callback function whenever toast or unToast is called
}
```
You will likely want to enable at least one trigger, for example 
```JavaScript
const newToaster = toaster(targetElement, {
  triggerOnTime: true,
  timeDelay: 3000,
});
```

You can also trigger toast functionality programatically, using the following methods:
```JavaScript
newToaster.toast();
newToaster.unToast();
newToaster.close();
newToaster.destroy();
```
And you can get the current state using `newToaster.active` (boolean)

_Note:_ If you *did not* manually pass a close button (`closeButton`) in your options, ***Toaster*** will look for an element with the attribute `data-close-toast` inside the target element. (Make sure to use a `<button>` for this purpose.)

Lastly, ***Toaster*** will fire a custom event (`toast` or `untoast`) on the target element whenever one of those actions is triggered, if you need to layer on additional functionality. Or you can use the `callback` option - pass a function to be called on every toast/untoast, which will receive two parameters `type` ('toast' or 'untoast') and `config` (contains the current config option).