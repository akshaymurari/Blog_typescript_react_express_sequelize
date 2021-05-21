import React, { useState, Component } from 'react';
import AvatarEditor from 'react-avatar-editor';
import ImageCrop from './ImageCrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import './EditProfilePic.scss';
import $ from 'jquery';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));



class EditProfilePic extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userProfilePic: '',
      editor: null,
      scaleValue: 1,
    };
  }

  setEditorRef = editor => this.setState({ editor });

  onCrop = () => {
    const { editor } = this.state;
    if (editor !== null) {
      const url = editor.getImageScaledToCanvas().toDataURL();
      this.props.dispatch({ type: "profilepic", payload: url })
      this.setState({ userProfilePic: url });
    }
  };

  onScaleChange = (scaleChangeEvent) => {
    const scaleValue = parseInt(scaleChangeEvent.target.value);
    this.setState({ scaleValue });
  };

  DataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  profilePicChange = (fileChangeEvent) => {
    const file = fileChangeEvent.target.files[0];
    const { type } = file;
    if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
    } else {
      this.setState({ openCropper: true, selectedImage: fileChangeEvent.target.files[0], fileUploadErrors: [] });
    }
  }
  render() {
    return (
      <div className="disabledrag" style={{ width: "max-content" }}>
        <input
          accept="image/*"
          style={{ display: 'none', marginRight: "1rem" }}
          id="contained-button-file"
          // multiple
          name="profilePicBtn" accept="image/png, image/jpeg"
          type="file"
          onChange={this.profilePicChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" style={{ display: "inline-block", marginRight: "1rem" }} color="primary" component="span"
          >
            Edit
        </Button>
        </label>
        <ImageCrop
          imageSrc={this.state.selectedImage}
          setEditorRef={this.setEditorRef}
          onCrop={this.onCrop}
          scaleValue={this.state.scaleValue}
          onScaleChange={this.onScaleChange}
        />

      </div>

    );
  }
}



export default connect(
)(EditProfilePic);