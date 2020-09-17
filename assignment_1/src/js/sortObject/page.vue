<template>
  <div>
    <div>
      <p>Filtered by Age</p>
      <ul class="nav nav-pills" role="tablist">
        <!-- Filter dropdown 1 -->
        <li role="presentation" class="dropdown">
          <a
            href="#"
            class="dropdown-toggle dropdown-default"
            id="filter-1"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ currentFilter }}
            <span class="drop-icon caret"></span>
          </a>
          <ul class="dropdown-menu" id="menu-1" aria-labelledby="drop">
            <li v-for="item in dropDownList" v-bind:key="item.index">
              <button v-on:click="filterSelect(item)">{{ item }}</button>
            </li>
          </ul>
        </li>
      </ul>

      <div class="row user-list">
        <div
          v-for="person in currentData"
          v-bind:key="person.id"
          class="col-12 col-md-6 col-lg-6 col-xl-4"
        >
          <div class="d-flex user-card">
            <div class="profile-image">
              <img v-bind:src="imageIcon" />
            </div>
            <div class="details">
              <ul>
                <li>
                  <h4>{{ person.name }}</h4>
                </li>
                <li>
                  Email: <strong>{{ person.email }}</strong>
                </li>
                <li>
                  Mobile: <strong>{{ person.phone }}</strong>
                </li>
                <li>
                  Company: <strong>{{ person.company }}</strong>
                </li>
                <li>
                  Address: <strong>{{ person.address.suite }}, {{ person.address.street }}, {{ person.address.zipcode }} {{ person.address.city }}</strong>
                </li>
                <li>
                  Website: <strong>{{ person.website }}</strong>
                </li>
                <li>
                  Age: <strong>{{ person.age }}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import icon from "../../img/icon_male.png";

export default {
  components: {},
  data() {
    return {
      imageIcon: icon,
      currentFilter: "All",
      dropDownList: ["All", "20 and below", "21 to 39", "Above 40"],
      currentData: [],
      fetchedData: [],
      errorMessage: ""
    };
  },
  methods: {
    fetchLoad: async function () {
      try{
        let response = await fetch(
          `http://www.mocky.io/v2/5d73bf3d3300003733081869`
        );
        let data = await response.json();
        this.fetchedData = data;
        this.currentData = data;
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    filterSelect: function (item) {
      switch (item) {
        case "20 and below":
          this.filterUnder20();
          this.sortListing();
          break;
        case "21 to 39":
          this.filter21To39();
          this.sortListing();
          break;
        case "Above 40":
          this.filterAbove40();
          this.sortListing();
          break;
        case "All":
          this.filterShowAll();
          break;
      }

      this.currentFilter = item;
    },
    filterShowAll: function () {
      this.currentData = this.fetchedData;
    },
    filterUnder20: function () {
      this.currentData = this.fetchedData.filter((el) => {
        return el.age <= 20;
      });
    },
    filter21To39: function () {
      this.currentData = this.fetchedData.filter((el) => {
        return el.age >= 21 && el.age < 40;
      });
    },
    filterAbove40: function () {
      this.currentData = this.fetchedData.filter((el) => {
        return el.age >= 41;
      });
    },
    sortListing: function () {
      this.currentData.sort((a, b) => {
        return a.age - b.age;
      });
    },
  },
  mounted() {
    this.fetchLoad();
  },
};
</script>