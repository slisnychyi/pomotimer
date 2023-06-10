import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const CustomDatePicker = ({ selected, onChange }) => {
  return (
    <div className="custom-datepicker">
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        className="form-control"
        popperPlacement="bottom-end"
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '5px, 10px'
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport'
          }
        }}
        customInput={
          <div className="datepicker-icon">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
        }
      />
    </div>
  );
};

export default CustomDatePicker;
