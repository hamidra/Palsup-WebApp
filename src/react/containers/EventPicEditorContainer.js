import { connect } from 'react-redux';
import * as dux from '../../redux/dux/index';
import ImageEditor from '../components/ImageEditor';

const mapStateToProps = (state, ownProps) => ({
  image: ownProps.event && ownProps.event.absoluteImage,
  height: 250,
  width: 500,
  scale: 1,
  borderRadius: 0,
  border: 0
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleImageUpload: image =>
    ownProps.event &&
    dispatch(dux.asyncActions.uploadEventPic(ownProps.event.id, image))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageEditor);
