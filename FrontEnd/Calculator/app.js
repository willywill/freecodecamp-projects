const app = new Vue({
  el: '.app',
  data: {
    columns: 4,
    rows: 4,
    calculate: '',
    numberButtons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'CL', 0, '='],
    operatorButtons: ['+', '-', '*', '/']
  },
  methods: {
    buttonPress: function (val) {
      if(val === 'CL') {
        this.calculate = '';
        return;
      }
      
      if(val === '=') {
        try {
          const answer = eval(this.calculate);
          this.calculate = answer;
        } catch (error) {
          this.calculate = '';
          console.log(error);
        }
      } else {
        this.calculate += val; 
      }
    }
  }
});