<template>
  <div class="home">
    <div class="panels">
      <div class="calendar-panel">
        <calendar />
        <div class="week-abs">
          <b>本周工作摘要</b>
        </div>
      </div>
      <div class="note-panel">note</div>
      <div class="right-panel">
        <div class="project-panel">
          <b>项目分支</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Calendar from '@/components/calendar/calendar'
export default {
  name: 'Home',
  components: { Calendar }
}
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .panels {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .calendar-panel {
    width: 370px;
    flex-shrink: 0;
  }
  .note-panel {
    flex: 1;
    background-color: #ffffff;
    border-left: 3px double #f8f8f8;
    border-right: 3px double #f8f8f8;
  }
  .right-panel {
    width: 300px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
  }
  .week-abs {
    height: 200px;
    flex-shrink: 0;
    border-top: 3px double #f8f8f8;
    padding: 10px 20px;
  }
  .project-panel {
    flex: 1;
    border-top: 3px double #f8f8f8;
    padding: 10px;
  }
</style>
