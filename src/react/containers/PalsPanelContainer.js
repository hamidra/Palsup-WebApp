import { connect } from 'react-redux';
import PalsPanel from '../components/PalsPanel';
import * as dux from '../../redux/dux/index';

const mapStateToProps = state => ({
  pals:
    state.activityPals && state.activityPals.items
      ? state.activityPals.items
      : {}
});

const mapDispatchToProps = dispatch => ({
  handleLikeClick: (palId, liked) =>
    dispatch(dux.asyncActions.toggleLikePal(palId, liked))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PalsPanel);
