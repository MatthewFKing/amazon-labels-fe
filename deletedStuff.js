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