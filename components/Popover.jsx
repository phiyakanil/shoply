import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Popover = ({ isOpen, onClose, children, anchorElement, position = 'bottom' }) => {
  const popoverRef = useRef(null);
  const [popoverStyle, setPopoverStyle] = useState({});

  useEffect(() => {
    if (!isOpen || !anchorElement) return;

    const calculatePosition = () => {
      if (!anchorElement || !popoverRef.current) return;

      const anchorRect = anchorElement.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const space = 10; // Space between anchor and popover

      let top, left;

      switch (position) {
        case 'top':
          top = anchorRect.top - popoverRect.height - space;
          left = anchorRect.left + (anchorRect.width / 2) - (popoverRect.width / 2);
          break;
        case 'bottom':
          top = anchorRect.bottom + space;
          left = anchorRect.left + (anchorRect.width / 2) - (popoverRect.width / 2);
          break;
        case 'left':
          top = anchorRect.top + (anchorRect.height / 2) - (popoverRect.height / 2);
          left = anchorRect.left - popoverRect.width - space;
          break;
        case 'right':
          top = anchorRect.top + (anchorRect.height / 2) - (popoverRect.height / 2);
          left = anchorRect.right + space;
          break;
        default: // 'bottom'
          top = anchorRect.bottom + space;
          left = anchorRect.left + (anchorRect.width / 2) - (popoverRect.width / 2);
      }
      
      // Adjust if popover goes off-screen
      if (left < 0) left = space;
      if (left + popoverRect.width > window.innerWidth) left = window.innerWidth - popoverRect.width - space;
      if (top < 0) top = space;
      if (top + popoverRect.height > window.innerHeight) top = window.innerHeight - popoverRect.height - space;


      setPopoverStyle({
        position: 'fixed', // Use fixed for positioning relative to viewport
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 1000,
      });
    };

    calculatePosition(); // Calculate initial position

    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target) &&
          anchorElement && !anchorElement.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', calculatePosition); // Recalculate on resize
    window.addEventListener('scroll', calculatePosition, true); // Recalculate on scroll

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition, true);
    };
  }, [isOpen, onClose, anchorElement, position]);

  if (!isOpen) {
    return null;
  }

  const popoverContentStyle = {
    background: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '15px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div ref={popoverRef} style={{ ...popoverStyle, ...popoverContentStyle }}>
      {children}
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: 'none',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          color: '#777'
        }}
        aria-label="Close popover"
      >
        &times;
      </button>
    </div>
  );
};

Popover.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  anchorElement: PropTypes.instanceOf(Element), // DOM element to anchor to
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

// Example Usage (you'd typically put this in another component)
//
// function App() {
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const buttonRef = useRef(null);

//   const handleOpenPopover = (event) => {
//     setAnchorEl(event.currentTarget); // or buttonRef.current
//     setIsPopoverOpen(true);
//   };

//   const handleClosePopover = () => {
//     setIsPopoverOpen(false);
//     setAnchorEl(null);
//   };

//   return (
//     <div style={{ padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <button ref={buttonRef} onClick={handleOpenPopover} style={{ padding: '10px 20px' }}>
//         Open Popover
//       </button>

//       <Popover
//         isOpen={isPopoverOpen}
//         onClose={handleClosePopover}
//         anchorElement={anchorEl} // Pass the button element (or its ref.current)
//         position="bottom" // Or 'top', 'left', 'right'
//       >
//         <div style={{ minWidth: '200px' }}>
//           <h4>Popover Title</h4>
//           <p>This is the content of the popover.</p>
//           <button onClick={() => alert('Action!')}>Action</button>
//         </div>
//       </Popover>

//        {/* Example for another position */}
//        <button onClick={(e) => { setAnchorEl(e.currentTarget); setIsPopoverOpen(true);}} style={{ padding: '10px 20px', marginLeft: '20px' }}>
//         Open Popover (Right)
//       </button>
//       {/* Note: If you want multiple popovers, you'd need separate state for each, or a more complex state management for a single Popover component */}
//     </div>
//   );
// }
//
// export default App; // Or your component that uses Popover

export default Popover;