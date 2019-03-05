import { connect } from 'react-redux';
import * as dux from '../../redux/dux/index';
import SignUpForm from '../components/SignUpForm';

const mapDispatchToProps = dispatch => ({
  onSubmit: async values => {
    var user = {
      gender: values.gender,
      name: values.name,
      email: values.email,
      cell: values.cell,
      password: values.password,
      dob: values.dob
    };
    dispatch(dux.asyncActions.createUser(user));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpForm);
