   
var app = new Vue({
  el: '#app',
  mounted:function(){
    this.init() //method1 will execute at pageload
  },
  data: {
    todolists: [],
    statusselect: 'waitting',
    taskname: '',
    taskid: '',
    taskDetail: '',
    msgDialog: '',
    dateselect: '1',
    monthselect: '1',
    yearselect: '2017',
    isSave: true,
    status: [],
    date: [
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      { text: '3', value: '3' },
      { text: '4', value: '4' },
      { text: '5', value: '5' },
      { text: '6', value: '6' },
      { text: '7', value: '7' },
      { text: '8', value: '8' },
      { text: '9', value: '9' },
      { text: '10', value: '10' },
      { text: '11', value: '11' },
      { text: '12', value: '12' },
      { text: '13', value: '13' },
      { text: '14', value: '14' },
      { text: '15', value: '15' },
      { text: '16', value: '16' },
      { text: '17', value: '17' },
      { text: '18', value: '18' },
      { text: '19', value: '19' },
      { text: '20', value: '20' },
      { text: '21', value: '21' },
      { text: '22', value: '22' },
      { text: '23', value: '23' },
      { text: '24', value: '24' },
      { text: '25', value: '25' },
      { text: '26', value: '26' },
      { text: '27', value: '27' },
      { text: '28', value: '28' },
      { text: '29', value: '29' },
      { text: '30', value: '30' },
      { text: '31', value: '31' }
    ],
    months: [
      { text: 'Jan', value: '1' },
      { text: 'Feb', value: '2' },
      { text: 'Mach', value: '3' },
      { text: 'Apr', value: '4' },
      { text: 'May', value: '5' },
      { text: 'Jun', value: '6' },
      { text: 'Jul', value: '7' },
      { text: 'Aug', value: '8' },
      { text: 'Sep', value: '9' },
      { text: 'Oct', value: '10' },
      { text: 'Nov', value: '11' },
      { text: 'Dec', value: '12' }
    ],
    years: [
      { text: '2017', value: '2017' },
      { text: '2018', value: '2018' },
      { text: '2019', value: '2019' },
      { text: '2020', value: '2020' },
      { text: '2021', value: '2021' },
      { text: '2022', value: '2022' },
      { text: '2023', value: '2023' },
      { text: '2024', value: '2024' },
      { text: '2025', value: '2025' },
      { text: '2026', value: '2026' },
      { text: '2027', value: '2027' }
    ]
  },
  components: {
    confirm: {
      props: {
        class: String, 
        sureClass: String,
        func: {
          type: Function,
          required: true
        }
      },
      data: function() {
        return {
          confirm: false
        };
      },      
      template: '#confirm-template',
    }
  },
  methods: {
    init: function()
    {
      axios.post('http://localhost:8080/dateList', { })
      .then(response => {
//        console.log(response);
      })
      .catch(e => {
      })
      axios.post('http://localhost:8080/statusList', { })
      .then(response => {
        this.status = response.data;
      })
      .catch(e => {
      })
      axios.post('http://localhost:8080/getById', { taskId: '' })
      .then(response => {
        this.todolists = response.data;
      })
      .catch(e => {
      })
    },
    displayChange: function() {
      if(this.taskname != '' )
      {
        this.isSave = false;
      }
      else 
      {
        this.isSave = true;
      }    
    },
    clearDisplay: function()
    {
      this.taskname = '';
      this.dateselect = '1';
      this.monthselect = '1';
      this.yearselect = '2017';
      this.statusselect = 'waitting';
      this.taskDetail = '';
      this.taskid = '';
      this.displayChange();
    },
    edit: function(id)
    {
      axios.post('http://localhost:8080/getById', { taskId:id })
        .then(response => {
          var task = response.data;
          if(task !== null)
          {
            this.taskname = task.taskname;
            var date = task.date.split('/');

            if(date.length === 3)
            {
              this.dateselect = date[0];
              this.monthselect = date[1];
              this.yearselect = date[2];            
            }
            else
            {
              this.dateselect = '1';
              this.monthselect = '1';
              this.yearselect = '2017';            
            }
            this.statusselect = task.status;
            this.taskDetail = task.datail;
            this.taskid = task.id;
          }

        })
        .catch(e => {
        });
    },
    deleteitem: function(id)
    {
      axios.post('http://localhost:8080/delete', { taskId:id })
        .then(response => {
          this.todolists = response.data;
        })
        .catch(e => {
        });
    },
    save: function(id)
    {
      if(id === ''){
        id = this.guid();
        var date = this.dateselect + '/' + this.monthselect + '/' + this.yearselect;
        var todo = { id : id, taskname: this.taskname, date: date, status: this.statusselect, datail: this.taskDetail };
        axios.post('http://localhost:8080/add', {body: todo })
        .then(response => {
          this.todolists = response.data;
        })
        .catch(e => {
        });
      }
      else{
        var date = this.dateselect + '/' + this.monthselect + '/' + this.yearselect;
        var todo = { id : id, taskname: this.taskname, date: date, status: this.statusselect, datail: this.taskDetail };
        axios.post('http://localhost:8080/update', {body: todo })
        .then(response => {
          this.todolists = response.data;
        })
        .catch(e => {
        });
      }
      this.clearDisplay();
    },
    guid: function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
  }
})

