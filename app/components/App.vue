<template>
    <Page>
        <!-- <ActionBar class="top-bar" title="Climafit"/> -->
        <GridLayout class="wrapper" columns="*" rows="500">
            <ListView v-if="weather" for="item in weather" class="list-group" itemLoading="itemLoading">
                <v-template >
                  <GridLayout class="list-group-item" rows="auto, auto" columns="50, *">
                      <Image :src="item.iconLink" rowSpan="2" row="0" col="0" />
                      <Label :text="item.highTemperature" row="0" col="1" class="h1"/>
                      <Label :text="item.utcTime" row="1" col="1"  class="p"/>
                  </GridLayout>
                </v-template>
            </ListView>
        </GridLayout>
    </Page>
</template>

<script>
  import * as http from "http";
  import * as moment from "moment";

  export default {
    data() {
      return {
        isMobile: false,
        weather: []
      }
    },
    mounted(){
        this.getWeather(
          "o6ysbOOojo9mktpQaBb3",
          "3FnQPj0YOWyU00EsJO1BuQ",
          {
            latitude: 28.0914249,
            longitude: -25.9335354
          }
        );
    },
    methods: {
      getWeather(appId, appCode, position){
          const params = {
            product: "forecast_7days_simple",
            latitude: position.latitude,
            longitude: position.longitude,
            app_id: appId,
            app_code: appCode
          }
          http.getJSON("https://weather.api.here.com/weather/1.0/report.json" + this.encodeQueryParameters(params)).then(result => {
            this.weather = result.dailyForecasts.forecastLocation.forecast;
          }, error => {
            console.error(error);
          })
      },
      encodeQueryParameters(params) {
        //Object with encoded query after the covertion below
        const encodedParams = [];
        //LOOP - Convert to key equals value separated by & 'ampersand'
        for(const key in params){ //We loop through the object so each key in the object
          if(params.hasOwnProperty(key)){//Check to see if the object has it's own property "key"
              encodedParams.push(key + "=" + encodeURIComponent(params[key]));  //Encoding happens here: if the above if statement is true we're switching the object from "object format" to a string
                                                                                //...so that if there's any special characters it doesn't mess anythings up as far as the request goes.
          }
        }
        //When Loop is done, "We don't wanna work with an array"...
        return "?" + encodedParams.join('&');  //return encoded "?" - query parameters and join each item in the array with the 'ampersand'
      }
    }
  }
</script>

<style scoped>

    ActionBar {
      background-color: #e2e2e2;
    }

    .h1 {
      font-size: 20px;
      color: #fff;
    }

    .p {
      font-size: 12px;
      color: #fff;
    }

    .list-group-item {
      background: #FACC33;
      color: #fff;
      padding: 0;
      margin-bottom: 10px;
    }

</style>
