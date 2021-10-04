import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';

const AppDatepicker = ({
  onDateChange,
}: {
  onDateChange: (date: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = () => {
    onDateChange(date.getDate().toLocaleString('PT-br'));
  };

  useEffect(() => {
    handleDateChange();
  }, [date]);

  return (
    <>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        onDateChange={setDate}
      />
    </>
  );
};

export default AppDatepicker;
