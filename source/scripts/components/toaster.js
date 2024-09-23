import supportsIntersectionObserver from 'WINDOW/supportsIntersectionObserver';
import fireEvent from 'UTILS/fireEvent';
import { isDomEl } from 'DOM/domTypeChecking';

const toaster = (target = false, options = false) => {
  let config = {
    target: null,
    toastSelector: '[data-toast]',
    toastEvent: 'toast',
    unToastEvent: 'untoast',
    activeClassName: 'active',
    enableAriaAlert: true,
    triggerOnScroll: false,
    scrollTarget: null,
    observer: null,
    triggerOnTime: false,
    timeDelay: 0,
    timer: null,
    triggerOnEvent: false,
    eventName: 'click',
    eventTarget: null,
    preventDefault: false,
    closeButton: null,
    destroyOnClose: false,
    callback: null,
  };

  const doCallback = (type) => {
    if (config.callback) config.callback(type, config);
  };

  const state = () => {
    return config.target.classList.contains(config.activeClassName);
  };

  const toast = () => {
    if (!config.target) return false;

    if (config.enableAriaAlert) config.target.setAttribute('role', 'alert');
    config.target.classList.add(config.activeClassName);
    fireEvent(config.toastEvent, config.target);
    doCallback(config.toastEvent);

    return config.target;
  };

  const unToast = () => {
    if (!config.target) return false;

    config.target.classList.remove(config.activeClassName);
    fireEvent(config.unToastEvent, config.target);
    doCallback(config.unToastEvent);

    return config.target;
  };

  const handleEvent = (event) => {
    toast();

    if (config.preventDefault) {
      event.preventDefault();
    }
  };

  const destroy = () => {
    if (config.observer) {
      config.observer.disconnect();
    }
    if (config.timer) {
      clearTimeout(config.timer);
    }
    if (config.eventTarget) {
      config.eventTarget.removeEventListener(config.eventName, handleEvent);
    }
  };

  const close = () => {
    unToast();
    if (config.destroyOnClose) destroy();
  };

  const startObserver = () => {
    config.observer = new IntersectionObserver((entries) => {
      if (entries[0].boundingClientRect.y < 0) {
        toast();
      }
    });

    config.observer.observe(config.scrollTarget);
  };

  const addTriggers = () => {
    const {
      triggerOnScroll,
      triggerOnTime,
      timeDelay,
      scrollTarget,
      triggerOnEvent,
      eventTarget,
      eventName,
      closeButton,
    } = config;

    // Add scroll trigger
    if (triggerOnScroll && scrollTarget && supportsIntersectionObserver) {
      startObserver();
    }

    // Add time trigger
    if (triggerOnTime) {
      config.timer = setTimeout(toast, parseInt(timeDelay, 10));
    }

    // Add event trigger
    if (triggerOnEvent && eventTarget) {
      if (!isDomEl(eventTarget)) config.eventTarget = document.querySelector(eventTarget);
      config.eventTarget.addEventListener(eventName, handleEvent);
    }

    // Add optional close button
    if (!closeButton) {
      config.closeButton = config.target.querySelector('[data-close-toast]');
    }

    if (config.closeButton) {
      config.closeButton.addEventListener('click', (event) => {
        close();
        event.preventDefault();
      });
    }
  };

  const getTargetElement = (targetToGet) => {
    return (
      (isDomEl(targetToGet) && targetToGet) ||
      (targetToGet && document.querySelector(targetToGet)) ||
      document.querySelector(config.toastSelector)
    );
  };

  const init = () => {
    if (options) config = { ...config, ...options };

    // Get the Toaster target element
    config.target = getTargetElement(target);

    if (!config.target) return false;

    addTriggers();

    config.target.classList.add('toaster-initialized');

    return true;
  };

  // Initialize the Toaster
  if (!init()) return false;

  // Toaster factory function
  return {
    get active() {
      return state();
    },
    config,
    object: { ...config },
    toast,
    unToast,
    destroy,
    close,
    init,
  };
};

export default toaster;
