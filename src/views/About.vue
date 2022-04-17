<template>
  <div class="all-apps">
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1 fam-semi-bold">Source</div>
        <div class="col col-2 fam-semi-bold">Amount</div>
        <div class="col col-3 fam-semi-bold">Target</div>
        <div class="col col-4 fam-semi-bold">Converted</div>
        <div class="col col-5 fam-semi-bold"></div>
      </li>
      <li v-if="history.length == 0">There is no conversion history available yet. </li>
      <li class="table-row" v-else v-for="(hist, index) in history" :key="hist">
        <p class="col col-1 fam-regular">
          {{ hist.from }}
        </p>
        <p class="col col-2 fam-regular">
          {{ formatNumber(hist.amount) }}
        </p>
        <p class="col col-3 fam-bold">
          {{ hist.to }}
        </p>
        <p class="col col-4 fam-bold">
          {{ formatNumber(hist.convertedAmount)  }}
        </p>
        <p class="col col-5 fam-bold">
          <img src="../assets/images/delete.svg" alt="" @click="deleteHistory(index)"/>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: [],
      
    };
  },
  components: {},
  mounted() {
    this.getConversionHistory();
    this.formatNumber()
  },
 
  methods: {
    getConversionHistory() {
      let history = localStorage.getItem("history");
      this.history = JSON.parse(history);
      // console.log(JSON.parse(history));
    },
    deleteHistory(index){
      this.history.splice(index,1)
      localStorage.setItem('history', JSON.stringify(this.history))
      console.log(index)
    },
    formatNumber(amount){
        amount = parseFloat(amount).toFixed(2)
        let withCommas = Number(amount).toLocaleString('en');
        return withCommas
    }
  },
};
</script>

<style lang="scss" scoped>
.all-apps {
  width: 100%;
  max-width: 600px;
}
.responsive-table {
  li {
    border-radius: 3px;
    padding: 9px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .table-header {
    font-size: 14px;
    .col {
      font-size: 13px;
      color: #000;
    }
  }
  .table-row {
    background-color: #ffffff;
    border-radius: 8px;
    &:nth-of-type(2n + 1) {
      background-color: rgba(65, 135, 220, .5);
     
      color: #ffffff;
    }
    .col {
      font-size: 14px;
      img {
        width: 12px;
        cursor: pointer;
      }
    }

    .col-4 {
      //text-align: center;
      padding: 7px;
      border-radius: 5px;
    }
  }

  .col-1 {
    flex-basis: 18%;
  }
  .col-2 {
    flex-basis: 21%;
  }
  .col-3 {
    flex-basis: 18%;
  }
  .col-4 {
    flex-basis: 21%;
  }
    .col-5 {
    flex-basis: 6%;
  }
}

@media all and (max-width: 767px) {
  .table-header {
    display: none;
  }
  li {
    display: block;
  }
  .col {
    flex-basis: 100%;
  }
}
</style>