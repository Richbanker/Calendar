import Vue from 'vue'
import Calendar from './Calendar.vue'

// Регистрируем компонент глобально
Vue.component('Calendar', Calendar)

// Создаем экземпляр Vue
const app = new Vue({
  el: '#app',
  data: {
    selectedDate: null
  },
  mounted() {
    console.log('Vue app mounted successfully')
    console.log('Calendar component:', Calendar)
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

// Проверяем, что Vue инициализировался
console.log('Vue app created:', app)
