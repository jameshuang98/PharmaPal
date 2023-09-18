import { View, Text, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import { FAB } from 'react-native-paper';
import styles from './PrescriptionHistory.style';
import { Calendar, CalendarList, Agenda, ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import testIDs from '../../../constants/testIDs';
import { agendaItems, getMarkedDates } from './agendaItems';
import AgendaItem from './AgendaItem';
import { getTheme, themeColor, lightThemeColor } from './theme';

const leftArrowIcon = require('../../../assets/icons/previous.png');
const rightArrowIcon = require('../../../assets/icons/next.png');

const PrescriptionHistory = () => {
  const marked = useRef(getMarkedDates());
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor
  });

  // const onDateChanged = useCallback((date, updateSource) => {
  //   console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
  // }, []);

  // const onMonthChange = useCallback(({dateString}) => {
  //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
  // }, []);

  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <CalendarProvider
        date={agendaItems[1]?.title}
        // onDateChanged={onDateChanged}
        // onMonthChange={onMonthChange}
        // showTodayButton
        // disabledOpacity={0.6}
        theme={todayBtnTheme.current}
      // todayBottomMargin={16}
      >
        <ExpandableCalendar
          testID={testIDs.expandableCalendar.CONTAINER}
          // horizontal={false}
          // hideArrows
          allowShawdow
          initialPosition={ExpandableCalendar.positions.OPEN}
          // disablePan
          // hideKnob
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // disableWeekScroll
          theme={theme.current}
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked.current}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
          animateScroll
          closeOnDayPress={false}
        />
        <AgendaList
          sections={agendaItems}
          renderItem={renderItem}
          // scrollToNextEvent=[]
          sectionStyle={styles.section}
        // dayFormat={'yyyy-MM-d'}
        />
      </CalendarProvider>
    </SafeAreaView>
  )
};

export default PrescriptionHistory;