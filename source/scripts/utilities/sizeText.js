export default function sizeText(text) {
  let output = text;
  switch (text) {
    case 'S':
      output = 'Small';
      break;
    case 'M':
      output = 'Medium';
      break;
    case 'L':
      output = ' Large';
      break;
    case 'XL':
      output = 'XL';
      break;
    case '2XL':
      output = '2XL';
      break;
    case '3XL':
      output = '3XL';
      break;
    default:
      break;
  }
  return output;
}
