var React = require('react');

var MessageForm = React.createClass({
    getInitialState: function() {
        return {text: ''};
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var message = {
            user: this.props.user,
            text: this.state.text
        };
        this.props.onMessageSubmit(message);
        this.setState({text: ''});
    },

    changeHandler: function(e) {
        this.setState({text: e.target.value});
    },

    render: function() {
        return (
            <div className='message-form'>
                <h3>Write New Message</h3>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.changeHandler} value={this.state.text} />
                </form>
            </div>
        );
    }
});

module.exports = MessageForm;