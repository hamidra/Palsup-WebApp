import { connect } from 'react-redux';
import SignInForm from '../components/SignInForm';
import * as dux from '../../redux/dux/index';

const mapDispatchToProps = dispatch => ({
  onSubmit: async values => {
    var authInfo = {
      userAuthId: values.userId,
      passwordHash: values.password
    };
    dispatch(dux.asyncActions.fetchUserByAuthInfo(authInfo));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SignInForm);
