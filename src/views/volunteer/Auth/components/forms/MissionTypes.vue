<template>
  <div>
    <h2 class="title mb-2">בחר סוגי התנדבות</h2>

    <v-chip-group v-model="missionTypes" column multiple>
      <v-chip filter outlined>חלוקת מזון</v-chip>
      <v-chip filter outlined>עריכת קניות בסופר</v-chip>
      <v-chip filter outlined>משלוח תרופות</v-chip>
      <v-chip filter outlined>סיוע לעובדים חיוניים</v-chip>
      <v-chip filter outlined>תמיכה טלפונית</v-chip>
      <v-chip filter outlined>עזרה במשפחתונים</v-chip>
      <v-chip filter outlined>חקלאות</v-chip>
    </v-chip-group>

    <h2 class="title my-2">כמה שעות בשבוע תוכל להקדיש לביצוע משימות?</h2>
    <v-radio-group >
      <v-radio label="עד שעה" value="1"></v-radio>
      <v-radio label="1-3 שעות" value="3"></v-radio>
      <v-radio label="3-5 שעות" value="5"></v-radio>
      <v-radio label="5-10 שעות" value="10"></v-radio>
      <v-radio label="כמה שצריך" value="0"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  data: () => ({
    missionTypes: [1, 2, 0]
  })
};
</script>
