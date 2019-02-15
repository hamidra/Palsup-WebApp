import { connect } from 'react-redux';
import SignInForm from '../components/SignInForm';
import * as userDux from '../../redux/dux/user';

const mapDispatchToProps = dispatch => ({
  onSubmit: async values => {
    var authInfo = {
      userAuthId: values.userId,
      passwordHash: values.password
    };
    dispatch(userDux.asyncActions.fetchUserByAuthInfo(authInfo));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SignInForm);
