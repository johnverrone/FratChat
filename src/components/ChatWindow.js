var React = require('react');
var socket = io.connect();
var MessageList = require('./MessageList');
var MessageForm = require('./MessageForm');
var UsersList = require('./UsersList');

var ChatWindow = React.createClass({
    getInitialState: function() {
        return {users: [], messages: [], text: ''};
    },

    componentDidMount: function() {
        socket.on('init', this._initialize);
        socket.on('send:message', this._messageRecieve);
        socket.on('user:join', this._userJoined);
        socket.on('user:left', this._userLeft);
    },

    _initialize: function(data) {
        var users = data.users;
        var name = data.name;
        this.setState({users, user: name});
    },

    _messageRecieve: function(message) {
        var messages = this.state.messages;
        messages.push(message);
        this.setState({messages});
    },

    _userJoined: function(data) {
        var users = this.state.users;
        var messages = this.state.messages;
        var name = data.name;
        users.push(name);
        messages.push({
            user: 'FRATCHAT BOT',
            text: name + ' Joined.'
        });
        this.setState({users, messages});
    },

    _userLeft: function(data) {
        var users = this.state.users;
        var name = data.name;
        var index = users.indexOf(name);
        users.splice(index, 1);
        messages.push({
            user: 'FRATCHAT BOT',
            text: name + ' Left.'
        });
        this.setState({users, messages});
    },

    handleMessageSubmit: function(message) {
        var messages = this.state.messages;
        messages.push(message);
        this.setState({messages});
        socket.emit('send:message', message);
    },

    render: function() {
        return (
            <div>
                <UsersList
                    users={this.state.users}
                />
                <MessageList
                    messages={this.state.messages}
                />
                <MessageForm
                    onMessageSubmit={this.handleMessageSubmit}
                    user={this.state.user}
                />
            </div>
        );
    }
});

module.exports = ChatWindow;