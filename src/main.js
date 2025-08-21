import Vue from 'vue'
import Calendar from './Calendar.vue'
Vue.component('Calendar', Calendar)
new Vue({
  el: '#app',
  data: {
    selectedDate: null
  },
  methods: {
    handleDateSelect(date) {
      this.selectedDate = date
      console.log('Выбрана дата:', date)
    }
  }
})
