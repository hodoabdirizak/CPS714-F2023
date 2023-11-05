import './Dropdown.css';

export const Dropdown = ({ value, options, onChange }) => {
    return (
        <select className='booking-dropdown' value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
    );
};