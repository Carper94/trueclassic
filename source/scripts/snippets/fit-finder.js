/* eslint-disable */

const form = document.querySelector('.fit-form');
if (form) {
  const submitBtn = document.querySelector('#form-button-next');
  const reset = document.querySelector('#form-button-reset');

  const fitForm = document.querySelector('.slide-fit-form');
  const fitSize = document.querySelector('.slide-fit-size');
  const fitLog = document.querySelector('.fit-log');
  const fitoption = document.querySelector('.fit-option');
  const fitnofound = document.querySelector('.fit-nofound');

  const FEET_CENTIMETER = 30.48;
  const INCHES_CENTIMETER = 2.54;
  const KILO_POUND = 2.2046;

  const inputs = form.querySelectorAll('input');

  const letterInt = 'Height,Weight,Age,Fit\n157-165,45-68,1-100,S\n157-165,69-84,1-100,M\n157-165,85-95,1-100,L\n157-165,96-113,1-100,L\n157-165,114-129,1-100,XL\n157-165,130-160,1-100,2XL\n166-180,45-68,1-100,S\n166-180,69-84,1-100,M\n166-180,85-95,1-100,L\n166-180,96-113,1-100,XL\n166-180,114-129,1-100,2XL\n166-180,130-150,1-100,3XL\n166-180,151-164,1-100,4XL\n181-190,45-68,1-100,M\n181-190,69-84,1-100,M\n181-190,85-95,1-100,L\n181-190,96-113,1-100,XL\n181-190,114-129,1-100,2XL\n181-190,130-150,1-100,3XL\n181-190,151-164,1-100,4XL\n191-196,45-68,1-100,L\n191-196,69-84,1-100,L\n191-196,85-95,1-100,L\n191-196,96-113,1-100,XL\n191-196,114-129,1-100,2XL\n191-196,130-150,1-100,3XL\n191-196,150-164,1-100,4XL';
  const numericInt = 'Height,Weight,Age,Fit\n142-152,59-62,1-100,28\n142-152,62-65,1-100,29\n142-152,65-68,1-100,30\n147-157,68-75,1-100,31\n147-157,75-82,1-100,32\n147-163,82-86,1-100,33\n147-163,86-95,1-100,34\n147-163,95-104,1-100,36\n147-163,104-113,1-100,38\n147-163,113-122,1-100,40\n147-163,122-129,1-100,42\n152-168,59-62,1-100,28\n152-168,62-65,1-100,29\n152-168,65-68,1-100,30\n157-173,68-75,1-100,31\n157-173,75-82,1-100,32\n163-178,82-86,1-100,33\n163-178,86-95,1-100,34\n163-178,95-104,1-100,36\n163-178,104-113,1-100,38\n163-178,113-122,1-100,40\n163-178,122-129,1-100,42\n142-152,59-64,1-100,36\n142-152,64-68,1-100,38\n147-157,68-75,1-100,40\n147-157,75-84,1-100,42\n147-163,84-89,1-100,44\n147-163,89-95,1-100,46\n147-163,95-113,1-100,48\n147-163,113-129,1-100,50\n152-168,59-64,1-100,36\n152-168,64-68,1-100,38\n157-173,68-75,1-100,40\n157-173,75-84,1-100,42\n163-178,84-89,1-100,44\n163-178,89-95,1-100,46\n142-155,68-75,1-100,48\n147-180,75-84,1-100,31\n147-180,84-95,1-100,32\n147-152,95-100,1-100,33\n155-165,95-100,1-100,34\n147-152,100-113,1-100,36\n155-165,100-113,1-100,38\n147-152,113-129,1-100,40\n155-165,113-129,1-100,42';
  const letterUS = 'Height,Weight,Age,Fit\n58-62,151-185,1-100,M\n58-64,186-210,1-100,L\n58-64,211-250,1-100,XL\n58-64,251-285,1-100,2XL\n58-64,286-330,1-100,3XL\n58-64,331-360,1-100,4XL\n56-60,130-150,1-100,S\n58-62,151-185,1-100,M\n58-64,186-210,1-100,L\n58-64,211-250,1-100,XL\n58-64,251-285,1-100,2XL\n58-64,286-330,1-100,3XL\n58-64,331-360,1-100,4XL\n60-66,130-150,1-100,S\n62-68,151-185,1-100,M\n64-70,186-210,1-100,L\n64-70,211-250,1-100,XL\n64-70,251-285,1-100,2XL\n64-70,286-330,1-100,3XL\n58-64,331-360,1-100,4XL\n60-66,130-150,1-100,S\n62-68,151-185,1-100,M\n64-70,186-210,1-100,L\n64-70,211-250,1-100,XL\n64-70,251-285,1-100,2XL\n64-70,286-330,1-100,3XL\n58-64,331-360,1-100,4XL\n52-55,100-150,1-100,S\n52-55,151-185,1-100,M\n52-55,186-210,1-100,L\n52-55,211-250,1-100,L\n52-55,251-285,1-100,XL\n52-55,286-350,1-100,2XL\n56-511,100-150,1-100,S\n56-511,151-185,1-100,M\n56-511,186-210,1-100,L\n56-511,211-250,1-100,XL\n56-511,251-285,1-100,2XL\n56-511,286-330,1-100,3XL\n56-511,331-360,1-100,4XL\n60-62,100-150,1-100,M\n60-62,151-185,1-100,M\n60-62,186-210,1-100,L\n60-62,211-250,1-100,XL\n60-62,251-285,1-100,2XL\n60-62,286-330,1-100,3XL\n60-62,331-360,1-100,4XL\n63-65,100-150,1-100,L\n63-65,151-185,1-100,L\n63-65,186-210,1-100,L\n63-65,211-250,1-100,XL\n63-65,251-285,1-100,2XL\n63-65,286-330,1-100,3XL\n63-65,331-360,1-100,4XL';
  const numericUS = 'Height,Weight,Age,Fit\n56-60,130-136,1-100,28\n56-60,137-143,1-100,29\n56-60,144-150,1-100,30\n58-62,151-165,1-100,31\n58-62,166-180,1-100,32\n58-64,181-190,1-100,33\n58-64,191-210,1-100,34\n58-64,211-230,1-100,36\n58-64,230-250,1-100,38\n58-64,251-270,1-100,40\n58-64,271-285,1-100,42\n60-66,130-136,1-100,28\n60-66,137-143,1-100,29\n60-66,144-150,1-100,30\n62-68,151-165,1-100,31\n62-68,166-180,1-100,32\n64-70,181-190,1-100,33\n64-70,191-210,1-100,34\n64-70,211-230,1-100,36\n64-70,230-250,1-100,38\n64-70,251-270,1-100,40\n64-70,271-285,1-100,42\n56-60,130-140,1-100,36\n56-60,141-150,1-100,38\n58-62,151-167,1-100,40\n58-62,168-185,1-100,42\n58-64,186-197,1-100,44\n58-64,198-210,1-100,46\n58-64,211-250,1-100,48\n58-64,251-285,1-100,50\n60-66,130-140,1-100,36\n60-66,141-150,1-100,38\n62-68,151-167,1-100,40\n62-68,168-185,1-100,42\n64-70,186-197,1-100,44\n64-70,198-210,1-100,46\n56-511,130-150,1-100,30\n58-511,151-185,1-100,31\n60-62,151-185,1-100,32\n58-60,186-210,1-100,33\n61-65,186-210,1-100,34\n58-60,211-250,1-100,36\n61-65,211-250,1-100,38\n58-60,251-285,1-100,40\n61-65,251-285,1-100,42';

  const sortSizeData = {
    letterUS: letterUS,
    letterInt: letterInt,
    numericUS: numericUS,
    numericInt: numericInt
  };


  // const sortSizeData = {
  //   letterUS:
  //     'Height,Weight,Age,Fit\n56-60,130-150,1-100,S\n58-62,151-185,1-100,M\n58-64,186-210,1-100,L\n58-64,211-250,1-100,XL\n58-64,251-285,1-100,2XL\n58-64,286-330,1-100,3XL\n58-64,331-360,1-100,4XL\n56-60,130-150,1-100,S\n58-62,151-185,1-100,M\n58-64,186-210,1-100,L\n58-64,211-250,1-100,XL\n58-64,251-285,1-100,2XL\n58-64,286-330,1-100,3XL\n58-64,331-360,1-100,4XL\n60-66,130-150,1-100,S\n62-68,151-185,1-100,M\n64-70,186-210,1-100,L\n64-70,211-250,1-100,XL\n64-70,251-285,1-100,2XL\n64-70,286-330,1-100,3XL\n58-64,331-360,1-100,4XL\n60-66,130-150,1-100,S\n62-68,151-185,1-100,M\n64-70,186-210,1-100,L\n64-70,211-250,1-100,XL\n64-70,251-285,1-100,2XL\n64-70,286-330,1-100,3XL\n58-64,331-360,1-100,4XL',
  //   letterInt:
  //     'Height,Weight,Age,Fit\n142-152,57-68,1-100,S\n147-157,69-84,1-100,M\n147-163,85-95,1-100,L\n147-163,96-113,1-100,XL\n147-163,114-130,1-100,2XL\n147-163,131-160,1-100,3XL\n168-183,57-68,1-100,S\n168-183,69-84,1-100,M\n168-183,85-95,1-100,L\n168-183,96-113,1-100,XL\n168-183,114-130,1-100,2XL\n168-183,131-150,1-100,3XL\n168-183,151-164,1-100,4XL\n181-190,57-68,1-100,M\n181-190,69-84,1-100,M\n181-190,85-95,1-100,L\n181-190,96-113,1-100,XL\n181-190,114-130,1-100,2XL\n181-190,131-150,1-100,3XL\n181-190,151-164,1-100,4XL\n191-196,57-68,1-100,L\n191-196,69-84,1-100,L\n191-196,85-95,1-100,L\n191-196,96-113,1-100,XL\n191-196,114-130,1-100,2XL\n191-196,131-150,1-100,3XL\n191-196,150-164,1-100,4XL',
  //   numericUS:
  //     'Height,Weight,Age,Fit\n56-60,130-136,1-100,28\n56-60,137-143,1-100,29\n56-60,144-150,1-100,30\n58-62,151-165,1-100,31\n58-62,166-180,1-100,32\n58-64,181-190,1-100,33\n58-64,191-210,1-100,34\n58-64,211-230,1-100,36\n58-64,230-250,1-100,38\n58-64,251-270,1-100,40\n58-64,271-285,1-100,42\n60-66,130-136,1-100,28\n60-66,137-143,1-100,29\n60-66,144-150,1-100,30\n62-68,151-165,1-100,31\n62-68,166-180,1-100,32\n64-70,181-190,1-100,33\n64-70,191-210,1-100,34\n64-70,211-230,1-100,36\n64-70,230-250,1-100,38\n64-70,251-270,1-100,40\n64-70,271-285,1-100,42\n56-60,130-140,1-100,36\n56-60,141-150,1-100,38\n58-62,151-167,1-100,40\n58-62,168-185,1-100,42\n58-64,186-197,1-100,44\n58-64,198-210,1-100,46\n58-64,211-250,1-100,48\n58-64,251-285,1-100,50\n60-66,130-140,1-100,36\n60-66,141-150,1-100,38\n62-68,151-167,1-100,40\n62-68,168-185,1-100,42\n64-70,186-197,1-100,44\n64-70,198-210,1-100,46',
  //   numericInt:
  //     'Height,Weight,Age,Fit\n142-152,57-60,1-100,28\n142-152,61-63,1-100,29\n142-152,64-68,1-100,30\n147-157,69-75,1-100,31\n147-157,76-82,1-100,32\n147-163,83-86,1-100,33\n147-163,87-95,1-100,34\n147-163,96-104,1-100,36\n147-163,105-113,1-100,38\n147-163,114-122,1-100,40\n147-163,123-129,1-100,42\n168-183,57-60,1-100,28\n168-183,61-64,1-100,29\n168-183,65-68,1-100,30\n168-183,69-75,1-100,31\n168-183,76-82,1-100,32\n183-198,83-86,1-100,33\n183-198,87-95,1-100,34\n183-198,96-104,1-100,36\n183-198,105-113,1-100,38\n183-198,114-122,1-100,40\n183-198,123-129,1-100,42\n168-183,57-60,1-100,36\n168-183,61-64,1-100,38\n147-157,65-75,1-100,40\n147-157,76-82,1-100,42\n147-163,83-86,1-100,44\n147-163,87-95,1-100,46\n147-163,96-113,1-100,48\n147-163,114-129,1-100,50\n168-183,57-60,1-100,36\n168-183,61-64,1-100,38\n168-183,65-75,1-100,40\n168-183,76-82,1-100,42\n183-198,83-86,1-100,44\n183-198,87-95,1-100,46',
  // };

  if (form !== null) {
    function findFit(json) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        let height;
        let weight;
        let age = e.target.age.value;
        let fit = [];

        if (e.target.dataset.delegate === 'imperial') {
          if (e.target.inches.value === '10' || e.target.inches.value === '11' || e.target.inches.value === '12') {
            e.target.inches.value = '9';
          }
          height = e.target.feet.value + e.target.inches.value;
          weight = e.target.weight.value;
        } else {
          height = toHeightMetric(+e.target.meter.value).join('');
          weight = Math.round(+e.target.weight.value * KILO_POUND);
        }

        if (!height || !weight || !age) {
          console.log('One or more inputs are missing!');
          return;
        }

        for (let i = 0; i < json.length; i += 1) {
          const heightRange = json[i].Height.split('-');
          const weightRange = json[i].Weight.split('-');
          const ageRange = json[i].Age.split('-');

          if (
            height >= parseInt(heightRange[0]) &&
            height <= parseInt(heightRange[1]) &&
            weight >= parseInt(weightRange[0]) &&
            weight <= parseInt(weightRange[1]) &&
            age >= parseInt(ageRange[0]) &&
            age <= parseInt(ageRange[1])
          ) {
            fit = json[i].Fit;
          }
        }

        let sizeLetterContent;
        let sizeNumericContent;

        if (fit === '') {
          fitForm.style.display = 'none';
          fitSize.style.display = 'grid';
          fitnofound.hidden = false;
          fitoption.hidden = true;
          reset.addEventListener('click', (event) => {
            fitForm.style.display = 'grid';
            fitSize.style.display = 'none';
            handleReset();

          });
        } else {
          fitForm.style.display = 'none';
          fitSize.style.display = 'grid';
          fitoption.hidden = false;
          fitnofound.hidden = true;

          const fitContainer = document.createElement('span');

          if (fitSize.style.display === 'grid') {
            fitContainer.textContent = fit;
            fitLog.appendChild(fitContainer);
            fitContainer.classList.add('fit-size');

            const sizeLetter = document.querySelector('.fit-size:last-child:nth-child(1)');
            const sizeNumeric = document.querySelector('.fit-size:last-child:nth-child(2)');
            if (sizeLetter) {
              const sizeLetterId = (sizeLetter.id = 'size-letter');
              const sizeLetterElement = document.querySelector(`#${sizeLetterId}`);
              let sizeLetterFit = document.querySelector(`#recommend-fit-left`);
              sizeLetterContent = sizeLetterElement.textContent;
              if (sizeLetterContent == '') {
                sizeLetterFit.classList.add('is-close');
              }

              if (sizeLetterContent != '') {
                sizeLetterFit.classList.add('is-open');
                sizeLetterFit.classList.remove('is-close');
              }
            }

            if (sizeNumeric) {
              const sizeNumericId = (sizeNumeric.id = 'size-numeric');
              const sizeNumericElement = document.querySelector(`#${sizeNumericId}`);
              let sizeNumericFit = document.querySelector(`#recommend-fit-right`);
              sizeNumericContent = sizeNumericElement.textContent;
              if (sizeNumericContent == '') {
                sizeNumericFit.classList.add('is-close');
              }
              if (sizeNumericContent != '') {
                sizeNumericFit.classList.add('is-open');
                sizeNumericFit.classList.remove('is-close');
              }
            }
          }

          const sizeSelectorArray = [
            {
              'S': '39614586552392',
            },
            {
              'M': '39614586585160',
            },
            {
              'L': '39614586617928',
            },
            {
              'XL': '39614586650696',
            },
            {
              '2XL': '39614586683464',
            },
            {
              '3XL': '39614586716232',
            },
            {
              '4XL': '39941332992072',
            },
            {
              '30': '39870274994248',
            },
            {
              '31': '39870275027016',
            },
            {
              '32': '39870275059784',
            },
            {
              '33': '39870275092552',
            },
            {
              '34': '39870275125320',
            },
            {
              '36': '39870275158088',
            },
            {
              '38': '39870275190856',
            },
            {
              '40': '39870275223624',
            },
            {
              '42': '39870275256392',
            },

            {
              '29': '39870275256392',
            },
            {
              '44': '39870275256392',
            },
            {
              '46': '39870275256392',
            },
            {
              '48': '39870275256392',
            },
            {
              '50': '39870275256392',
            },
          ];

          let fitLet = document.querySelector('#fit-let');
          let fiNum = document.querySelector('#fit-num');

          const sizeKeys = sizeSelectorArray.map((obj) => Object.keys(obj)[0]);
          // const sizeValues = sizeSelectorArray.map(obj => Object.values(obj)[0]);

          const includesAny = (str, arr) => str && arr.some((item) => str.includes(item));

          if (includesAny(sizeLetterContent, sizeKeys)) {
            const matchingValues = sizeSelectorArray.filter((obj) =>
              includesAny(sizeLetterContent, Object.keys(obj))
            );
            if (matchingValues.length > 0) {
              const linkRecommendLeft = document.querySelector('#link-recommend-left');
              matchingValues.forEach((obj) => {
                const key = Object.keys(obj)[0];
                const value = obj[key];
                const staple = document.createElement('a');
                fitLet.textContent = key;
                let recommendedStaplePack = document.querySelector('#recommended-staple-pack');
                staple.classList.add('button');
                staple.classList.add('primary');
                staple.innerText = 'Shop Now';
                staple.href = `https://www.trueclassictees.com/collections/crew-neck-tees/products/staple-pack?variant=${value}`;
                recommendedStaplePack.innerHTML = '';
                document.querySelector('.shirt-size').innerHTML = `Size for Top: ${key}`;
                // document.querySelector('.shirt-size').style.order = '1';
                linkRecommendLeft.href = staple.href;
                recommendedStaplePack.appendChild(staple);
              });
            }
          }

          if (includesAny(sizeNumericContent, sizeKeys)) {
            const matchingValues = sizeSelectorArray.filter((obj) =>
              includesAny(sizeNumericContent, Object.keys(obj))
            );
            if (matchingValues.length > 0) {
              const linkRecommendRight = document.querySelector('#link-recommend-right');
              matchingValues.forEach((obj) => {
                const key = Object.keys(obj)[0];
                const value = obj[key];
                const jeans = document.createElement('a');
                fiNum.textContent = key;
                let recommendedJeans = document.querySelector('#recommended-jeans');
                jeans.classList.add('button');
                jeans.classList.add('primary');
                jeans.innerText = 'Shop Now';
                jeans.href = `https://www.trueclassictees.com/collections/mens-jeans/products/straight-fit-comfort-jeans-3-pack?variant=${value}`;
                recommendedJeans.innerHTML = '';
                document.querySelector('.jean-size').textContent = `Size for Bottom: ${key}`;
                // recommendedJeans.nextElementSibling.style.order = '1';
                linkRecommendRight.href = jeans.href;
                recommendedJeans.appendChild(jeans);
              });
            }
          }
        }

        reset.addEventListener('click', (event) => {
          fitForm.style.display = 'grid';
          fitSize.style.display = 'none';
          document.querySelector('.fit-log').innerHTML = '';
          handleReset();
          cleanIds();
        });


      });
    }

    function runCSV(csv) {
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      const json = [];
      for (let i = 1; i < lines.length; i += 1) {
        const obj = {};
        const currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j += 1) {
          obj[headers[j]] = currentline[j];
        }

        json.push(obj);
      }

      findFit(json);
    }

    function cleanIds() {
      const sizeNumericIdContent = document.querySelector('#size-numeric');
      const sizeLetterIdContent = document.querySelector('#size-letter');
      sizeNumericIdContent.textContent = '';
      sizeLetterIdContent.textContent = '';
      return [sizeLetterIdContent, sizeNumericIdContent].map(element => {
        const id = element.id;
        if (id === 'size-letter') {
          fitLet.textContent = '';
        } else if (id === 'size-numeric') {
          fiNum.textContent = '';
        }
        return id;
      });
    }

    function handleReset() {
      form.meter.style.display = 'none';
      form.feet.style.display = 'inline-block';
      form.inches.style.display = 'inline-block';
      form.weight.setAttribute('placeholder', 'Weight (LBS)');
      form.setAttribute('data-delegate', 'imperial');

      form.reset();

      submitBtn.disabled = true;
    }

    function handleTopFit(e) {
      if (e.target.dataset.delegate === 'topfit') {
        form.setAttribute('data-delegate', 'imperial');
        const csvTops = sortSizeData.letterUS;
        runCSV(csvTops);
      }
    }

    function handleTopFitMetric(e) {
      if (e.target.dataset.delegate === 'topfitmetric') {
        const csvTops = sortSizeData.letterInt;
        runCSV(csvTops);
      }
    }

    function handleBottomFit(e) {
      if (e.target.dataset.delegate === 'bottomfit') {
        form.setAttribute('data-delegate', 'imperial');
        const csvBottoms = sortSizeData.numericUS;
        runCSV(csvBottoms);
      }
    }

    function handleBottomFitMetric(e) {
      if (e.target.dataset.delegate === 'bottomfitmetric') {
        const csvBottoms = sortSizeData.numericInt;
        runCSV(csvBottoms);
      }
    }

    function handleBothFits(e) {
      if (e.target.dataset.delegate === 'combo') {
        form.setAttribute('data-delegate', 'imperial');


        const csvTops = sortSizeData.letterUS;
        const csvBottoms = sortSizeData.numericUS;

        console.log(csvTops);
        console.log(csvBottoms);

        runCSV(csvTops);
        runCSV(csvBottoms);

      }

    }

    function handleBothFitsMetrics(e) {
      if (e.target.dataset.delegate === 'combometric') {
        const csvTops = sortSizeData.letterInt;
        const csvBottoms = sortSizeData.numericInt;
        runCSV(csvTops);
        runCSV(csvBottoms);
      }
    }

    function roundValue(value) {
      return value ? Math.round(value) : '';
    }

    function toHeightMetric(value) {
      const feet = roundValue(Math.floor(value / FEET_CENTIMETER));
      const inches = roundValue((value % FEET_CENTIMETER) / INCHES_CENTIMETER);
      return [feet, inches];
    }

    function heightToggle(e) {
      if (e.target.dataset.delegate === 'heighttoggle') {
        if (e.target.checked) {
          form.meter.style.display = 'none';
          form.feet.style.display = 'inline-block';
          form.inches.style.display = 'inline-block';
          form.weight.setAttribute('placeholder', 'Weight (LBS)');
          form.setAttribute('data-delegate', 'imperial');

          // Value conversion
          const [feet, inches] = toHeightMetric(+form.meter.value);
          form.feet.value = feet;
          form.inches.value = inches;
        } else {
          form.meter.style.display = 'inline-block';
          form.feet.style.display = 'none';
          form.inches.style.display = 'none';
          form.weight.setAttribute('placeholder', 'Weight (KG)');
          form.removeAttribute('data-delegate');

          // Value conversion
          form.meter.value = roundValue(
            +form.feet.value * FEET_CENTIMETER + +form.inches.value * INCHES_CENTIMETER
          );
        }

        if (form['weight-toggle'] && form['weight-toggle'].checked !== e.target.checked) {
          form['weight-toggle'].checked = e.target.checked;
          form['weight-toggle'].dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }

    function weightToggle(e) {
      if (e.target.dataset.delegate === 'weighttoggle') {
        if (e.target.checked) {
          const pound = +form.weight.value;
          form.weight.value = roundValue(pound * KILO_POUND);
        } else {
          const kilo = +form.weight.value;
          form.weight.value = roundValue(kilo / KILO_POUND);
        }
        if (form['height-toggle'] && form['height-toggle'].checked !== e.target.checked) {
          form['height-toggle'].checked = e.target.checked;
          form['height-toggle'].dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }

    form.addEventListener('input', () => {
      const feetInput = form.querySelector("input[name='feet']");
      const inchesInput = form.querySelector("input[name='inches']");
      const meterInput = form.querySelector("input[name='meter']");
      const weightInput = form.querySelector("input[name='weight']");
      const ageInput = form.querySelector("input[name='age']");
      const isFormValid =
        (feetInput.value || inchesInput.value || meterInput.value) &&
        weightInput.value &&
        ageInput.value;
      submitBtn.disabled = !isFormValid;
    });

    document.addEventListener('click', handleBothFits);
    document.addEventListener('click', handleBothFitsMetrics);
    document.addEventListener('click', handleTopFit);
    document.addEventListener('click', handleTopFitMetric);
    document.addEventListener('click', handleBottomFit);
    document.addEventListener('click', handleBottomFitMetric);
    document.addEventListener('change', heightToggle);
    document.addEventListener('change', weightToggle);
  }

  const observer = new MutationObserver(checkModalVisibility);
  observer.observe(document.body, { childList: true, subtree: true });
  function checkModalVisibility(mutationsList, observer) {
    const modal = document.querySelector('.modal-popup');
    if (modal && modal.classList.contains('is-visible')) {
      inputs[0].focus();
    }
  }
}