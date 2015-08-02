var React = require('react');

var Message = React.createClass({
    render: function() {
        return (
            <div className='message'>
                <strong>{this.props.user}: </strong>
                <span>{this.props.text}</span>
            </div>
        );
    }
});

module.exports = Message;