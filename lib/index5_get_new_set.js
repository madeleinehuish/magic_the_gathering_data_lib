// this file grabs the most current set off of scryfall and converts the data
// just change line 7 to create a new file
// also modify MagicApp/magicAPI/full_scryfall (change name)
// magicAPI/combinedData_Full.js
// data/setDates.js & data/setSymbols.js
// Magic/Filters/SetsAll.js 

// if it is a new standard set, go into data in client and modify standard_blocks (both in front and back end data) and also current 
// block and current standard in initial state
// add to filters/blocks.js default block (need to add this to a config)
// add to  magic.js line 316 standard.block current value
// update data/combinedData in front end data and also standard_scryfall (need to consolidate this)

const fs = require('fs');
const util = require('util');
const axios = require('axios');

const NEW_SET = 'eld';


const directory = '../data_new_sets/';
const filename = NEW_SET;

let finalArray = [];
for (let i = 1; i <= 249; i++) {
  finalArray.push(
    JSON.parse(JSON.stringify({
      "identifiers": [
        {
          "set": NEW_SET,
          "collector_number": `${i}`
        }
      ]
    })
    ))
}

const getCurrentSet= async () => {
  // console.log('inside getCurrentPrice... card: ', card);
  const url = `https://api.scryfall.com/cards/collection`;

  let collectedValues = [];
  for(let elem of finalArray){
    try {

      // const paramsConverted = JSON.stringify(params);
      // console.log('params', params)
      const response = await axios({
        method: 'post',
        url,
        data: elem
      });
      collectedValues.push(response.data.data[0])
      // const response = await axios.post(url, params);
      // console.log('response from scryfall api: ', response);

      // console.log(util.inspect(response.data, { showHidden: false, depth: null }))
      // console.log(response.data)
      // console.log('response data from scryfall api: ', response)

      console.log(response.data.data[0].name) ;

    } catch (error) {
      console.log('axios error: ', error);
    }
  }

  // console.log(util.inspect(collectedValues, { showHidden: false, depth: null }))
  fs.writeFileSync(directory + filename + '.js', 'module.exports = ' + util.inspect(await collectedValues, { maxArrayLength: null, showHidden: false, depth: null }), function (err) {
    if (err) {
      console.log('error in saving', err)
      throw err;
    };
    console.log('Saved!');
  });

}

getCurrentSet();
