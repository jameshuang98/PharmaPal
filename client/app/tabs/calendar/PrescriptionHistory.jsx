import { View, Text, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import styles from './PrescriptionHistory.style';
import { Calendar, CalendarList, Agenda, ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import testIDs from '../../../constants/testIDs';
import { getMarkedDates, getRecordItems } from './agendaItems';
import AgendaItem from './AgendaItem';
import { getTheme, themeColor, lightThemeColor } from './theme';
import usePrescriptionData from '../../hooks/usePrescriptionData';

const leftArrowIcon = require('../../../assets/icons/previous.png');
const rightArrowIcon = require('../../../assets/icons/next.png');

const PrescriptionHistory = () => {
  const { state } = usePrescriptionData();
  // console.log("state", state)
  const recordItems = getRecordItems(state.recordData, state.prescriptionData);
  // console.log('recordItems', recordItems)
  const marked = getMarkedDates(recordItems);
  // console.log('marked', marked.current)
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

  const today = new Date().toISOString().split('T')[0];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.tabTitle}>Prescription History</Text>
      </View>
      <CalendarProvider
        date={today}
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
          markedDates={marked}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
          animateScroll
          closeOnDayPress={false}
        />
        <AgendaList
          sections={recordItems}
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