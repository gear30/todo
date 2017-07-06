var TodoListitem = Vue.extend({
  template: `<div class="form-inline container" id="app" >
              <div class="col-1" style="display:inline;border: 1px solid;min-height: 27px">
                {{ itemindex + 1 }} 
              </div>
              <div class="col-3" style="display:inline;border: 1px solid;min-height: 27px">
                {{ todoitem.taskname }}
              </div>
              <div class="col" style="display:inline;border: 1px solid;min-height: 27px">
                {{ todoitem.status }}
              </div>
              <div class="col" style="display:inline;border: 1px solid;min-height: 27px">
                {{ todoitem.date }}
              </div>
              <div class="col-1" style="display:inline;border: 1px solid;min-height: 27px">
                <button type="button" id="btnedit" v-on:click="edit(todoitem.id)" style="padding: 0;border: none;background: none;" ><i class="fa fa-pencil" aria-hidden="true"></i></button>
              </div>
              <div class="col-1" style="display:inline;border: 1px solid;min-height: 27px">
                <button type="button" id="btndelete" v-on:click="deleteitem(todoitem.id)" style="padding: 0;border: none;background: none;" ><i class="fa fa-trash" aria-hidden="true"></i></button>
              </div>
            </div> `,
  props: ['itemindex','todoitem','stage'],
  methods: {
    edit: function(id)
    {
      axios.post('http://localhost:8080/getById', { taskId:id })
      .then(response => {
        var task = response.data;
        if(task !== null)
        {
          var date = task.date.split('/');

          if(date.length === 3)
          {
            this.stage.todoitem = {taskname:task.taskname, statusselect: task.status, taskDetail: task.datail, taskid: task.id, dateselect: date[0],monthselect: date[1],yearselect: date[2]}; 
          }
          else
          {
            this.stage.todoitem = {taskname:task.taskname, statusselect: task.status, taskDetail: task.datail, taskid: task.id, dateselect: '1',monthselect: '1',yearselect: '2017'}; 
          }
          this.$emit('input', this.stage );
        }
      })
      .catch(e => {
        console.log(e);
      });
    },
    deleteitem: function(id)
    {
      this.stage.showModal = true;
      this.stage.deleteId = id;
      // axios.post('http://localhost:8080/delete', { taskId:id })
      //   .then(response => {
      //     this.stage.todolists = response.data;
      //     this.stage.todoitem.taskname = '';
      //     this.stage.todoitem.dateselect = '1';
      //     this.stage.todoitem.monthselect = '1';
      //     this.stage.todoitem.yearselect = '2017';
      //     this.stage.todoitem.statusselect = 'waitting';
      //     this.stage.todoitem.taskDetail = '';
      //     this.stage.todoitem.taskid = '';
      //     this.$emit('input', this.stage );
      //   })
      //   .catch(e => { 
      //     console.log(e);
      //   });
    }
  }
})

// registered the tree component with a dif

Vue.component('todoitem',TodoListitem)

var deletemodel = Vue.extend({
  template: `  <div class="modal-mask" v-show="stage.showModal" transition="modal">
        <div class="modal-container">

            <div class="modal-header">
                <h3>Confirm</h3>
            </div>

            <div class="modal-body">
                <label class="form-label">
                    Delete this item?
                </label>
            </div>

            <div class="modal-footer text-right">
                <button class="modal-default-button" @click="deletePost()">
                    Yes
                </button>
                <button class="modal-default-button" @click="noPost()">
                    No
                </button>
            </div>
        </div>
    </div>`,
  props: ['show', 'deleteId', 'stage'],
  methods: {
    deletePost: function () {
      axios.post('http://localhost:8080/delete', { taskId: this.deleteId })
        .then(response => {
          this.stage.todolists = response.data;
          this.stage.todoitem.taskname = '';
          this.stage.todoitem.dateselect = '1';
          this.stage.todoitem.monthselect = '1';
          this.stage.todoitem.yearselect = '2017';
          this.stage.todoitem.statusselect = 'waitting';
          this.stage.todoitem.taskDetail = '';
          this.stage.todoitem.taskid = '';
          this.$emit('input', this.stage );
        })
        .catch(e => { 
          console.log(e);
        });
      this.stage.showModal = false;
    },
    noPost: function () {
      // Insert AJAX call here...
      this.stage.showModal = false;
    }
  }
})

Vue.component('deletemodel',deletemodel)

new Vue({
  el: '#app',
  mounted:function(){
    this.init() //method1 will execute at pageload
  },
  data: {
    stage: {
      todolists: [],
      todoitem:{
        statusselect: 'waitting',
        taskname: '',
        taskid: '',
        taskDetail: '',
        dateselect: '1',
        monthselect: '1',
        yearselect: '2017'
      },
      showModal: false,
      deleteId: ''
    },
    msgDialog: '',
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
  methods: {
    init: function()
    {
      axios.post('http://localhost:8080/statusList', { })
      .then(response => {
        this.status = response.data;
      })
      .catch(e => {
      })
      axios.post('http://localhost:8080/getById', { taskId: '' })
      .then(response => {
        this.stage.todolists = response.data;
        console.log(response.data);
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
      this.stage.todoitem.taskname = '';
      this.stage.todoitem.dateselect = '1';
      this.stage.todoitem.monthselect = '1';
      this.stage.todoitem.yearselect = '2017';
      this.stage.todoitem.statusselect = 'waitting';
      this.stage.todoitem.taskDetail = '';
      this.stage.todoitem.taskid = '';
    },
    save: function(id)
    {
      var date = this.stage.todoitem.dateselect + '/' + this.stage.todoitem.monthselect + '/' + this.stage.todoitem.yearselect;
      if(id === '' || id === undefined){

        id = this.guid();
        var todo = { id : id, taskname: this.stage.todoitem.taskname, date: date, status: this.stage.todoitem.statusselect, datail: this.stage.todoitem.taskDetail };
        axios.post('http://localhost:8080/add', {body: todo })
        .then(response => {
          this.stage.todolists = response.data;
        })
        .catch(e => {
        });
      }
      else{
        var todo = { id : id, taskname: this.stage.todoitem.taskname, date: date, status: this.stage.todoitem.statusselect, datail: this.stage.todoitem.taskDetail };
        axios.post('http://localhost:8080/update', {body: todo })
        .then(response => {
          this.stage.todolists = response.data;
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
