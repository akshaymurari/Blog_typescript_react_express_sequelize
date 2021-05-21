import React from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import Button from '@material-ui/core/Button';


const ImageCrop1 = ({ imageSrc, onCrop, setEditorRef, scaleValue, onScaleChange }) => (
  <>
    <Button variant="contained" className="mb-3 ml-3" style={{display:"inline-block"}} onClick={onCrop} className="bg-dark text-white" component="span">
      Upload
    </Button>
    <div className="editorOverlayInner">
      <div className="editorModalContent clearfix">
        <div className="cropCnt">
          <AvatarEditor image={imageSrc} border={50} style={{height:"300px",width:"300px"}} scale={scaleValue} rotate={0} ref={setEditorRef} className="cropCanvas1" />
 
          <input style={{ width: '100%' }}  class="custom-range" type="range" value={scaleValue} name="points" min="1" max="10" step={1} onChange={onScaleChange} />
          {/* <button onClick={onCrop} className="editorOverlayCloseBtn crpBtn">
              Save
            </button> */}
        </div>
      </div>
    </div>
  </>
);

ImageCrop1.propTypes = {
  open: PropTypes.bool.isRequired,
  setEditorRef: PropTypes.func.isRequired,
  onCrop: PropTypes.func.isRequired,
  scaleValue: PropTypes.number.isRequired,
  onScaleChange: PropTypes.func.isRequired,
};

export default ImageCrop1;