getit = () => {
  axios.get(`${this.url}/qareport`)
    .then(response => {
      console.log(response.data);
      let dates = response.data.map(entry => {
        //return moment(entry.date).format('L');
        return entry.date;
      });
      dates = [...new Set(dates)].sort();
      console.log(dates);
      this.setState({ dates });
      let pointData = [];
      dates.forEach((date, i) => {
        let pointTotal = response.data.filter(entry => entry.date === date).reduce((total, line) => {
          if (!isNaN(parseInt(line.pointsValue, 10))) {
            return total + parseInt(line.pointsValue, 10);
          } else {
            return total + 0;
          }
      }, 0);
      pointData.push([i, pointTotal]);
      
    });
    this.setState({ pointData })
    });
}


/////////////////////////////////////////////
//Amazon Label Generator
// app.post('/pdf/final', (req, res, next) => {
//     let time = req.body.time;
//     console.log(req.ip);
//     console.log(new Date().toLocaleTimeString());
//     fs.readFile(`./tmp/${time}-final.pdf`, function (err, data) {
//         res.contentType("application/pdf");
//         res.send(data);
//         deleteFiles('./cropped');
//         deleteFiles('./images');
//         deleteFiles('./tmp');
//     });

// });

// app.post('/pdf', (req, res, next) => {
//     let file = req.files.file;
//     let time = Date.now();
//     file.mv(`./tmp/${time}.pdf`, function (err) {
//         if (err) {
//             return res.status(500).send(err);
//         } else {
//             helpers.pdfToPic(time, function (time) {
//                 res.json(time);
//             })
//         }
//     });
// });

/////////////////////////////////////////////
//Web Order Report
// app.post('/qalog', async (req, res, next) => {
//     let qaEntries = await qaEntry.findByNumber(req.body.number);
//     singleTech(qaEntries, (returnData) => {
//         res.json(returnData);
//     })
// });

// app.post('/qasearch', async (req, res, next) => {
//     console.log(req.body)
//     const match = await qaEntry.find({[req.body.type]: req.body.query});
//     res.json(match);
// })

// app.get('/updatelog', async (req, res, next) => {
//     const del = await qaEntry.deleteMany({isThisMonth: true});
    
//     qaLog(del, (entries) => {
//         entries.forEach(entry => {
//             const newEntry = new qaEntry(entry);
//             newEntry.save((err, id) => {
//                 if (err) return console.log(err);
//             });
//         });
//         res.json(entries.length)
//     });
// });

// app.post('/addtech', async (req, res, next) => {
//     //console.log(req.body);
//     req.body.map(techInfo => {
//         const newTech = new tech(techInfo);
//         newTech.save((err, id) => {
//             if (err) return console.log(err);
//         })
//     })
//     res.send('got it')
// });

// app.get('/updatemonth', async (req, res, next) => {
//     const update = await qaEntry.updateMany({isThisMonth: true}, {isThisMonth: false});
//     res.json(update.nModified);
// })

// app.get('/qainfo', async (req, res, next) => {
//     //console.log(req.body);
//     tech.find({}, (err, techs) => {
//         res.json(techs);
//     });
// });

// app.get('/qareport', (req, res, next) => {
//     qaEntry.find({ techNumber: '43674645' }, (err, entries) => {
//         res.json(entries);

//     });
// })
