import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import Icon from 'components/icon';

import closeIcon from 'assets/icons/close.svg';

import './modal-styles.scss';

class CustomModal extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      isOpen,
      onRequestClose,
      customStyles,
      contentLabel,
      closeClass,
      children
    } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel={contentLabel}
      >
        <button
          onClick={onRequestClose}
          className={`modal-close ${closeClass}`}
        >
          <Icon icon={closeIcon} />
        </button>
        {children}
      </Modal>
    );
  }
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  contentLabel: PropTypes.string,
  customStyles: PropTypes.object,
  closeClass: PropTypes.string,
  children: PropTypes.node
};

CustomModal.defaultProps = {
  contentLabel: 'Modal content',
  customStyles: {
    overlay: {
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 5px 15px 0 rgba(71, 44, 184, 0.1)',
      backgroundColor: 'rgba(17, 55, 80, 0.4)',
      overflow: 'auto',
      padding: window.innerWidth > 600 ? '40px 0' : '0'
    },
    content: {
      position: 'relative',
      top: 'auto',
      margin: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      padding: '0',
      border: 'none',
      borderRadius: 0
    }
  }
};

export default CustomModal;
