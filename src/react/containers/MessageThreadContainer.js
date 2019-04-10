import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageContent from '../components/MessageContent';
import Thumbnail from '../components/Thumbnail';
import * as dux from '../../redux/dux/index';

const MessageThread = class extends Component {
  componentDidMount() {
    this.props.handleComponentDidMount();
  }

  render() {
    return (
      <div className="w-100 h-100">
        {this.props.conversation &&
          this.props.conversation.messages &&
          this.props.conversation.messages.map(message => {
            const userId = message.from && message.from.id;
            const thumbnail =
              message.from &&
              message.from.absolutePicture &&
              message.from.absolutePicture.thumbnail;
            const contentText = message.content && message.content.text;
            const direction = this.props.user.id === userId ? 'rtl' : 'ltr';
            return (
              <div>
                <div
                  className={`d-flex mb-1 ${
                    direction === 'rtl' ? 'flex-row-reverse' : ''
                  }`}>
                  <Thumbnail src={thumbnail} />
                  <MessageContent order={'first'} direction={direction}>
                    {contentText}
                  </MessageContent>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  conversation:
    state.userConversations && state.userConversations.items
      ? state.userConversations.items[ownProps.eventId]
      : {},
  user: state.user && state.user.info
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleComponentDidMount: () =>
    dispatch(dux.asyncActions.fetchEventConversation(ownProps.eventId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageThread);
