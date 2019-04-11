import { connect } from 'react-redux';
import * as dux from '../../redux/dux/index';
import EditableImageModal from '../components/modals/EditableImageModal';

const mapStateToProps = state => ({
  image:
    state.user &&
    state.user.info &&
    state.user.info.absolutePicture &&
    state.user.info.absolutePicture.large,
  height: 500,
  width: 500,
  scale: 1,
  borderRadius: 250,
  border: 0
});

const mapDispatchToProps = dispatch => ({
  handleImageUpload: image => dispatch(dux.asyncActions.uploadProfilePic(image))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableImageModal);
