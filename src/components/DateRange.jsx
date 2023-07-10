import { CustomProvider, DateRangePicker } from 'rsuite';

export function DateRange({ handleDateRangeChange }) {
  const storedStartDate = localStorage.getItem('startDate');
  const storedEndDate = localStorage.getItem('endDate');

  const defaultStartDate = storedStartDate ? new Date(storedStartDate) : null;
  const defaultEndDate = storedEndDate ? new Date(storedEndDate) : null;

  return (
    <CustomProvider theme="dark">
      <DateRangePicker
        placeholder="Rango de fechas"
        onChange={handleDateRangeChange}
        defaultValue={[defaultStartDate, defaultEndDate]}
      />
    </CustomProvider>
  );
}
