import React, { Component } from 'react';
import Editor from '../containers/EventPicEditorContainer';
import fetch from 'cross-fetch';

export default class AvatarEditor extends Component {
  constructor(props) {
    super(props);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }
  handleImageUpload(imageBlob) {
    var fd = new FormData();
    fd.append('eventPic', imageBlob);
    fetch('http://localhost:3000/uploader/event/5c7386bc92d02d38ad449401', {
      method: 'POST',
      body: fd
    });
  }
  render() {
    return <Editor />;
  }
}
