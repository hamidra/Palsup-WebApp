import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

export default class ImageEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
      scale: props.scale
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleScaleChange = this.handleScaleChange.bind(this);
    this.setEditorRefrence = this.setEditorRefrence.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }
  handleDrop(dropped) {
    this.setState({ image: dropped[0] });
  }
  handleScaleChange(event) {
    this.setState({ scale: event.target.value });
  }
  setEditorRefrence(editor) {
    this.editor = editor;
  }
  handleSaveClick(event) {
    if (this.editor) {
      const canvas = this.editor.getImageScaledToCanvas();
      canvas.toBlob(
        blob => {
          this.props.handleImageUpload(blob);
        },
        'image/jpeg',
        1
      );
      event.preventDefault();
    }
  }

  render() {
    const { width, height, border, borderRadius, ...rest } = this.props;
    return (
      <Dropzone onDrop={this.handleDrop} disableClick>
        {({ getRootProps, getInputProps }) => (
          <div {...rest}>
            <div className="row no-guter p-1">
              <div
                className="col-12 border p-3 p-sm-5 text-center"
                {...getRootProps()}>
                <input {...getInputProps()} />
                +Upload Photo
              </div>
              <div className="col-12 border">
                <AvatarEditor
                  ref={this.setEditorRefrence}
                  style={{ width: '100%', height: '100%' }}
                  image={this.state.image}
                  width={width}
                  height={height}
                  border={border}
                  borderRadius={borderRadius}
                  color={[255, 255, 255, 0.75]} // RGBA
                  scale={this.state.scale}
                  crossOrigin="anonymous"
                  rotate={0}
                />
              </div>
            </div>
            <div className="row no-gutter justify-content-center">
              <div className="col-12 col-sm-7 p-1 py-3">
                <input
                  type="range"
                  className="form-control-range"
                  value={this.state.scale}
                  onInput={this.handleScaleChange}
                  min="1"
                  max="2"
                  step="0.01"
                />
              </div>
              <div className="col-12 col-sm-5 p-1">
                <button
                  className="btn btn-primary w-100 float-right"
                  onClick={this.handleSaveClick}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    );
  }
}
