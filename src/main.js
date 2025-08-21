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
      
      // Показываем блок с выбранной датой
      const displayBlock = document.getElementById('selected-date-display')
      const dateText = document.getElementById('selected-date-text')
      
      if (displayBlock && dateText) {
        dateText.textContent = date
        displayBlock.style.display = 'block'
      }
    }
  }
})
