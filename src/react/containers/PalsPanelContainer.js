import { connect } from 'react-redux';
import PalsPanel from '../components/PalsPanel';
import * as activityPals from '../../redux/dux/activityPals';

const mapStateToProps = state => ({
  pals:
    state.activityPals && state.activityPals.items
      ? state.activityPals.items
      : []
});

const mapDispatchToProps = dispatch => ({
  handleLikeClick: (palId, liked) =>
    dispatch(activityPals.asyncActions.toggleLikePal(palId, liked))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PalsPanel);
