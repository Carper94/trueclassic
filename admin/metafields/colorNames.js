// Update this string if need to run script to include more colors
const colorways = `BLACK::#171719,
BLUESTONE::#698590,
BURGUNDY::#69252F,
CARBON::#171719,
HEATHER GRAY::#999999,
CARDINAL RED::#641224,
COBALT::#0F3A66,
COFFEE::#432F29,
CRANBERRY::#de5553,
DUSTY PINK::#EDCEC4,
ELECTRIC BLUE::#0168c5,
EMERALD::#03615B,
FLINT::#B6A4AA,
FOREST GREEN::#264742,
INDIGO::#698EA9,
KELLY GREEN::#028a65,
LIGHT BLUE::#BFDDE5,
LIGHT GRAY::#d7d5d1,
MILITARY GREEN::#767159,
NAVY::#182131,
OFF WHITE::#ECEBE0,
ORANGE::#ef6e1f,
PALE BLUE::#D8E6ED,
PERIWINKLE BLUE::#4f9eda,
PURPLE::#443844,
RASPBERRY::#d6254a,
RED ROCK::#794A3C,
RED::#D81D30,
SAGE::#BDD0CA,
SAND::#c3c0b9,
SLATE::#96999C,
STONE::#DBDACF,
TAN 499::#765B3D,
TEAL::#035E7F,
TRUE RED::#e73035,
TURQUOISE::#26c3e1,
WHITE::#FFFFF,
YELLOW::#fede69,`;

const colors = colorways.replaceAll('\n', '');
const colorArray = colors.split(',');

// eslint-disable-next-line no-array-constructor
const colorNames = new Array();

colorArray.forEach((color) => {
  const colorData = color.split('::');
  const colorway = colorData[0];
  if (colorway && colorway.length > 0) {
    colorNames.push(colorway.toLowerCase());
  }
});

module.exports = colorNames;
