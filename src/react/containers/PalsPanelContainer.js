import { connect } from 'react-redux';
import PalsPanel from '../components/PalsPanel';
// need to add like actions

const mapStateToProps = state => ({
  pals:
    state.activityPals && state.activityPals.items
      ? state.activityPals.items
      : []
});

export default connect(mapStateToProps)(PalsPanel);
