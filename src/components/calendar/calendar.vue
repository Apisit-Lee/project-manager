<template>
  <div id="comp-calendar">
    <div class="comp-calendar-panel-header">
      <span
        class="iconfont icon-zuojiantou"
        title="上一年"
        @click="prevYear"
      ></span>
      <span
        class="iconfont icon-fanhui"
        title="上一月"
        @click="prevMonth"
      ></span>
      <span
        class="year-month"
        title="双击复位"
        @dblclick="resetToDay"
      >
        {{todayInPanel.format('YYYY年M月')}}
      </span>
      <span
        class="iconfont icon-gengduo"
        title="下一月"
        @click="nextMonth"
      ></span>
      <span
        class="iconfont icon-youjiantou"
        title="下一年"
        @click="nextYear"
      ></span>
    </div>
    <div class="comp-calendar-header">
      <div
        class="comp-calendar-header-item"
        v-for="(name, index) in weekNames"
        :key="`week-name-${index}`"
      >
        {{name}}
      </div>
    </div>
    <div class="comp-calendar-panel">
      <div
        class="comp-calendar-day"
        v-for="(day, index) in days"
        :key="`day-${index}`"
        :class="dayClass(day, index)"
      >
        {{day | dayLabel}}
      </div>
    </div>
  </div>
</template>

<script>
import { $today, $lastMonthDayCountInPanel, $monthDayCount, $getMomentByYMD } from '@/utils/time'

export default {
  name: 'calendar',
  data () {
    return {
      weekNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      days: [],
      todayInPanel: $today(),
      dataSource: {
        '2020-06-01': {},
        '2020-06-02': {}
      },
      activeDayLabels: [1, 2, 3, 4, 5, 8, 9]
    }
  },
  filters: {
    dayLabel (day) {
      return day.today ? '今天' : day.label
    }
  },
  mounted () {
    this.changeTodayInPanel($today())
  },
  methods: {
    prevYear () {
      this.changeTodayInPanel(this.todayInPanel.subtract(1, 'years'))
    },
    nextYear () {
      this.changeTodayInPanel(this.todayInPanel.add(1, 'years'))
    },
    resetToDay () {
      this.changeTodayInPanel($today())
    },
    prevMonth () {
      this.changeTodayInPanel(this.todayInPanel.subtract(1, 'months'))
    },
    nextMonth () {
      this.changeTodayInPanel(this.todayInPanel.add(1, 'months'))
    },
    changeTodayInPanel (date) {
      this.todayInPanel = date
      this.days = this.calcDays(date)
    },
    calcDays (date) {
      const prevDayCount = $lastMonthDayCountInPanel(date)
      const thisMonthDayCount = $monthDayCount(date)
      const year = date.year()
      const month = date.month() + 1
      const prev = [...Array(prevDayCount)].map(i => {
        return {
          label: -1,
          date: null,
          today: false
        }
      })
      const days = [...Array(thisMonthDayCount)].map((item, i) => {
        const label = i + 1
        const date = $getMomentByYMD(year, month, label)
        const today = $today().format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
        console.log(today, $today().format('YYYY-MM-DD'), date.format('YYYY-MM-DD'))
        return {
          label,
          date,
          today
        }
      })
      return [...prev, ...days]
    },
    dayClass (day, index) {
      return {
        active: day.date && Object.keys(this.dataSource).includes(day.date.format('YYYY-MM-DD')),
        today: day.today,
        hidden: day.label === -1
      }
    }
  }
}
</script>

<style scoped>
  .comp-calendar-header {
    display: grid;
    grid-template-columns: repeat(7, 30px);
    grid-gap: 20px;
    justify-content: center;
    padding: 10px 0;
    background: #f0f0f0;
  }
  .comp-calendar-header-item {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
  }
  .comp-calendar-panel-header {
    padding: 10px 20px;
    background: #f8f8f8;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }
  .comp-calendar-panel-header .iconfont {
    padding: 0 10px;
    flex-shrink: 0;
    margin: 0 3px;
    border-radius: 3px;
    background-color: #ffffff;
    box-shadow: -3px -3px 6px 2px rgba(255, 255, 255, 1), 3px 3px 6px 2px rgba(0, 0, 0, .08);
    cursor: pointer;
    font-size: 8px;
  }
  .comp-calendar-panel-header .iconfont:active {
    box-shadow: -3px -3px 6px 2px rgba(255, 255, 255, 1) inset, 3px 3px 6px 2px rgba(0, 0, 0, .08) inset;
  }
  .year-month {
    font-size: 18px;
    flex: 1;
    text-align: center;
    cursor: pointer;
  }
  .comp-calendar-panel {
    display: grid;
    grid-template-columns: repeat(7, 40px);
    grid-template-rows: repeat(4, 40px);
    grid-gap: 10px;
    justify-content: center;
    padding: 10px;
  }
  .comp-calendar-day {
    background: #ffffff;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    box-shadow: -3px -3px 6px 2px rgba(255, 255, 255, 1), 3px 3px 6px 2px rgba(0, 0, 0, .08);
  }
  .comp-calendar-day.today {
    font-size: 10px;
    font-weight: bold;
    color: #ffffff;
    background-color: cornflowerblue;
  }
  .comp-calendar-day.active {
    border-color: rgba(0, 0, 0, .08);
    background-color: rgba(117, 183, 255, 0.08);
    color: cornflowerblue;
    font-weight: bold;
    box-shadow: -3px -3px 6px 2px rgba(255, 255, 255, 1) inset, 3px 3px 6px 2px rgba(0, 0, 0, .08) inset;
  }
  .comp-calendar-day.today.active {
    color: #ffffff;
    background-color: cornflowerblue;
    box-shadow: -3px -3px 6px 2px rgba(100, 149, 237, 1) inset, 3px 3px 6px 2px rgba(0, 0, 0, .28) inset;
  }
  .comp-calendar-day:active {
    border-color: rgba(0, 0, 0, .08);
    box-shadow: -3px -3px 6px 2px rgba(255, 255, 255, 1) inset, 3px 3px 6px 2px rgba(0, 0, 0, .08) inset;
  }
  .comp-calendar-day.today:active {
    background-color: cornflowerblue;
    box-shadow: -3px -3px 6px 2px rgba(100, 149, 237, 1) inset, 3px 3px 6px 2px rgba(0, 0, 0, .28) inset;
  }
  .comp-calendar-day.hidden {
    opacity: 0;
  }
</style>
