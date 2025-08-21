<template>
  <div class="kalendar">
    <div class="zagolovok">
      <button @click="pred_mes" class="knopka">&lt;</button>
      <span class="mes_god">{{ tekushiy_mes }} {{ tekushiy_god }}</span>
      <button @click="sled_mes" class="knopka">&gt;</button>
    </div> 
    <div class="dni_nedeli">
      <span v-for="den in dni_nedeli" :key="den" class="den_nedeli">{{ den }}</span>
    </div>
    
    <div class="setka_dney">
      <div 
        v-for="den in setka" 
        :key="den.key"
        @click="vybrat_den(den)"
        :class="['den_kalendarya', { 
          'drugoy_mes': den.drugoy_mes,
          'aktivniy': den.aktivniy,
          'segodnya': den.segodnya
        }]"
      >
        {{ den.chislo }}
      </div>
    </div>
    
    <div class="yazik">
      <button @click="smенить_язык('ru')" :class="{ aktivniy: yazik === 'ru' }">RU</button>
      <button @click="smенить_язык('en')" :class="{ aktivniy: yazik === 'en' }">EN</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    nachalnayaData: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      tekushiy_data: new Date(),
      yazik: 'ru',
      perevody: {
        ru: {
          mesyatsy: [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
          ],
          dni: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
        },
        en: {
          mesyatsy: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ],
          dni: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        }
      }
    }
  },
  computed: {
    tekushiy_mes() {
      return this.perevody[this.yazik].mesyatsy[this.tekushiy_data.getMonth()]
    },
    tekushiy_god() {
      return this.tekushiy_data.getFullYear()
    },
    dni_nedeli() {
      return this.perevody[this.yazik].dni
    },
    setka() {
      const pervый_день = new Date(this.tekushiy_data.getFullYear(), this.tekushiy_data.getMonth(), 1)
      const posledniy_den = new Date(this.tekushiy_data.getFullYear(), this.tekushiy_data.getMonth() + 1, 0)
      const pervый_день_nedeli = pervый_день.getDay()
      const kolichestvo_dney = posledniy_den.getDate()
      
      const setka = []
      
      for (let i = pervый_день_nedeli - 1; i >= 0; i--) {
        const data = new Date(this.tekushiy_data.getFullYear(), this.tekushiy_data.getMonth() - 1, 0)
        const chislo = data.getDate() - i
        setka.push({
          key: `prev-${chislo}`,
          chislo: chislo,
          data: new Date(this.tekushiy_data.getFullYear(), this.tekushiy_data.getMonth() - 1, chislo),
          drugoy_mes: true,
          aktivniy: false,
          segodnya: false
        })
      }
      for (let i = 1; i <= kolichestvo_dney; i++) {
        const data = new Date(this.tekushiy_data.getFullYear(), this.tekushiy_data.getMonth(), i)
        const segodnya = this.сегодняшняя_дата(data)
        const aktivniy = this.активная_дата(data)
        
        setka.push({
          key: `current-${i}`,
          chislo: i,
          data: data,
          drugoy_mes: false,
          aktivniy: aktivniy,
          segodnya: segodnya
        })
      }
      const ostalosь_ячеек = 42 - setka.length
      for (let i = 1; i <= ostalosь_ячеек; i++) {
        setka.push({
          key: `next-${i}`,
          chislo: i,
          data: new Date(this.tekushiy_data.getFullYear(), this.tekushiy_data.getMonth() + 1, i),
          drugoy_mes: true,
          aktivniy: false,
          segodnya: false
        })
      }
      return setka
    }
  },
  mounted() {
    if (this.nachalnayaData) {
      this.ustanovit_nachalnuyu_datу()
    }
  },
  methods: {
    ustanovit_nachalnuyu_datу() {
      const [god, mes, den] = this.nachalnayaData.split('-')
      this.tekushiy_data = new Date(parseInt(god), parseInt(mes) - 1, parseInt(den))
    },
    pred_mes() {
      this.tekushiy_data = new Date(this.tekushiy_data.getFullYear(), this.tekushiy_data.getMonth() - 1, 1)
    },
    
    sled_mes() {
      this.tekushiy_data = new Date(this.tekushiy_data.getFullYear(), this.tekushiy_data.getMonth() + 1, 1)
    },
    vybrat_den(den) {
      if (den.drugoy_mes) return
      
      this.tekushiy_data = new Date(den.data)
      this.$emit('vybrannaya-data', this.format_data(den.data))
    },
    format_data(data) {
      const god = data.getFullYear()
      const mes = String(data.getMonth() + 1).padStart(2, '0')
      const den = String(data.getDate()).padStart(2, '0')
      return `${god}-${mes}-${den}`
    },  
    сегодняшняя_дата(data) {
      const segodnya = new Date()
      return data.getDate() === segodnya.getDate() && 
             data.getMonth() === segodnya.getMonth() && 
             data.getFullYear() === segodnya.getFullYear()
    },
    активная_дата(data) {
      return this.tekushiy_data.getDate() === data.getDate() && 
             this.tekushiy_data.getMonth() === data.getMonth() && 
             this.tekushiy_data.getFullYear() === data.getFullYear()
    },
    smенить_язык(noviy_yazik) {
      this.yazik = noviy_yazik
    }
  }
}
</script>
<style scoped>
.kalendar {
  width: 300px;
  font-family: Arial, sans-serif;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: white;
}
.zagolovok {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.knopka {
  background: #f0f0f0;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.knopka:hover {
  background: #e0e0e0;
}
.mes_god {
  font-size: 18px;
  font-weight: bold;
}
.dni_nedeli {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 12px;
}
.den_nedeli {
  text-align: center;
  font-weight: bold;
  color: #666;
  padding: 8px 0;
}
.setka_dney {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 20px;
}
.den_kalendarya {
  text-align: center;
  padding: 8px 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}
.den_kalendarya:hover:not(.drugoy_mes) {
  background: #f5f5f5;
}
.drugoy_mes {
  color: #ccc;
  cursor: default;
}
.aktivniy {
  background: #007bff;
  color: white;
}
.segodnya {
  font-weight: bold;
  color: #28a745;
}
.yazik {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.yazik button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}
.yazik button.aktivniy {
  background: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
