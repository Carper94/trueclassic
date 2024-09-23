import getCssProp from 'DOM/getCssProp';

const getBreakpoint = () => getCssProp(document.body, '--breakpoint');

export default getBreakpoint;
