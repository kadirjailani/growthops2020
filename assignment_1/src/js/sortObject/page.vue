<template>
  <div>

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      bitIcon: bitcoinIcon,
      currentData: {
        todayPrice: 0,
        thisMonthvalue: [],
        thisMonthDate: [],
      },
      fetchedData: [],
      dataLoaded: true,
      gdp: [
        { country: "USA", value: 20.5 },
        { country: "China", value: 13.4 },
        { country: "Germany", value: 4.0 },
        { country: "Japan", value: 4.9 },
        { country: "France", value: 2.8 },
      ],
    };
  },
  methods: {
    fecthData: function () {
      Promise.all([
        fetch("https://api.coindesk.com/v1/bpi/currentprice/MYR.json"),
        fetch(
          "https://api.coindesk.com/v1/bpi/historical/close.json?index=[MYR]"
        ),
      ])
        .then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            })
          );
        })
        .then((data) => {
          // Log the data to the console
          // You would do something with both sets of data here
          // console.log(data);
          this.fetchedData = data;

          // const string = data[0].bpi.MYR.rate;

          // console.log(finalString, firstString, secondString)
          // this.processTodayPrice(data);
          this.processTodayPrice();
          this.processMonthData();
        })
        .catch(function (error) {
          // if there's an error, log it
          console.log(error);
        });
    },
    processTodayPrice: function () {
      const price = this.fetchedData[0].bpi.MYR.rate;
      const splitPrice = price.split(".", 2);
      const firstString = splitPrice[0];
      const secondString = splitPrice[1].slice(0, 2);
      this.currentData.todayPrice = firstString + "." + secondString;
    },
    processMonthData: function () {
      this.currentData.thisMonth = this.fetchedData[1].bpi;

      const data = this.currentData.thisMonth;
      this.thisMonthvalue = Object.keys(data).map(function (key) {
        return data[key];
      });

      // this.processPriceDiffFromYesterday(data);

      console.log(this.currentData.thisMonthvalue);
    },
    processPriceDiffFromYesterday: function (param) {
      const todaysPoint = param[param.length - 1];
      const yesterdaysPoint = param[param.length - 2];
      console.log(param);
    },
    // dataHere: async function (urlLink) {
    //   const url = "https://api.coindesk.com/v1/bpi/historical/close.json";
    //   const myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");
    //   myHeaders.append("Access-Control-Allow-Origin", "*");

    //   let raw = JSON.stringify({
    //     type: this.selected,
    //     price: this.finalPrice,
    //     startDate: this.startDate,
    //     endDate: this.endDate,
    //     subscribeDate: this.selectedDateToSubs,
    //   });

    //   let requestOptions = {
    //     method: "GET",
    //     // headers: myHeaders,
    //     // body: raw,
    //     // redirect: "follow",
    //   };

    //   await fetch(`${url}`, requestOptions)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       this.dataGet = data.bpi;
    //       this.processDateAndValue();
    //     })
    //     .catch((error) => console.log(error));

    //   // console.log(raw);
    //   this.dataLoaded = true;
    // },
    // processDateAndValue: function () {
    //   let obj = this.dataGet;

    //   let date = Object.keys(obj);
    //   this.chartData.labels = date;

    //   let value = Object.values(obj);
    //   this.chartData.datasets.data = value;

    //   console.log(this.dataLoaded);

    //   //   console.log(
    //   //     this.chartData.labels,
    //   //     this.chartData.datasets.data,
    //   //     this.chartData
    //   //   );
    // },
    changeThisData: function () {
      let data = this.gdp[0].value;

      // for(let i = 0; i < this.gdp.length; i++) {
      //   this.gdp[i].value = this.gdp[i].value + 1;
      // }

      this.gdp[0].value = 2.8;
      this.gdp[1].value = 2.8;
      this.gdp[2].value = 2.8;
      this.gdp[3].value = 2.8;
      this.gdp[4].value = 2.8;

      console.log(data);
    },
  },
  mounted() {
    // this.getData();
    // this.changeThisData();
    this.fecthData();
  },
};
</script>