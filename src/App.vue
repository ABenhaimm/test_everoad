<template>
  <div id="app">
    <md-tabs>
      <md-tab id="tab-home" md-label="Employer" to="/components/tabs" exact>
        <template v-if=employerShow>
          <Input placeholder="Enter maximum offer" v-model='employer' />
          <Button ref='btn-employer' text='Send' @click.native='checkOffer("employer")' />
        </template>
      </md-tab>

      <md-tab id="tab-pages" md-label="Employee" to="/components/tabs/pages">
        <template v-if=employeeShow>
          <Input placeholder='Enter minimum salary' v-model='employee' />
          <Button ref='btn-employee' text='Send' @click.native='checkOffer("employee")' />
        </template>
      </md-tab>
    </md-tabs>

    <md-dialog-alert
      :md-active.sync="modalOpen"
      :md-title='modalSuccess'
      :md-content='"London temperature: " + londonTemp + "°C <br><br>" + modalText' />
  </div>
</template>


<script>
  import './assets/css/style.css';

  import Button from './components/Button.vue'
  import Input from './components/Input.vue'


  export default {
    name: 'App',
    data(){
      return {
        londonTemp: '0',
        employer: 0,
        employerShow: true,
        employee: 0,
        employeeShow: true,
        modalText: '',
        modalSuccess: '',
        modalOpen: false
      }
    },
    components: {
      Button, 
      Input
    },
    beforeMount(){
      fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=139e1feea55d2ace7a987d17cb4bf446")
      .then(response => {
        let resp = response.json();
        resp.then((res) => {
          this.londonTemp = res.main.temp - 273.15;
          this.londonTemp = this.londonTemp.toFixed(2);
        });
      });
    },
    methods: {
      checkOffer: function(type) {
        if(type === 'employer'){
          if(this.employer.number > 0){
            this.employerShow = false;
          }else{
            this.modalText = 'Enter a number';
            this.modalOpen = true;
          }
        }

        if(type === 'employee'){
          if(this.employee.number > 0){
            this.employeeShow = false;
          }else{
            this.modalText = 'Enter a number';
            this.modalOpen = true;
          }
        }

        if(this.employer.number - this.employee.number >= 0){
          this.modalSuccess = 'Success';
          this.modalText = 'The employer proposal was good';
          this.modalOpen = true;
        }else if(this.employer.number - this.employee.number < 0){
          this.modalSuccess = 'Transaction failed';
          this.modalText = 'The employer proposal was not enough';
          this.modalOpen = true;
        }
      }
    }
  }
</script>
