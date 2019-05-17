import { connect } from 'react-redux';
import * as dux from '../../redux/dux/index';
import EditableImageModal from '../components/modals/EditableImageModal';

const mapStateToProps = (state, ownProps) => ({
  image: ownProps.event && ownProps.event.absoluteImage,
  rotatable: true,
  height: 400,
  width: 600,
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
)(EditableImageModal);
