import PropTypes from 'prop-types';

// project-import
import PopupStyled from './PopupStyled';

// ==============================|| MAP BOX - MODAL ||============================== //

export default function MapPopup({ sx, children, ...other }) {
  return (
    <PopupStyled anchor="bottom" sx={sx} {...other}>
      {children}
    </PopupStyled>
  );
}

MapPopup.propTypes = { sx: PropTypes.object, children: PropTypes.any, other: PropTypes.any };
