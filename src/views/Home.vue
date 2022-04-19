<template>
  <div class="home">
    <h2>exchange rate</h2>
    <h1>{{sign}} {{ formatNumber(convertedAmount)}}</h1>
    <h2 v-if="isLoading">Converting ...</h2>
    <form>
      <label for="amount">Amount</label>
      <input
        type="number"
         min="1" step="any"
        id="amount"
        placeholder="Amount"
        v-model="amount"
        @input="$emit('input', $event.target.value)"
      /> 
      <!-- {{formatAmount}} -->
      <div class="convert-currency">
        <div class="from-currency convert">
          <label for="from">From</label>

          <select
            name="from"
            id="from"
            @change="changeCode($event)"
            v-model="currencyOne"
          >
            <option v-for="code in currencyCodes" :key="code" :value="code" >
              {{ code }}
            </option>
          </select>
        </div>
        <img src="../assets/images/swap.svg" alt="" @click="swapCurrency()"/>
        <div class="to-currency convert">
          <label for="to">to</label>
          <select name="to" id="to" v-model="currencyTwo">
            <option v-for="code in currencyCodes" :key="code" :value="code" @change="changeCode($event)">
              {{ code }}
            </option>
          </select>
        </div>
      </div>

      <button @click.prevent="convertAmount()">convert</button>
    </form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
export default {
  name: "Home",
   setup() {
      // Get toast interface
      const toast = useToast();


      return { toast }
    },
  data() {
    return {
      currencyCodes: [
        "ALL",
        "DZD",
        "AOA",
        "ARS",
        "AMD",
        "AUD",
        "EUR",
        "AZN",
        "BHD",
        "BBD",
        "BYN",
        "BOB",
        "BAM",
        "BWP",
        "BRL",
        "BGN",
        "CVE",
        "KHR",
        "XAF",
        "CAD",
        "CLP",
        "CNY",
        "COP",
        "CDF",
        "CRC",
        "HRK",
        "CZK",
        "DKK",
        "DOP",
        "USD",
        "EGP",
        "FJD",
        "GEL",
        "GHS",
        "GIP",
        "GTQ",
        "GBP",
        "GYD",
        "HNL",
        "HKD",
        "HUF",
        "ISK",
        "INR",
        "IDR",
        "IQD",
        "ILS",
        "XOF",
        "JMD",
        "JPY",
        "JOD",
        "KZT",
        "KES",
        "KRW",
        "KWD",
        "KGS",
        "LAK",
        "LBP",
        "LYD",
        "CHF",
        "MOP",
        "MGA",
        "MWK",
        "MYR",
        "MVR",
        "MRU",
        "MUR",
        "MXN",
        "MDL",
        "MNT",
        "MAD",
        "MZN",
        "MMK",
        "NAD",
        "NZD",
        "NIO",
        "NGN",
        "MKD",
        "NOK",
        "OMR",
        "PKR",
        "PAB",
        "PGK",
        "PYG",
        "PEN",
        "PHP",
        "PLN",
        "QAR",
        "RON",
        "RUB",
        "RWF",
        "XCD",
        "SAR",
        "RSD",
        "SGD",
        "ZAR",
        "LKR",
        "SZL",
        "SEK",
        "TWD",
        "TJS",
        "TZS",
        "THB",
        "TTD",
        "TND",
        "TRY",
        "TMT",
        "UGX",
        "UAH",
        "AED",
        "UYU",
        "UZS",
        "VND",
        "ZMW",
      ],
      currencyOne: "USD",
      currencyTwo: "NGN",
      amount: '',
      sign: '',
      convertedAmount: 0,
      convertedRate: 0,
      history: [],
      isLoading: false,
      
    };
  },
  created() {
   // this.getExchangeRate();
    this.currencyCodes.sort();
  },
  computed: {
    formatAmount() {
      return this.formatAmounts()
    },
  },
  methods: {
    changeCode(e) {
      console.log(e.target.value);
    },
    formatAmounts() {
      if (isNaN(this.amount)) {
        return this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }else{
        return Number(this.amount);
      }
    },
    swapCurrency(){
      const temp = this.currencyOne
      this.currencyOne = this.currencyTwo
      this.currencyTwo = temp
    },
    formatNumber(amount){
        amount = parseFloat(amount).toFixed(2)
        let withCommas = Number(amount).toLocaleString('en');
        return withCommas
    },
    convertAmount(){
      if(this.amount === '' ){
        console.log('empty')
        this.toast.error("Please put in a value");
      }else if(isNaN(this.amount)){
         this.toast.error("Please put in a valid number");
      }else{
        this.isLoading = true
         fetch(`http://www.floatrates.com/daily/${this.currencyOne}.json`)
        .then((response) => response.json())
        .then((data) => {
          for(let [key, value] of Object.entries(data)){
            if(key === this.currencyTwo.toLowerCase()){
              this.convertedAmount = this.amount * value.rate
              this.sign = value.code
              let singleExchange = {}

              singleExchange['from'] = this.currencyOne
              singleExchange['to'] = this.currencyTwo
              singleExchange['amount'] = this.amount
              singleExchange['convertedAmount'] = this.convertedAmount
                
              this.history.push(singleExchange)

              localStorage.setItem('history', JSON.stringify(this.history))
              this.toast.success("Sucessfully converted");
              this.isLoading = false
            }
            
          }
        });
      }
      
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  box-shadow: 3px 3px 1.5px 0.5px #ddd;
  padding: 50px 20px 4em;
  position: relative;
  width: 90%;
  max-width: 400px;
  background: #fff;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background: #4187dc;
    left: 0;
    top: 0;
  }
  h1,
  h2 {
    text-align: center;
  }
  h2 {
    text-transform: capitalize;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 0.2em;
    color: #a0a0a0;
  }
  h1 {
    font-size: 27px;
    font-weight: 500;
    color: #10101a;
  }
}
.convert-currency {
  display: flex; 
  align-items: center;
  margin: 1em auto 1em;
  width: 100%;
  justify-content: space-between;
  img {
    width: 30px;
   
    cursor: pointer;
    margin-top: 1.2em;
  }
}
form {
  margin-top: 2em;

  input,
  select {
    outline: none;
  }
  label {
    font-size: 15px;
    font-weight: 500;
  }
  select {
    display: block;
    width: 100px;
    padding: 5px 10px;
    border: 1px solid #a0a0a0;
    //appearance: none;
  }
  input {
    width: 100%;
    padding: 10px;
  }
  button {
    display: block;
    width: 100%;
    padding: 10px 10px;
    cursor: pointer;
    margin-top: 2.5em;
    background: #4187dc;
    border: none;
    text-transform: uppercase;
    color: #fff;
    font-weight: 700;
  }
}

select::-ms-expand {
  display: none;
}

.select {
  &:after {
    position: absolute;
    content: "";
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    background: red;
  }
}
</style>
