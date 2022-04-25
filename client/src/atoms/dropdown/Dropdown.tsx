import styled from '@emotion/styled';
import Select from 'react-select';
import { dropdownType } from '../../types/common/dropdownType';

const Container = styled.div``;

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    border: 'none',
    fontSize: '14px',
  }),
  option: (styles: any) => {
    return {
      ...styles,
      fontSize: '14px',
    };
  },
};

const Dropdown = ({
  // defaultValue,
  options,
  selected,
  onChange,
}: dropdownType) => {
  return (
    <Container>
      <Select
        options={options}
        onChange={onChange}
        value={selected}
        styles={colourStyles}
      />
    </Container>
  );
};

export default Dropdown;
